import React, { useState, FunctionComponent } from 'react';
import styles from './CheckBoxButton.module.scss';
import { Body1 } from '@basics';
import { checkboxIcons } from '@icons';

export interface CheckBoxButtonProps {
  id: string;
  value: string;
  withLabel: boolean;
  // TODO add onChange here when actually coding the wizard form
}

const CheckBoxButton: FunctionComponent<CheckBoxButtonProps> = ({
  id,
  value,
  withLabel,
}) => {
  const [checked, changState] = useState(false);
  return (
    <div className="d-flex">
      {checked ? (
        <checkboxIcons.checked
          className={styles.checkbox}
          onClick={() => changState(false)}
        />
      ) : (
        <div
          className={styles.notChecked}
          onClick={() => changState(true)}
        ></div>
      )}
      {withLabel && (
        <label htmlFor={id}>
          <Body1 className={styles.CheckBoxLabelBody}>{value}</Body1>
        </label>
      )}
    </div>
  );
};

export default CheckBoxButton;
