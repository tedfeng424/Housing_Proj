import React from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { miscIcons } from '../assets/icons/all';

interface PathProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const ProfileModal: React.FC<PathProps> = ({ show, setShow }) => (
  <Modal
    dialogClassName="wizard-form-modal-dialog"
    show={show}
    onHide={() => setShow(false)}
    centered
  >
    <div className="h-100 w-100">
      {/* TODO add border-radius to top and bottom rows */}
      <div className="profile-form-top-bar">
        <Button
          variant="no-show"
          className="mr-auto"
          onClick={() => setShow(false)}
        >
          <miscIcons.orangeX />
        </Button>
        <span className="title mr-auto ml-auto">Edit Profile</span>
      </div>

      {/* TODO <div className="d-flex align-items-center justify-content-around h-100"> */}
      <div className="profile-form-middle">
        <Container>
          <Row>
            <Col md={4} className="profile-info">
              <div className="profile-name">Jacob Jones</div>
            </Col>
            <Col md={8}>
              <Form.Row className="justify-content-center m-2 my-4">
                <Form.Group as={Col} controlId="profileEmail">
                  <Form.Label className="profile-form-label">
                    School Email
                  </Form.Label>
                  <Form.Control
                    className="single-line-input"
                    type="email"
                  ></Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="profilePhone">
                  <Form.Label className="profile-form-label">Phone</Form.Label>
                  <Form.Control
                    className="single-line-input"
                    type="text"
                  ></Form.Control>
                </Form.Group>
              </Form.Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  </Modal>
);

export default ProfileModal;
