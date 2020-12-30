import React, { useState, useEffect } from 'react';
import { Icon as IconType } from '../../assets/icons/all';
import Toggle, { ToggleContent, IconAndLabel } from './Toggle';

interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  content: IconType[] | string[] | IconAndLabel[]; // Do this instead of ToggleContent[] so that all indeces have to be of the same type
  selected?: boolean[]; // TODO define this to be the same length as content somehow?
  initialSelected?: boolean[]; // TODO define this to be the same length as content somehow?
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({
  content,
  selected,
  initialSelected,
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
      {(content as ToggleContent[]).map((c, i) => (
        <Toggle
          content={c}
          selected={areSelected[i]}
          initialSelected={initialSelected && initialSelected[i]}
        />
      ))}
    </div>
  );
};

export default ToggleGroup;
