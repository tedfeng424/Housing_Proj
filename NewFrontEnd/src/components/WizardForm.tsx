/* Documentation of this component is at the bottom */
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { miscIcons } from '../assets/icons/all';
import { AtLeastOneArray } from '../assets/utils';

/**
 * Each child component will be given:
 * - nextStep()/prevStep() function to navigate the form
 * - an exit() function to exit the form (i.e. when the user completes the form)
 * - a submitForm() which can be called when you would like to submit the form (it returns T/F based on success of onSubmit and validationChecks)
 */
type setWizardFormStorageFunction<P> = (value: Partial<P>) => void;
export interface WizardFormStep<P> {
  exitWizardForm: () => void;
  nextStep: () => void;
  prevStep: () => void;
  useWizardFormStorage: <P extends {}>() => // initialValue?: Partial<P>,
  [P, setWizardFormStorageFunction<P>];
  submitForm: () => boolean; // returns success or failure
  setIsValidated: (validated: boolean) => void;
}

// T is whatever is in the storage
interface PathProps<T = {}> {
  children: AtLeastOneArray<React.ReactElement>; // the steps of the form (needs to be of length at least 0)
  show: boolean;
  setShow: (show: boolean) => void;
  hideButtons?: boolean;
  onSubmit: (wizardFormStorage: T) => boolean;
  validateOnlyAtSubmit?: boolean;
  initialStorage?: Partial<T>;
}

/**
 * Not using React.FC as a work around to allow for generics for Wizard Form.
 * DO NOT DO THIS NORMALLY. I will try to find a better way to do this
 */
const WizardForm = <T extends {}>({
  children,
  show,
  setShow,
  hideButtons = false,
  onSubmit,
  validateOnlyAtSubmit = false,
  initialStorage = {},
}: PathProps<T>) => {
  const [index, setIndex] = useState<number>(0);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(index === children.length - 1);
  const [CurStep, setCurStep] = useState<React.ReactElement>(children[0]);
  const [wizardFormStorage, setWizardFormStorage] = useState<Partial<T>>(
    initialStorage,
  );
  const [validations, setValidations] = useState<AtLeastOneArray<boolean>>(
    children.map(() => false) as AtLeastOneArray<false>,
  );

  useEffect(() => {
    setCurStep(children[index]);
    setIsFirst(index === 0);
    setIsLast(index === children.length - 1);
  }, [index, children]);

  /**
   * Use this to exit the wizard form without submitting.
   */
  const exitWizardForm = () => {
    setShow(false);
  };

  /**
   * Use this to navigate the wizard form to the next step.
   * If validateOnlyAtSubmit is false, it will only go to the
   * next step if this step is validated.
   */
  const nextStep = () => {
    // validate if needed
    if (!validateOnlyAtSubmit && !validations[index]) return;

    if (index + 1 < children.length) setIndex(index + 1);
  };

  /**
   * Use this to navigate the wizard form to the previous step.
   */
  const prevStep = () => {
    if (index - 1 >= 0) setIndex(index - 1);
  };

  /**
   * Use this to submit the form (it checks validation values first).
   * Returns T/F based on success of validation values and onSubmit.
   * (i.e. returns false if any validations are false, returns false
   * if onSubmit returns false, otherwise returns true).
   */
  const submitForm = (): boolean => {
    const allValidations = validations.reduce<boolean>(
      (prev, cur) => prev && cur,
      true,
    );
    if (!allValidations) return false;

    // Everything should be validated by this point
    const success = onSubmit(wizardFormStorage as T);
    if (success) exitWizardForm();
    return success;
  };

  /**
   * Hook to access function to update WizardForm's "local storage". It's shared among all children.
   * Works similar to useState.
   */
  const useWizardFormStorage = <P extends Partial<T>>() =>
    // initialValue?: Partial<P>, // TODO not working, not sure how to get it working
    {
      const setWizardFormStorageWrapper: setWizardFormStorageFunction<P> = (
        value: Partial<P>,
      ) => setWizardFormStorage({ ...wizardFormStorage, ...value });

      // wizard form storage is limited to the intersection of P and T
      return [wizardFormStorage as P, setWizardFormStorageWrapper] as [
        Partial<P>,
        setWizardFormStorageFunction<P>,
      ];
    };

  /**
   * Use this to set if the current step is validated or not. Initialized as true unless otherwise
   * specified. NOTE: you can only set isValidated in the current page.
   */
  const setIsValidated = (validated: boolean) => {
    const updatedValidations = [...validations] as typeof validations;
    updatedValidations[index] = validated;
    setValidations(updatedValidations);
  };

  // TODO need to figure out how to have loading thing on top
  return (
    <Modal
      dialogClassName="wizard-form-modal-dialog"
      show={show}
      onHide={() => setShow(false)}
      centered
    >
      <Container className="h-100 py-4">
        <div className="d-flex align-items-center justify-content-around h-100">
          <Col xs={1} className="d-flex arrow-icon justify-content-center">
            {!isFirst && !hideButtons && (
              <div>
                <Button variant="no-show" onClick={prevStep}>
                  <miscIcons.leftArrow />
                </Button>
              </div>
            )}
          </Col>

          <Col xs={10} className="d-flex">
            {/* TODO {CurStep({
              nextStep,
              prevStep,
              exitWizardForm,
              submitForm,
              useWizardFormStorage,
              setIsValidated,
            })} */}
            {React.cloneElement(CurStep, {
              nextStep,
              prevStep,
              exitWizardForm,
              submitForm,
              useWizardFormStorage,
              setIsValidated,
            })}
          </Col>

          {/* TODO need to make the button look disabled when you can't move forward */}
          <Col xs={1} className="d-flex arrow-icon justify-content-center">
            {!isLast && !hideButtons && (
              <div>
                <Button variant="no-show" onClick={nextStep}>
                  <miscIcons.rightArrow />
                </Button>
              </div>
            )}
          </Col>
        </div>
      </Container>
    </Modal>
  );
};

export default WizardForm;

/**
 * DOCUMENTATED EXAMPLES
 */

/* Basic example (each form step as a component):
<WizardForm show={show} setShow={setShow}>
  <FakeStepTest1 />
  <FakeStepTest2 />
  <FakeStepTest3 />
  <FakeStepTest4 />
</WizardForm>;
*/

/* Basic example with hidden buttons:
<WizardForm show={show} setShow={setShow} hideButtons>
  <FakeStepTest1 />
  <FakeStepTest2 />
  <FakeStepTest3 />
  <FakeStepTest4 />
</WizardForm>;
*/

/* Basic example (each form step as a container)
    (NOTE: if you need to use nextStep(), prevStep(), or exit(), then you should NOT use this):
<WizardForm show={show} setShow={setShow}>
  <Container>
    <Row>
      <Col>HELLO</Col>
    </Row>
  </Container>
  <Container>
    <Row>
      <Col>HELLO</Col>
    </Row>
  </Container>
  <Container>
    <Row>
      <Col>HELLO</Col>
    </Row>
  </Container>
  <Container>
    <Row>
      <Col>HELLO</Col>
    </Row>
  </Container>
</WizardForm>
*/

// TODO the below is used for testing and should be deleted when this form has been finalized

export const FakeStepTest1: React.FC = () => (
  <Container>
    <Row>
      <Col>HELLO</Col>
    </Row>
  </Container>
);

export const FakeStepTest2: React.FC = () => (
  <Container>
    <Row>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
    </Row>
  </Container>
);

export const FakeStepTest3: React.FC = () => (
  <Container>
    <Row>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
    </Row>
    <Row>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
    </Row>
    <Row>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
    </Row>
    <Row>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
    </Row>
    <Row>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
    </Row>
  </Container>
);

export const FakeStepTest4: React.FC = () => (
  <Container>
    <Row>
      <Col>HELLO</Col>
      <Col>HELLO</Col>
    </Row>
  </Container>
);
