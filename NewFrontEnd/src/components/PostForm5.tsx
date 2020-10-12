import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PostForm5: React.FC<{}> = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <Container>
        <Row>
          <Button onClick={() => setShow(true)}>Fifth Page</Button>
        </Row>
      </Container>
      <Modal
        dialogClassName="post-modal"
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        centered
      >
        <Row>
          <Col>
            <span className="post-title">Now add something more personal~</span>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Form.Group>
            <Form.Label className="post-word">
              Who are you looking for?
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="henlo"
              rows={5}
            ></Form.Control>
          </Form.Group>
        </Row>

        <Row className="justify-content-center">
          <Form.Group>
            <Form.Label className="post-word">
              What's your lifestyle like?
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="henlo"
              rows={5}
            ></Form.Control>
          </Form.Group>
        </Row>

        <Row className="justify-content-center">
          <Button className="post-button">Post request</Button>
        </Row>
      </Modal>
    </>
  );
};

export default PostForm5;
