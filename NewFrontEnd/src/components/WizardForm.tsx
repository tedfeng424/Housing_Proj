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
}

interface PathProps {
  children: { 0: React.ReactElement } & React.ReactElement[]; // the steps of the form (needs to be of length at least 0)
  show: boolean;
  setShow: (show: boolean) => void;
  hideButtons?: boolean;
}

const WizardForm: React.FC<PathProps> = ({
  children,
  show,
  setShow,
  hideButtons,
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
      <Container className="h-100">
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
