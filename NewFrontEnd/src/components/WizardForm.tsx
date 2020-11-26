/* Documentation of this component is at the bottom */
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { miscIcons } from '../assets/icons/all';

/**
 * Each child component will be given a nextStep()/prevStep() function to navigate the form,
 * and an exit() function to exit the form (i.e. when the user completes the form)
 */
export interface WizardFormStep {
  exitWizardForm: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (i: number) => void;
  // TODO add this: submitForm: () => boolean;
}

interface PathProps {
  children: { 0: React.ReactElement } & React.ReactElement[]; // the steps of the form (needs to be of length at least 0)
  show: boolean;
  setShow: (show: boolean) => void;
  title: string;
  // TODO also add this (not in the interface though):
  // WizardForm storage - place to store everything filled out in the form
  // validationChecks - checks in the WizardForm storage thing to validate everything that needs to be validated
  // onSubmit function that first checks the validationChecks and then calls whatever they pass into onSubmit
}

const WizardForm: React.FC<PathProps> = ({
  children,
  show,
  setShow,
  title,
}) => {
  const [index, setIndex] = useState<number>(0);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(index === children.length - 1);
  const [CurStep, setCurStep] = useState<React.ReactElement>(children[0]);

  useEffect(() => {
    setCurStep(children[index]);
    setIsFirst(index === 0);
    setIsLast(index === children.length - 1);
  }, [index, children]);

  const exitWizardForm = () => {
    setShow(false);
  };

  const setStep = (i: number) => {
    if (i >= 0 && i < children.length) setIndex(i);
  };

  const nextStep = () => {
    if (index + 1 < children.length) setIndex(index + 1);
  };

  const prevStep = () => {
    if (index - 1 >= 0) setIndex(index - 1);
  };

  // TODO need to figure out how to have loading thing on top
  return (
    <Modal
      dialogClassName="wizard-form-modal-dialog"
      show={show}
      onHide={() => setShow(false)}
      centered
    >
      <div className="h-100 w-100">
        {/* TODO add border-radius to top and bottom rows */}
        <div className="wizard-form-top-bar">
          <Button variant="no-show" onClick={() => setShow(false)}>
            <miscIcons.orangeX />
          </Button>
          <span className="title">{title}</span>
          <span className="reset">Reset</span>
        </div>

        {/* TODO <div className="d-flex align-items-center justify-content-around h-100"> */}
        <div className="wizard-form-middle">
          {React.cloneElement(CurStep, {
            nextStep,
            prevStep,
            setStep,
            exitWizardForm,
          })}
        </div>

        <div className="wizard-form-bottom-bar">
          <div className="d-flex">
            {children.map((c, i) => (
              <div className="mx-1">
                <Button variant="no-show" onClick={() => setStep(i)}>
                  {i === index ? (
                    <miscIcons.smallEllipseActive />
                  ) : (
                    <miscIcons.smallEllipseInactive />
                  )}
                </Button>
              </div>
            ))}
          </div>

          <div className="d-flex">
            <div className="mr-2">
              {isFirst ? (
                <div>
                  <Button variant="no-show" onClick={prevStep}>
                    <miscIcons.smallLeftArrowDisabled />
                  </Button>
                </div>
              ) : (
                <div>
                  <Button variant="no-show" onClick={prevStep}>
                    <miscIcons.smallLeftArrow />
                  </Button>
                </div>
              )}
            </div>

            <div className="ml-2">
              {isLast ? (
                <div>
                  <Button variant="no-show" onClick={nextStep}>
                    <miscIcons.smallRightArrowDisabled />
                  </Button>
                </div>
              ) : (
                <div>
                  <Button variant="no-show" onClick={nextStep}>
                    <miscIcons.smallRightArrow />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
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
<WizardForm show={show} setShow={setShow}>
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
