import React from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { setPost, selectPost } from '../../redux/slices/posting';
import { useSelector, useDispatch } from 'react-redux';

const PostPage5: React.FC<{}> = () => {
  const dispatch = useDispatch();
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
            What's your lifestyle like?
          </Form.Label>
          <Form.Control
            className="post-text"
            as="textarea"
            placeholder="a little self intro would be great for your future roommates"
            rows={5}
            onChange={(event) =>
              dispatch(setPost(['leaserIntro', event.target.value]))
            }
          />
        </Form.Group>
      </Row>
    </Container>
  );
};

export default PostPage5;
