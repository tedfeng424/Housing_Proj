import React, { FunctionComponent, useRef } from 'react';
import styles from './RadioButton.module.scss';
import { Body1 } from '@basics';
import { useRandomID } from '@hooks';

export interface RadioButtonProps {
  id?: string;
  value: string; // required for value extracting
  withLabel?: boolean; // used when we want to add text on the side
  name: string;
  // TODO add onChange here when actually coding the wizard form
}

// radio button customizes typical html radio button and takes in same arguments
const RadioButton: FunctionComponent<RadioButtonProps> = ({
  id,
  value,
  withLabel,
  name,
}) => {
  const buttonID = useRandomID(id);
  return (
    <div className="d-flex">
      <input
        type="radio"
        className={styles.radioInput}
        name={name}
        value={value}
        id={buttonID}
      />
      {withLabel && (
        <label htmlFor={buttonID}>
          <Body1 className={styles.radioLabelBody}>{value}</Body1>
        </label>
      )}
    </div>
  );
};

export default RadioButton;
