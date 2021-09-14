import React, { FunctionComponent } from 'react';
import { Modal, Button, Subtitle1 } from '@basics';
import { useDispatch } from 'react-redux';
import { useShowEmailConfirmation, hideEmailConfirmation } from '@redux';
import { miscIcons } from '@icons';
import styles from './EmailConfirmation.module.scss';

const EmailConfirmation: FunctionComponent = () => {
  const dispatch = useDispatch();
  const shouldShowEmailConfirmation = useShowEmailConfirmation();

  return (
    <Modal
      open={shouldShowEmailConfirmation}
      onClose={() => dispatch(hideEmailConfirmation())}
      className={styles.wrapper}
    >
      <div>
        <Button
          variant="wrapper"
          onClick={() => dispatch(hideEmailConfirmation())}
        >
          <miscIcons.orangeX />
        </Button>
      </div>

      <div className={styles.emailConfirmationWrapper}>
        <div>
          <img
            className={styles.confirmationImg}
            src="/paperAirplane.svg"
            alt="Email Sent"
          />
        </div>
        <h4 className={styles.label}>Email sent!</h4>
        <Subtitle1>
          Thanks for reporting. We hope to get back to you within 7 days.
        </Subtitle1>

        <div className={styles.bottomButtonWrapper}>
          <Button
            className={styles.bottomButton}
            variant="solid"
            size="secondary"
            onClick={() => {
              dispatch(hideEmailConfirmation());
            }}
          >
            Okay
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EmailConfirmation;
