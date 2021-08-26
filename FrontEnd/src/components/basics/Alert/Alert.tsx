import React, { FunctionComponent } from 'react';
import { Icon as IconType, alertIcons } from '@icons';
import styles from './Alert.module.scss';
import Button from '@components/basics/Button';
import cn from 'classnames';

export type alertVariant = 'success' | 'alert' | 'warning' | 'info';

interface AlertProps {
  variant: alertVariant;
  title?: string;
  text: string;
  button?: string;
}

const iconMapping = {
  success: alertIcons.Check,
  alert: alertIcons.Alert,
  warning: alertIcons.Ring,
  info: alertIcons.Info,
};

const Alert: FunctionComponent<AlertProps> = ({
  variant,
  title = '',
  text,
  button = '',
}) => {
  let Icon = iconMapping[variant];

  return (
    <div className={cn(styles[variant], styles.alertContainer)}>
      <div className={styles.icon}>
        <Icon />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
      </div>
      <div className={styles.button}>
        {button == '' ? (
          <alertIcons.X />
        ) : (
          <Button
            variant="wrapper"
            size="secondary"
            className={styles[variant]}
          >
            {button}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Alert;
