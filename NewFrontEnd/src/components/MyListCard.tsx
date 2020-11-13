import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export interface PathProps {
  name: string;
  phone: string;
  email: string;
  photos: string[];
}

const MyListCard: React.FC<PathProps> = ({ name, phone, email, photos }) => {
  return (
    <Container className="my-list-card">
      <Row className="d-flex">
        <Col
          xs="auto"
          style={{
            margin: '5px',
            padding: '0px',
          }}
        >
          <img // TODO change this to be a carousel (first need to update the carousel)
            className="my-list-image"
            src="https://cdn.vox-cdn.com/thumbor/op7DSI_UdWcXSbVGqA4wKYc2v3E=/0x0:1800x1179/1200x800/filters:focal(676x269:964x557)/cdn.vox-cdn.com/uploads/chorus_image/image/66741310/3zlqxf_copy.0.jpg"
            alt="First slide"
          />
        </Col>
        <Col className="align-self-center">
          <Row>{name}</Row>
          <Row>{phone}</Row>
          <Row>{email}</Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MyListCard;
