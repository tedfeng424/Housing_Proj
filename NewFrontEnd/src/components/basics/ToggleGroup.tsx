import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import * as z from 'zod';
import Toggle from './Toggle';
import { Icon } from '../../assets/icons/all';

export interface ToggleContent {
  icon?: Icon;
  label: string;
}

interface ToggleGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  content: string[] | ToggleContent[];
  selected?: boolean[]; // TODO define this to be the same length as content somehow? Also allow this to be a string
  initialSelected?: boolean[]; // TODO define this to be the same length as content somehow? Also allow this to be an array of strings
  singleSelect?: boolean; // makes it so only one toggle will be selected
  hideLabels?: boolean;
  center?: boolean; // determines whether or not to center the toggles
  onSelect?: (
    newlySelected: { label: string; selected: boolean },
    allSelected: boolean[],
  ) => any;
  label?: string;
  labelClassName?: string;
  error?: string | z.ZodIssue; // Will make the input border red as well
  errorClassName?: string;
  toggleClassName?: string;
  required?: boolean;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({
  content,
  selected,
  initialSelected,
  singleSelect,
  hideLabels,
  center,
  onSelect,
  label,
  labelClassName,
  error,
  errorClassName,
  toggleClassName = '',
  required,
  className = '',
  ...wrapperProps
}) => {
  const [areSelected, setAreSelected] = useState<boolean[]>(
    initialSelected || (content as ToggleContent[]).map(() => false),
  );

  useEffect(() => {
    if (selected !== undefined) setAreSelected(selected);
  }, [selected]);

  return (
    <Form.Group className="toggle-group">
      {(label || required) && (
        <Form.Label className={`toggle-group-label ${labelClassName}`}>
          {label}
          {required && (
            <span className="toggle-group-required-asterisk"> *</span>
          )}
        </Form.Label>
      )}

      <div
        {...wrapperProps}
        className={`toggle-group-wrapper ${
          center && 'toggle-group-center'
        } ${className}`}
      >
        {(content as ToggleContent[]).map((c, index) => {
          const curLabel = typeof c === 'string' ? c : c.label;
          const icon = typeof c !== 'string' ? c.icon : undefined;

          return (
            <Toggle
              label={curLabel}
              icon={icon}
              hideLabel={hideLabels}
              initialSelected={initialSelected && initialSelected[index]}
              selected={areSelected[index]}
              onClick={(newSelected) => {
                const updatedSelected = singleSelect
                  ? areSelected.map((s, i) => index === i)
                  : { ...areSelected, [index]: newSelected };
                setAreSelected(updatedSelected);

                if (onSelect) {
                  onSelect(
                    { label: curLabel, selected: newSelected },
                    updatedSelected,
                  );
                }
              }}
              key={curLabel}
              className={
                toggleClassName + !center ? ' toggle-group-line-up-toggle' : ''
              }
            />
          );
        })}
      </div>

      {error && (
        <Form.Label className={`toggle-group-error ${errorClassName}`}>
          {error}
        </Form.Label>
      )}
    </Form.Group>
  );
};

export default ToggleGroup;

// interface Bla extends React.HTMLAttributes<HTMLDivElement> {
//   content: string[] | IconAndLabel[];
// }

// interface Blaa extends React.HTMLAttributes<HTMLDivElement> {
//   singleSelect: true;
//   selected?: number | string;
//   initialSelected?: number | string;
// }
// interface Blaaa extends React.HTMLAttributes<HTMLDivElement> {
//   singleSelect?: false;
//   selected?: string[] | boolean[];
//   initialSelected?: string[] | boolean[];
// }

// // type Selected<singleSelect extends boolean | undefined>

// interface DependentsOfSingleSelect<T extends boolean | undefined> {
//   singleSelect?: T;
//   selected?: T extends true ? number : boolean[];
//   initialSelected?: number;
// }

// interface Bla2 extends React.HTMLAttributes<HTMLDivElement> {
//   content: Icon[];
// }

// interface Blaa2 extends React.HTMLAttributes<HTMLDivElement> {
//   singleSelect: true;
//   selected?: number;
//   initialSelected?: number;
// }

// interface Blaaa2 extends React.HTMLAttributes<HTMLDivElement> {
//   singleSelect?: false;
//   selected?: boolean[];
//   initialSelected?: boolean[];
// }

// type Type2 = Bla2 & (Blaa2 | Blaaa2);
