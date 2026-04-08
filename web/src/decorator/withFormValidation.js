import React, { useState } from 'react';

const validators = {
  required: (value) => (value?.trim() ? null : 'This field is required'),
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email address',
  minLength: (min) => (value) =>
    value?.length >= min ? null : `Must be at least ${min} characters`,
  passwordMatch: (other) => (value) =>
    value === other ? null : 'Passwords do not match',
};

function withFormValidation(WrappedComponent, validationRules) {
  return function ValidatedForm(props) {
    const [errors, setErrors] = useState({});

    const validate = (formData) => {
      const newErrors = {};
      for (const [field, rules] of Object.entries(validationRules)) {
        for (const rule of rules) {
          const error = rule(formData[field], formData);
          if (error) {
            newErrors[field] = error;
            break;
          }
        }
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    return (
      <WrappedComponent
        {...props}
        errors={errors}
        validate={validate}
        setErrors={setErrors}
      />
    );
  };
}

export { validators };
export default withFormValidation;
