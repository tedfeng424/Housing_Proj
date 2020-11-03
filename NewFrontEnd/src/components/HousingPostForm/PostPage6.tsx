import React from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import ImagesUploader from '../ImagesUploader';
interface PathProps {
  setShow: (show: boolean) => void;
}
const PostPage6: React.FC<PathProps> = ({ setShow }) => (
  <Container>
    <Row>
      <ImagesUploader setShow={setShow} />
    </Row>
  </Container>
);

export default PostPage6;
