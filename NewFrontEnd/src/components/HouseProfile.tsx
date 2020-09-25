import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FlexButton from './utility/FlexButton'
import SlideShow from './SlideShow'

interface PathProps {
  houseType: String;
  pricePerMonth: number;
  roomType: String;
  moveIn: String;
  stayPeriod: String;
  facilities: String[];
  lookingFor: String[];
  distance: number;
  address: String;
}

const HouseProfile: React.FC<PathProps> = ({
  houseType,
  pricePerMonth,
  roomType,
  moveIn,
  stayPeriod,
  facilities,
  lookingFor,
  distance,
  address,
}) => {
  const [show, setShow] = useState<boolean>(true);

  return (
    <>
      <Button onClick={() => setShow(true)}>click me!</Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        centered
      >
        <Container>
          <Row>
            {/* first column */}
            <Col sm={12} md={4} className="text-center">
              <SlideShow></SlideShow>
            </Col>

            {/* second column */}
            <Col sm={12} md={5}>
              <Container>
                <Row><span className="house-type">{houseType}</span></Row>

                <Row>
                  <Col className="price" md={5}>
                    <Row>${pricePerMonth}</Row>
                  </Col>
                  <Col md={{ span: 5, offset: 2 }}>
                    <Row>Room type</Row>
                    <Row><h4><b>{roomType}</b></h4></Row>
                  </Col>
                </Row>

                <Row>
                  <Col md={5}>
                    <Row>Move in time</Row>
                    <Row><h4><b>{moveIn}</b></h4></Row>
                  </Col>

                  <Col md={{ span: 5, offset: 2 }}>
                    <Row>Stay period</Row>
                    <Row><h4><b>{stayPeriod}</b></h4></Row>
                  </Col>
                </Row>

                <Row>. . .</Row>
                <Row>Facilities</Row>
                <Row>
                  {facilities.map(facility =>
                    <Col
                      sm={{ span: 4, offset: 2 }}
                      lg={{ span: 3, offset: 1 }}
                    >
                      {facility}
                    </Col>
                  )}
                </Row>

                <Row>. . .</Row>
                <Row>Looking for</Row>
                <ul>
                  {lookingFor.map(description => <li>{description}</li>)}
                </ul>

              </Container>
            </Col>

            {/* third column */}
            <Col sm={12} md={3}>
              <FlexButton>Add to my list!</FlexButton>

              <div className="text-primary"><b>{distance} miles from school</b></div>
              <div>{address}</div>
              <div>Map goes here.</div>

              <Container className="owner-description">Owner description goes here.</Container>

            </Col>
          </Row>
        </Container>
      </Modal>
    </>
  );
};

export default HouseProfile;

