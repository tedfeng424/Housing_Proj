import React from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';

const PostPage5: React.FC<{}> = () => {
  return (
    <Container>
      <Row>
        <Col>
          <span className="post-title">Now add something more personal~</span>
        </Col>
      </Row>

      <Row>
        <Form.Group className="w-100">
          <Form.Label className="post-word">
            Who are you looking for?
          </Form.Label>
          <Form.Control
            className="post-text"
            as="textarea"
            placeholder="hello"
            rows={5}
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="w-100">
          <Form.Label className="post-word">
            What's your lifestyle like?
          </Form.Label>
          <Form.Control
            className="post-text"
            as="textarea"
            placeholder="aloha"
            rows={5}
          />
        </Form.Group>
      </Row>

      <Row className="justify-content-center">
        <Button className="post-button">Post!</Button>
      </Row>
    </Container>
  );
};

export default PostPage5;
