import React, { FunctionComponent } from 'react';
import { Modal, Button, Subtitle1 } from '@basics';
import { useDispatch } from 'react-redux';
import {
  useShowUnsupportedDomainPopup,
  hideUnsupportedDomainPopup,
  showReportIssue,
  showLogin,
  useThunkDispatch,
} from '@redux';
import { miscIcons } from '@icons';
import styles from './UnsupportedDomainPopup.module.scss';
import { useUser } from '@hooks';
import AfterReportIssue from './AfterReportIssue';
import EmailConfirmation from './AfterReportIssue/EmailConfirmation';

const UnsupportedDomainPopupUI: FunctionComponent = () => {
  const dispatch = useThunkDispatch();
  const shouldShowUnsupportedDomainPopup = useShowUnsupportedDomainPopup();

  return (
    <Modal
      open={shouldShowUnsupportedDomainPopup}
      onClose={() => dispatch(hideUnsupportedDomainPopup())}
      className={styles.wrapper}
    >
      <div>
        <Button
          variant="wrapper"
          onClick={() => dispatch(hideUnsupportedDomainPopup())}
        >
          <miscIcons.orangeX />
        </Button>
      </div>

      <div className="d-flex justify-content-center border-0">
        <img
          className={styles.loginImg}
          src="/triton.svg"
          alt="LogInNotSupported"
        />
      </div>

      <div className="d-flex flex-column text-center">
        <div className={styles.label}>
          <h4>Oops, your email is incorrect...</h4>
        </div>

        <Subtitle1>
          At the moment, we only allow email ends with <b>ucsd.edu</b> to sign
          up!
        </Subtitle1>

        <div className={styles.bottomRowButtons}>
          <Button
            className={styles.tryAgainButton}
            size="secondary"
            variant="wrapper"
            onClick={async () => {
              await dispatch(hideUnsupportedDomainPopup());
              dispatch(showReportIssue());
            }}
          >
            <div className={styles.reportIssue}>
              <div>Report an issue</div>
            </div>
          </Button>

          <Button
            className={styles.tryAgainButton}
            size="secondary"
            onClick={async () => {
              await dispatch(hideUnsupportedDomainPopup());
              dispatch(showLogin());
            }}
          >
            Try Again
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const UnsupportedDomainPopup: FunctionComponent = () => (
  <>
    <UnsupportedDomainPopupUI />
    <AfterReportIssue />
    <EmailConfirmation />
  </>
);

export default UnsupportedDomainPopup;
