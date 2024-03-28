import { useState } from "react";

import {
  usernameValidator,
  emailValidator,
  phoneValidator,
} from "./validators";

const touchErrors = (errors) => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useLoginFormValidator = (form) => {
  const [errors, setErrors] = useState({
    username: {
      dirty: false,
      error: false,
      message: "",
    },
    email: {
      dirty: false,
      error: false,
      message: "",
    },
    phone: {
      dirty: false,
      error: false,
      message: "",
    },
  });

  const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { username, email, phone } = form;

    if (nextErrors.username.dirty && (field ? field === "username" : true)) {
      const usernameMessage = usernameValidator(username, form);
      nextErrors.username.error = !!usernameMessage;
      nextErrors.username.message = usernameMessage;
      if (!!usernameMessage) isValid = false;
    }

    if (nextErrors.email.dirty && (field ? field === "email" : true)) {
      const emailMessage = emailValidator(email, form);
      nextErrors.email.error = !!emailMessage;
      nextErrors.email.message = emailMessage;
      if (!!emailMessage) isValid = false;
    }

    if (nextErrors.phone.dirty && (field ? field === "phone" : true)) {
      const phoneMessage = phoneValidator(phone, form);
      nextErrors.phone.error = !!phoneMessage;
      nextErrors.phone.message = phoneMessage;
      if (!!phoneMessage) isValid = false;
    }
    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = (e) => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};
