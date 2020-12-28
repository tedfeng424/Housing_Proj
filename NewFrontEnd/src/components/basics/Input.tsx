import React, { useState } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';

interface PathProps extends FormControlProps {
  label?: string;
  labelClassName?: string;
  error?: string; // Will only show the error if isInvalid is true
  errorClassName?: string;
}

const Input: React.FC<PathProps> = ({
  label,
  labelClassName,
  error,
  errorClassName,
  className = '',
  readOnly,
  onChange,
  isInvalid,
  isValid,
  value,
  ...formControlProps
}) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(!value || value === '');

  return (
    <Form.Group>
      {label && (
        <Form.Label
          className={
            labelClassName ? `${labelClassName} input-label` : 'input-label'
          }
        >
          {label}
        </Form.Label>
      )}
      <Form.Control
        {...formControlProps}
        value={value}
        className={
          (isEmpty && !readOnly ? 'input-unfilled ' : 'input-filled ') +
          (readOnly ? 'input-readonly ' : '') +
          (isInvalid && !readOnly ? 'input-invalid ' : '') +
          className
        }
        isValid={!readOnly && isValid}
        readOnly={readOnly}
        onChange={(e) => {
          setIsEmpty(!e.target.value || e.target.value === '');
          if (onChange) {
            onChange(e);
          }
        }}
      />
      {isInvalid && error && (
        <Form.Label className={errorClassName || 'input-error'}>
          {error}
        </Form.Label>
      )}
    </Form.Group>
  );
};

export default Input;
