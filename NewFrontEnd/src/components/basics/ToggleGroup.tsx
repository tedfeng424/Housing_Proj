import React, { useState, useEffect } from 'react';
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
  onSelect?: (
    newlySelected: { label: string; selected: boolean },
    allSelected: boolean[],
  ) => any;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({
  content,
  selected,
  initialSelected,
  singleSelect,
  hideLabels,
  onSelect,
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
    <div
      {...wrapperProps}
      className={`homehub-toggle-group-wrapper ${className}`}
    >
      {(content as ToggleContent[]).map((c, index) => {
        const label = typeof c === 'string' ? c : c.label;
        const icon = typeof c !== 'string' ? c.icon : undefined;

        return (
          <Toggle
            label={label}
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
                onSelect({ label, selected: newSelected }, updatedSelected);
              }
            }}
            key={label}
          />
        );
      })}
    </div>
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
