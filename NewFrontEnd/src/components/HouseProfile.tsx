import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import SlideShow from './SlideShow';
import GoogleMap from './GoogleMap';

interface PathProps {
  houseType: string;
  pricePerMonth: number;
  roomType: string;
  moveIn: string;
  stayPeriod: string;
  facilities: string[];
  lookingFor: string[];
  distance: number;
  address: string;
  bioName: string;
  bioYear: number;
  bioMajor: string;
  bioProfilePic: string;
  bioDescription: string;
  show: boolean;
  setShow: (show: boolean) => void;
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
  bioName,
  bioYear,
  bioMajor,
  bioProfilePic,
  bioDescription,
  show,
  setShow,
}) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} size="xl" centered>
      <Container>
        <Row>
          {/* first column */}
          <Col sm={12} md={4} className="text-center">
            <SlideShow setShow={(fake: boolean) => {}} />
          </Col>

          {/* second column */}
          <Col sm={12} md={5}>
            <Container>
              <Row>
                <span className="house-type">{houseType}</span>
              </Row>

              <Row>
                <Col className="price" md={5}>
                  <Row>${pricePerMonth}</Row>
                </Col>
                <Col md={{ span: 5, offset: 2 }}>
                  <Row>Room type</Row>
                  <Row>
                    <h4>
                      <b>{roomType}</b>
                    </h4>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col md={5}>
                  <Row>Move in time</Row>
                  <Row>
                    <h4>
                      <b>{moveIn}</b>
                    </h4>
                  </Row>
                </Col>

                <Col md={{ span: 5, offset: 2 }}>
                  <Row>Stay period</Row>
                  <Row>
                    <h4>
                      <b>{stayPeriod}</b>
                    </h4>
                  </Row>
                </Col>
              </Row>

              <Row>. . .</Row>
              <Row>Facilities</Row>
              <Row>
                {facilities.map((facility) => (
                  <Col sm={{ span: 4, offset: 2 }} lg={{ span: 3, offset: 1 }}>
                    {facility}
                  </Col>
                ))}
              </Row>

              <Row>. . .</Row>
              <Row>Looking for</Row>
              <ul>
                {lookingFor.map((description) => (
                  <li>{description}</li>
                ))}
              </ul>
            </Container>
          </Col>

          {/* third column */}
          <Col sm={12} md={3} className="d-flex flex-column">
            <Button className="w-90">Add to my list!</Button>

            <div className="text-primary">
              <b>{distance} miles from school</b>
            </div>
            <div>{address}</div>
            <div>
              <GoogleMap />
            </div>

            <Container className="bio">
              <Row>
                <Col md={8} className="text-center">
                  <div>
                    <b>{bioName}</b>
                  </div>

                  <div>
                    {bioYear} | {bioMajor}
                  </div>

                  <div>Contact icons here</div>
                </Col>

                <Col md={4} className="mt-auto">
                  <Image src={bioProfilePic} roundedCircle fluid />
                </Col>
              </Row>

              <div className="speech-bubble">{bioDescription}</div>
            </Container>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};

export default HouseProfile;
