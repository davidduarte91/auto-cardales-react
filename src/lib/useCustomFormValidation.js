import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toLabel(fieldName, labels) {
  return labels[fieldName] || fieldName;
}

function hasContent(field) {
  const rawValue = typeof field.value === "string" ? field.value : "";
  return rawValue.trim().length > 0;
}

function getFormFields(form) {
  return Array.from(form.querySelectorAll("input[name], textarea[name], select[name]"))
    .filter((field) => {
      if (field.tagName !== "INPUT") return true;
      const fieldType = String(field.getAttribute("type") || "text").toLowerCase();
      return !["hidden", "submit", "button", "reset"].includes(fieldType);
    });
}

function validateField(field, labels, skipRequiredForNames) {
  const rawValue = typeof field.value === "string" ? field.value : "";
  const value = rawValue.trim();
  const name = field.name;
  const label = toLabel(name, labels);
  const fieldType = String(field.getAttribute("type") || field.type || "").toLowerCase();
  const skipRequired = skipRequiredForNames.has(name);

  if (!skipRequired && field.required && !value) {
    return "completar este campo";
  }

  if (!value) {
    return "";
  }

  if (fieldType === "email" && !EMAIL_REGEX.test(value)) {
    return "Ingresa un email valido.";
  }

  if (fieldType === "tel") {
    const digitCount = (value.match(/\d/g) || []).length;
    if (digitCount < 8) {
      return "Ingresa un telefono valido.";
    }
  }

  return "";
}

function getValidationErrors(form, fieldLabels, atLeastOneGroups) {
  const fields = getFormFields(form);
  const groupFieldNames = new Set(atLeastOneGroups.flat());
  const nextErrors = {};

  fields.forEach((field) => {
    const message = validateField(field, fieldLabels, groupFieldNames);
    if (message) {
      nextErrors[field.name] = message;
    }
  });

  atLeastOneGroups.forEach((group) => {
    const groupFields = fields.filter((field) => group.includes(field.name));
    if (groupFields.length === 0) return;

    const hasAnyValue = groupFields.some((field) => hasContent(field));
    if (hasAnyValue) return;

    groupFields.forEach((field) => {
      if (!nextErrors[field.name]) {
        nextErrors[field.name] = "completar este campo";
      }
    });
  });

  return { fields, nextErrors };
}

export function useCustomFormValidation(fieldLabels = {}, options = {}) {
  const atLeastOneGroups = Array.isArray(options.atLeastOneGroups) ? options.atLeastOneGroups : [];
  const [errors, setErrors] = useState({});

  const handleFieldInput = (event) => {
    const field = event.target;
    const form = field?.form;
    if (!form) return;

    const { nextErrors } = getValidationErrors(form, fieldLabels, atLeastOneGroups);
    setErrors(nextErrors);
  };

  const handleFormValidation = (event) => {
    const form = event.currentTarget;
    const { fields, nextErrors } = getValidationErrors(form, fieldLabels, atLeastOneGroups);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
      const firstErrorName = Object.keys(nextErrors)[0];
      const firstInvalidField = fields.find((field) => field.name === firstErrorName);
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
    }
  };

  return {
    errors,
    handleFieldInput,
    handleFormValidation,
  };
}
