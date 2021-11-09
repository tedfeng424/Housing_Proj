import React, { useState, useEffect, FunctionComponent } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { Icon as IconType, IconProps } from '@icons';
import cn from 'classnames';
import styles from './Toggle.module.scss';

interface ToggleProps extends Omit<ButtonProps, 'onClick'> {
  label: string;
  hideLabel?: boolean;
  icon?: IconType;
  iconConfig?: IconProps;
  selected?: boolean;
  initialSelected?: boolean;
  onClick?: (
    selected: boolean,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => any;
  readOnly?: boolean;
  vertical?: boolean;
}

const Toggle: FunctionComponent<ToggleProps> = ({
  label,
  hideLabel,
  icon: Icon,
  iconConfig,
  selected,
  initialSelected = false,
  className,
  onClick,
  children,
  readOnly,
  vertical,
  ...buttonProps
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(initialSelected);

  useEffect(() => {
    if (selected !== undefined) setIsSelected(selected);
  }, [selected]);

  return (
    <div className={styles.root}>
      <Button
        variant="" // TODO
        {...buttonProps}
        className={cn(className, styles.toggle, {
          [styles.selected]: isSelected,
          [styles.unselected]: !isSelected,
          [styles.readOnly]: readOnly,
          [styles.vertical]: vertical,
        })}
        onClick={(e) => {
          if (readOnly) return;
          if (onClick) onClick(!isSelected, e);
          setIsSelected(!isSelected);
        }}
      >
        <div className={cn(!vertical && 'd-flex')}>
          {Icon && (
            <div>
              <Icon {...iconConfig} />
            </div>
          )}

          {!hideLabel && (
            <div className={cn(styles.label, !vertical && Icon && 'ml-2')}>
              {label}
            </div>
          )}

          {children}
        </div>
      </Button>
    </div>
  );
};

export default Toggle;
