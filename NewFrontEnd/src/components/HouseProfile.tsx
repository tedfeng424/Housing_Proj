import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Cookies from 'universal-cookie';
import GoogleMap from './GoogleMap';
import PreviewSlideShow from './PreviewSlideShow';
import { SlideShowItem } from './SlideShow';
import { contactIcons, miscIcons, facilityIcons } from '../assets/icons/all';
import { formatRoomType } from '../assets/utils';

const Ellipse: React.FC<{}> = () => (
  <Row className="justify-content-center">
    <miscIcons.ellipse className="m-3" />
    <miscIcons.ellipse className="m-3" />
    <miscIcons.ellipse className="m-3" />
  </Row>
);

export const facilityToIcon = {
  Parking: <facilityIcons.parking />,
  Elevator: <facilityIcons.elevator />,
  'Gym room': <facilityIcons.gym />,
  'Swimming pool': <facilityIcons.swimmingPool />,
  'Pets friendly': <facilityIcons.petsFriendly />,
  'Indoor washer': <facilityIcons.indoorWasher />,
};

const GetIcon: React.FC<{ str: keyof typeof facilityToIcon }> = ({ str }) => (
  <div className="mt-2">{facilityToIcon[str]}</div>
);

interface PathProps {
  slideShowItems: SlideShowItem[];
  houseName: string;
  pricePerMonth: number;
  roomType: string;
  moveIn: string;
  stayPeriod: number;
  facilities: (keyof typeof facilityToIcon)[];
  lookingFor: string[];
  distance: string;
  address: string;
  bioName: string;
  bioYear: number;
  bioMajor: string;
  email: string;
  phone: string;
  bioProfilePic: string;
  bioDescription: string;
  show: boolean;
  setShow: (show: boolean) => void;
}

const HouseProfile: React.FC<PathProps> = ({
  slideShowItems,
  houseName,
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
  email,
  phone,
  bioProfilePic,
  bioDescription,
  show,
  setShow,
}) => {
  const cookies = new Cookies();

  const onClick = () => {
    // note this should be going through backend. I've done it through cookies right now,
    // but trying to serialise even one houseProfileObj makes the cookie too big... -Keenan
    const houseProfileObj = {
      // houseType: houseType,
      // pricePerMonth: pricePerMonth,
      // roomType: roomType,
      // moveIn: moveIn,
      // stayPeriod: stayPeriod,
      // facilities: facilities,
      // lookingFor: lookingFor,
      // distance: distance,
      // address: address,
      bioName,
      // bioYear: bioYear,
      // bioMajor: bioMajor,
      email,
      phone,
      // bioProfilePic: bioProfilePic,
      // bioDescription: bioDescription,
    };

    if (cookies.get('liked') === undefined) {
      const payload = JSON.stringify([houseProfileObj]);
      cookies.set('liked', payload, {
        path: '/',
        httpOnly: false,
        maxAge: 120,
      });
      // console.log(cookies.get('liked'));
    } else {
      const payload = JSON.stringify([
        ...cookies.get('liked'),
        houseProfileObj,
      ]);
      cookies.set('liked', payload, {
        path: '/',
        httpOnly: false,
        maxAge: 120,
      });
      // console.log(cookies.get('liked'));
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="xl"
      centered
      className="house-profile-modal"
    >
      <Container className="p-0">
        <Row>
          {/* first column */}
          <Col sm={12} lg={5}>
            <div onClick={() => setShow(false)} className="house-profile-close">
              <miscIcons.greenX className="d-block" />
            </div>
            <PreviewSlideShow
              items={slideShowItems}
              className="house-profile-preview-slideshow"
            />
          </Col>

          {/* second column */}
          <Col sm={12} md={6} lg={4}>
            {/* mt-3 mt-lg-5 mt-md-4 */}
            <Container className="d-flex flex-column justify-content-around mx-3 mx-lg-0 h-100">
              <Row className="flex-grow-0">
                <span className="housing-profile-house-type">{houseName}</span>
              </Row>

              <Row>
                <Col className="housing-profile-price" md={5}>
                  <Row>${pricePerMonth}</Row>
                </Col>
                <Col md={{ span: 5, offset: 2 }}>
                  <Row>Room type</Row>
                  <Row>
                    <h4>
                      <b>{formatRoomType(roomType)}</b>
                    </h4>
                  </Row>
                </Col>
              </Row>

              <Row className="justify-content-center">
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
                      <b>{stayPeriod} months</b>
                    </h4>
                  </Row>
                </Col>
              </Row>

              <Ellipse />

              <Row>Facilities</Row>
              <Row>
                {facilities.map((facility) => (
                  <Col xs={{ span: 3, offset: 1 }} className="text-center">
                    <GetIcon str={facility} />
                    {facility}
                  </Col>
                ))}
              </Row>

              <Ellipse />

              <Row>Looking for</Row>
              <ul>
                {lookingFor.map((description) => (
                  <li>{description}</li>
                ))}
              </ul>
            </Container>
          </Col>

          {/* third column */}
          <Col
            sm={12}
            md={6}
            lg={3}
            className="d-flex flex-column mt-lg-5 mt-md-4"
          >
            {/* todo: fix alignment here */}
            <div className="px-3 pl-lg-1">
              <Row>
                <Col>
                  <Button className="w-90">Add to my list!</Button>
                </Col>
                <Col>
                  <contactIcons.share className="d-block" />
                </Col>
              </Row>

              <div className="house-profile-distance">
                <b>~ {distance}</b> public transit to Price Center
              </div>

              <div>{address}</div>
              <GoogleMap address={address} />
            </div>

            <Container className="housing-profile-bio">
              <Row>
                <Col md={8} className="text-center">
                  <div>
                    <b>{bioName}</b>
                  </div>

                  <div>
                    {bioYear} | {bioMajor}
                  </div>

                  <Row className="justify-content-center">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip id="tooltip">{email}</Tooltip>}
                    >
                      <contactIcons.email
                        className="d-block mr-3"
                        onClick={async () => {
                          await navigator.clipboard.writeText(email);
                          window.open(`mailto:${email}`, '_blank');
                        }}
                      />
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip id="tooltip">{phone}</Tooltip>}
                    >
                      <contactIcons.phone
                        className="d-block mr-3"
                        onClick={async () => {
                          await navigator.clipboard.writeText(phone);
                          window.open(`tel:${phone}`, '_blank');
                        }}
                      />
                    </OverlayTrigger>
                  </Row>
                </Col>

                <Col md={4} className="mt-auto text-center">
                  <Image src={bioProfilePic} roundedCircle fluid />
                </Col>
              </Row>

              <div className="housing-profile-speech-bubble">
                {bioDescription}
                {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};

export default HouseProfile;
