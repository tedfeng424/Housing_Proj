import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import BootstrapDropdown, * as BootstrapDropdownMetadata from 'react-bootstrap/Dropdown';
import * as z from 'zod';

interface DropdownProps extends BootstrapDropdownMetadata.DropdownProps {
  options: string[];
  initialSelected?: string; // TODO eventually make this type oneof options array
  label?: string;
  labelClassName?: string;
  error?: string | z.ZodIssue; // Will make the input border red as well
  errorClassName?: string;
  placeholder?: string;
  isInvalid?: boolean;
  isValid?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  labelClassName = 'dropdown-label',
  error,
  errorClassName = 'dropdown-error',
  initialSelected,
  placeholder,
  isInvalid,
  isValid, // only provide this if you want a green checkmark. Should only be provided when multiple dropdowns are working in unison
  className = '',
  options,
  onSelect,
  ...dropdownProps
}) => {
  const [selected, setSelected] = useState<string | undefined>(initialSelected);
  const [isEmpty, setIsEmpty] = useState<boolean>(!selected || selected === '');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <Form.Group>
      <Form.Label className={labelClassName}>{label}</Form.Label>

      <BootstrapDropdown
        onSelect={(s, e) => {
          setSelected(s || undefined);
          setIsEmpty(!s || s === '');

          if (onSelect) onSelect(s, e);
        }}
        {...dropdownProps}
      >
        <BootstrapDropdown.Toggle
          variant="no-show"
          className="dropdown-toggle"
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        >
          <div className="d-flex flex-nowrap">
            <Form.Control
              value={selected || ''}
              placeholder={placeholder}
              className={`${
                (isEmpty && !isFocused
                  ? 'dropdown-unfilled '
                  : 'dropdown-filled ') +
                (isInvalid || error ? 'dropdown-invalid ' : '') +
                className
              } dropdown-straighten-right`}
              isValid={isValid}
              readOnly
            />

            <Button
              variant="" // TODO temporary fix
              className={
                (isEmpty && !isFocused
                  ? 'dropdown-drop-btn-unfilled '
                  : 'dropdown-drop-btn-filled ') +
                (isInvalid || error ? 'dropdown-drop-btn-invalid ' : '')
              }
            >
              <div className="dropdown-drop-btn-arrow" />
            </Button>
          </div>
        </BootstrapDropdown.Toggle>

        <BootstrapDropdown.Menu>
          {options.map((option) => (
            <BootstrapDropdown.Item eventKey={option}>
              {option}
            </BootstrapDropdown.Item>
          ))}
        </BootstrapDropdown.Menu>
      </BootstrapDropdown>

      {error && <Form.Label className={errorClassName}>{error}</Form.Label>}
    </Form.Group>
  );
};

export default Dropdown;
