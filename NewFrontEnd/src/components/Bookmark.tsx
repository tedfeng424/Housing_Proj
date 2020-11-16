import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { HousePost } from '../assets/models/PostModels';
import HouseProfile from './HouseProfile';

// change this to PathProps extends HousePost {} to include other props
export type PathProps = HousePost;

const MyListCard: React.FC<PathProps> = (props) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <HouseProfile show={show} setShow={setShow} {...props} />

      <Button
        variant="no-show"
        className="mx-2 my-3"
        onClick={() => setShow(true)}
      >
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
              <Row>{props.leaserName}</Row>
              <Row>{props.leaserPhone}</Row>
              <Row>{props.leaserEmail}</Row>
            </Col>
          </Row>
        </Container>
      </Button>
    </>
  );
};

export default MyListCard;
