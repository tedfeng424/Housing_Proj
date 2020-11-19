import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import SlideShow from './SlideShow';
import HouseProfile, { facilityToIcon } from './HouseProfile';
import {
  abbreviateAddress,
  formatRoomType,
  formatMoveIn,
} from '../assets/utils';

// Path Props need to be exactly the same from backend response
// TODO: extract common interface between HouseCard and HouseProfile
export interface PathProps {
  name: string;
  location: string;
  distance: string;
  pricePerMonth: number;
  stayPeriod: number;
  early: string;
  late: string;
  roomType: string;
  leaserName: string;
  leaserEmail: string;
  leaserPhone: string;
  leaserSchoolYear: number;
  leaserMajor: string;
  leaserIntro: string;
  photo: string[];
  profilePhoto: string;
  other: string[];
  facilities: (keyof typeof facilityToIcon)[];
}

const HouseCard: React.FC<PathProps> = ({
  name,
  pricePerMonth,
  roomType,
  early,
  late,
  distance,
  location,
  photo,
  profilePhoto,
  stayPeriod,
  leaserName,
  leaserSchoolYear,
  leaserMajor,
  leaserIntro,
  leaserEmail,
  leaserPhone,
  other,
  facilities,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const SlideShowContent = photo.map((link) => ({
    src: `https://houseit.s3.us-east-2.amazonaws.com/${link}`,
    alt: `${leaserEmail} , ${location}}`,
  }));
  const [moveIn, setMoveIn] = useState<string>('');

  // abbreviate the move in date
  useEffect(() => {
    setMoveIn(formatMoveIn(early, late));
  }, [early, late]);

  return (
    <>
      <HouseProfile
        slideShowItems={SlideShowContent}
        pricePerMonth={pricePerMonth}
        roomType={roomType}
        moveIn={moveIn}
        distance={distance}
        address={location}
        houseName={name}
        stayPeriod={stayPeriod}
        facilities={facilities}
        lookingFor={other}
        bioName={leaserName}
        bioYear={leaserSchoolYear}
        bioMajor={leaserMajor}
        email={leaserEmail}
        phone={leaserPhone}
        bioProfilePic={profilePhoto}
        bioDescription={leaserIntro}
        show={show}
        setShow={setShow}
      />

      <Card className="house-card">
        <Card.Body className="p-0">
          <Container>
            <Row className="house-pic">
              <SlideShow
                images={SlideShowContent}
                onImageClick={() => setShow(true)}
              />
            </Row>

            {/* 1st row */}
            <Row className="px-2">
              {/* 1st, left */}
              <Col md={6} className="house-card-left-new">
                <Row>
                  {/* FIX THIS */}
                  <span>
                    <span className="house-card-price">
                      ${Math.round(pricePerMonth)}
                    </span>
                    <span className="house-card-negotiable">
                      {true ? ' (nnn)' : ''}
                    </span>
                  </span>
                </Row>
              </Col>

              {/* 1st, right */}
              <Col md={6} className="house-card-right-new house-card-right-top">
                <Row>
                  <div className="w-100 text-right">
                    {formatRoomType(roomType)}
                    <span className="divider"> | </span>
                    {5}B {3.5}B
                  </div>
                </Row>
              </Col>
            </Row>

            {/* 2nd row */}
            <Row className="px-2">
              {/* 2nd, left */}
              <Col md={6} className="house-card-left-new">
                <Row>
                  {/* todo: find a better way to put a space here */}
                  <span>
                    <span className="font-weight-bold">~ {distance}</span>
                    {' transit'}
                  </span>
                </Row>
              </Col>

              {/* 2nd, right */}
              <Col md={6} className="house-card-right-new">
                <Row className="house-card-right-row">
                  Move In {moveIn}
                  {/* <div className="w-100 text-right">Move In {moveIn}</div> */}
                  {/* <div className="w-100 text-right">yayayayayayayaya</div> */}
                </Row>
              </Col>
            </Row>

            {/* last row */}
            <Row className="px-2">
              {/* last, left */}
              <Col md={6} className="house-card-left-new">
                <Row>To Price Center</Row>
              </Col>

              {/* last, right */}
              <Col md={6} className="house-card-right-new">
                <Row className="house-card-right-row">
                  {abbreviateAddress(location)}
                </Row>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default HouseCard;
