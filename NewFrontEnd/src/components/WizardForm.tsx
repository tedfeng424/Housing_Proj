/* Documentation of this component is at the bottom */
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { miscIcons } from '../assets/icons/all';
import { AtLeastOneArray, AtLeastOneObject, OneFrom } from '../assets/utils';

/**
 * Each child component will be given:
 * - nextStep()/prevStep() function to navigate the form
 * - an exit() function to exit the form (i.e. when the user completes the form)
 * - a submitForm() which can be called when you would like to submit the form (it returns T/F based on success of onSubmit and validationChecks)
 */
type setWizardFormStorageFunction<P> = (
  value: AtLeastOneObject<P, OneFrom<P>>,
) => void;
export interface WizardFormStep<P> {
  exitWizardForm: () => void;
  nextStep: () => void;
  prevStep: () => void;
  useWizardFormStorage: <P extends {}>() => [
    P,
    setWizardFormStorageFunction<P>,
  ];
  submitForm: () => boolean; // returns success or failure. // TODO needs to be undefined if onSubmit is undefined
}

type WizardFormChild<T> = React.ReactElement<WizardFormStep<T>>;

// T is whatever is in the storage
interface PathProps<T = {}> {
  children: AtLeastOneArray<WizardFormChild<T>>; // the steps of the form (needs to be of length at least 0)
  show: boolean;
  setShow: (show: boolean) => void;
  hideButtons?: boolean;
  onSubmit: (wizardFormStorage: T) => boolean;
  // TODO validationChecks?: ObjectValidationChecks<T>; // each part in the storage should have a validation check
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
  initialStorage = {},
}: PathProps<T>) => {
  const [index, setIndex] = useState<number>(0);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(index === children.length - 1);
  const [CurStep, setCurStep] = useState<WizardFormChild<T>>(children[0]);
  const [wizardFormStorage, setWizardFormStorage] = useState<Partial<T>>(
    initialStorage,
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
   */
  const nextStep = () => {
    if (index + 1 < children.length) setIndex(index + 1);
  };

  /**
   * Use this to navigate the wizard form to the previous step.
   */
  const prevStep = () => {
    if (index - 1 >= 0) setIndex(index - 1);
  };

  /**
   * Use this to submit the form (it runs validation checks first).
   * Returns T/F based on success of validationChecks and onSubmit.
   * (i.e. returns false if validation fails, returns false if onSubmit
   * returns false, otherwise returns true).
   */
  const submitForm = (): boolean => {
    // TODO this is not good enough. You want 2 options: 1) validation result for the whole form and 2) validation result for only one page in the form
    // TODO if (validationChecks) {
    //   // validate each value in the wizard form storage and return false if any of them didn't pass the validation
    //   const validationResult: boolean = (Object.keys(validationChecks) as Array<
    //     keyof T
    //   >).reduce<boolean>(
    //     (prev, cur) => prev && validationChecks[cur](wizardFormStorage[cur]),
    //     true,
    //   );
    //   if (!validationResult) return false;
    // }
    // Everything should be validated by this point
    return onSubmit(wizardFormStorage as T);
  };

  /**
   * Hook to access function to update WizardForm's "local storage". It's shared among all children.
   * Works similar to useState.
   */
  const useWizardFormStorage = <P extends Partial<T>>() => {
    const setWizardFormStorageWrapper: setWizardFormStorageFunction<P> = (
      value: AtLeastOneObject<P>,
    ) => setWizardFormStorage({ ...wizardFormStorage, ...value });
    // wizard form storage is limited to the intersection of P and T
    return [wizardFormStorage as P, setWizardFormStorageWrapper] as [
      P,
      setWizardFormStorageFunction<P>,
    ];
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
                <Button onClick={prevStep} className="no-show">
                  <miscIcons.leftArrow />
                </Button>
              </div>
            )}
          </Col>

          <Col xs={10} className="d-flex">
            {React.cloneElement(CurStep, {
              nextStep,
              prevStep,
              exitWizardForm,
              submitForm,
              useWizardFormStorage,
            })}
          </Col>

          <Col xs={1} className="d-flex arrow-icon justify-content-center">
            {!isLast && !hideButtons && (
              <div>
                <Button onClick={nextStep} className="no-show">
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

// interface TestWizardFormStorage {
//   storage:
// }

// export const TestWizardForm: React.FC = () => (
//   <WizardForm<
// );
