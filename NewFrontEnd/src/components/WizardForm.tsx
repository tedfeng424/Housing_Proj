import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { miscIcons } from '../assets/icons/all';

// each child component will be given a nextStep(), prevStep() function to move onto the next/previous step in the form. They'll also be given an exit() function to exit the form (i.e. when the user completes the form)
export interface WizardFormStep {
  exitWizardForm: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

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

interface PathProps {
  steps: { 0: React.ReactElement } & React.ReactElement[]; // the steps of the form (needs to be of length at least 0)
  show: boolean;
  setShow: (show: boolean) => void;
  hideButtons?: boolean;
}

const WizardForm: React.FC<PathProps> = ({
  steps,
  show,
  setShow,
  hideButtons,
}) => {
  const [index, setIndex] = useState<number>(0);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(index === steps.length - 1);
  const [CurStep, setCurStep] = useState<React.ReactElement>(steps[0]);

  useEffect(() => {
    setCurStep(steps[index]);
    setIsFirst(index === 0);
    setIsLast(index === steps.length - 1);
  }, [index, steps]);

  const exitWizardForm = () => {
    setShow(false);
  };

  const nextStep = () => {
    if (index + 1 < steps.length) setIndex(index + 1);
  };

  const prevStep = () => {
    if (index - 1 >= 0) setIndex(index - 1);
  };

  // TODO need to customize the modal, and figure out how to put the loading thing on top
  return (
    <Modal show={show} onHide={() => setShow(false)} size="xl" centered>
      <Container>
        <div className="d-flex align-items-center justify-content-around">
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
