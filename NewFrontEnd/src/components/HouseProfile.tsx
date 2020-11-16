import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectHousingFavorites,
  newHousingFavorite,
  removeHousingFavorite,
} from '../redux/slices/housing';
import GoogleMap from './GoogleMap';
import PreviewSlideShow from './PreviewSlideShow';
import { SlideShowItem } from './SlideShow';
import { contactIcons, miscIcons, facilityIcons } from '../assets/icons/all';

import { HousePost } from '../assets/models/PostModels';

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
  early: string;
  late: string;
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
  roomId: number;
  show: boolean;
  setShow: (show: boolean) => void;
}

const HouseProfile: React.FC<PathProps> = ({
  slideShowItems,
  houseName,
  pricePerMonth,
  roomType,
  moveIn,
  early,
  late,
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
  roomId,
  show,
  setShow,
}) => {
  const favorites = useSelector(selectHousingFavorites);
  const dispatch = useDispatch();

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
          <Col sm={12} lg={4}>
            <PreviewSlideShow
              items={slideShowItems}
              className="house-profile-preview-slideshow"
            />
          </Col>

          {/* second column */}
          <Col sm={12} md={6} lg={4}>
            {/* mt-3 mt-lg-5 mt-md-4 */}
            <Container className="d-flex flex-column justify-content-around mx-3 mx-lg-0 h-100">
              <Row className="justify-content-center flex-grow-0">
                <span className="housing-profile-house-type">{houseName}</span>
              </Row>

              <Row>
                <Col className="housing-profile-price" md={5}>
                  <Row>${pricePerMonth}</Row>
                </Col>
                <Col md={{ span: 5, offset: 2 }}>
                  <Row className="subtitle-text">Room type</Row>
                  <Row className="primary-text">{roomType}</Row>
                </Col>
              </Row>

              <Row className="justify-content-center">
                <Col md={5}>
                  <Row className="subtitle-text">Move in time</Row>
                  <Row className="primary-text">{moveIn}</Row>
                </Col>

                <Col md={{ span: 5, offset: 2 }}>
                  <Row className="subtitle-text">Stay period</Row>
                  <Row className="primary-text">{stayPeriod} months</Row>
                </Col>
              </Row>

              <Ellipse />

              <Row className="subtitle-text">Facilities</Row>
              <Row className="subtitle-text">
                {facilities.map((facility) => (
                  <Col
                    xs={{ span: 3, offset: 1 }}
                    key={facility}
                    className="text-center"
                  >
                    <GetIcon str={facility} />
                    {facility}
                  </Col>
                ))}
              </Row>

              <Ellipse />

              <Row className="subtitle-text">Looking for</Row>
              <ul className="primary-text">
                {lookingFor.map((description) => (
                  <li key={description}>{description}</li>
                ))}
              </ul>
            </Container>
          </Col>

          {/* third column */}
          <Col sm={12} md={6} lg={4} className="d-flex flex-column mt-3">
            <div className="house-profile-top-half">
              <Button
                variant="tertiary"
                onClick={() => {
                  const photos = slideShowItems.map((item) => item.src);
                  const housePost = {
                    // TODO change the prop vars to be the same name as HouseCard
                    photos,
                    name: houseName,
                    pricePerMonth,
                    roomType,
                    early,
                    late,
                    stayPeriod,
                    facilities,
                    other: lookingFor,
                    distance,
                    location: address,
                    leaserName: bioName,
                    leaserSchoolYear: bioYear,
                    leaserMajor: bioMajor,
                    leaserEmail: email,
                    leaserPhone: phone,
                    profilePhoto: bioProfilePic,
                    leaserIntro: bioDescription,
                    roomId,
                  };
                  if (favorites && favorites[roomId]) {
                    // need to remove from the favorites
                    dispatch(removeHousingFavorite(roomId)); // TODO temporarily use getHousePostId
                  } else {
                    // need to add to the favorites
                    dispatch(newHousingFavorite(housePost));
                  }
                }}
              >
                {favorites && favorites[roomId]
                  ? 'Remove bookmark!'
                  : 'Add bookmark!'}
              </Button>

              <div className="address-related-text">
                {distance} public transit to school
              </div>
              <div className="secondary-text">{address}</div>
              <GoogleMap address={address} />
            </div>

            <Container className="housing-profile-bio h-50">
              <Row>
                <Col xs={8} lg={9} className="text-center">
                  <div className="primary-text">{bioName}</div>

                  <div className="secondary-text">
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

                <Col xs={4} lg={3} className="mt-auto text-center">
                  <Image src={bioProfilePic} roundedCircle className="w-100" />
                </Col>
              </Row>

              <div className="housing-profile-speech-bubble">
                {bioDescription}
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};

export default HouseProfile;
