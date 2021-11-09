import React, { FunctionComponent, ReactElement } from 'react';
import MaterialUITooltip, {
  TooltipProps as MaterialUITooltipProps,
} from '@material-ui/core/Tooltip';
import { miscIcons } from '@icons';
import cn from 'classnames';
import { Body2, Caption } from '@basics';
import styles from './Tooltip.module.scss';

export interface TooltipProps extends Omit<MaterialUITooltipProps, 'children'> {
  hideInfoIcon?: boolean; // hides the info icon
  children?: ReactElement<any, any> | string;
  isSingleLine: boolean;
}

export interface PopperWrapperProps {
  isSingleLine: boolean;
}

/**
 * The Info Icon with styling.
 */
const InfoIcon: FunctionComponent = () => (
  <div className={styles.infoIcon}>
    <miscIcons.infoCircle />
  </div>
);

/**
 * Wrapper for the actual popup component to provide the correct styling.
 */
const PopperWrapper: FunctionComponent<PopperWrapperProps> = ({
  isSingleLine,
  children,
}) => {
  return (
    <div
      className={cn(styles.tooltip, {
        [styles.tooltipSingleLine]: isSingleLine,
      })}
    >
      <Body2 className={styles.tooltipText}>{children}</Body2>
    </div>
  );
};

/**
 * Tooltip. `title` is what will appear in the popup. `children` is what the popup will
 * listen to for hovering.
 */
const Tooltip: FunctionComponent<TooltipProps> = ({
  hideInfoIcon,
  children,
  title,
  isSingleLine,
  ...props
}) => (
  <MaterialUITooltip
    title={<PopperWrapper isSingleLine={isSingleLine}>{title}</PopperWrapper>}
    classes={{ tooltip: styles.MUITooltip }}
    {...props}
  >
    <div className={styles.wrapper}>
      {!hideInfoIcon && <InfoIcon />}
      <Caption className={styles.childrenWrapper}>{children}</Caption>
    </div>
  </MaterialUITooltip>
);

export default Tooltip;
