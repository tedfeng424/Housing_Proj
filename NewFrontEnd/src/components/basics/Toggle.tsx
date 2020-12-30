import React, { useState, useEffect } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { Icon as IconType } from '../../assets/icons/all';

export interface IconAndLabel {
  icon: IconType;
  label: string;
}

export type ToggleContent = IconType | string | IconAndLabel;

/**
 * // TODO maybe put this somewhere else?
 * Use this to determine how to display the content (need to handle the different types of content).
 * @param content The content to display.
 */
const displayContent = (content: ToggleContent) => {
  if ('label' in (content as any)) {
    const { icon, label } = content as IconAndLabel;
    const Icon = icon;
    return (
      <>
        <Icon />
        {label}
      </>
    );
  }

  if (typeof content === 'string') {
    return content as string;
  }
  return content as IconType;
};

interface ToggleProps extends ButtonProps {
  content: ToggleContent;
  selected?: boolean;
  initialSelected?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  content,
  selected,
  initialSelected = false,
  className = '',
  ...buttonProps
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(initialSelected);
  // TODO const [Icon, setIcon] = useState<IconType | undefined>(icon);

  useEffect(() => {
    if (selected !== undefined) setIsSelected(selected);
  }, [selected]);

  // TODO useEffect(() => {
  //   setIcon(icon);
  // }, [icon]);

  return (
    <Button
      {...buttonProps}
      className={
        (isSelected
          ? 'homehub-toggle-selected '
          : 'homehub-toggle-unselected ') + className
      }
    >
      {/* TODO {Icon && <Icon />}
        {label} */}
      {displayContent(content)}
    </Button>
  );
};

export default Toggle;
