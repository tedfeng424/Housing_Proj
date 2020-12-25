import React, { useEffect, useState } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';

interface PathProps extends FormControlProps {
  label?: string;
  labelClassName?: string;
}

// override class:
// 1. inspect component when it's valid
// 2. override className for relevant components when valid/invalid
// check online for error message

const Input: React.FC<PathProps> = ({
  label,
  labelClassName,
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
      {label && <Form.Label className={labelClassName}>{label}</Form.Label>}
      <Form.Control
        {...formControlProps}
        value={value}
        className={
          (isEmpty && !readOnly ? 'input-unfilled ' : 'input-filled ') +
          (readOnly ? 'input-readonly' : '') +
          (isInvalid && !readOnly ? 'input-invalid' : '') +
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
    </Form.Group>
  );
};

export default Input;
