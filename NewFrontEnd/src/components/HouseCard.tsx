import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import SlideShow, { SlideShowItem } from './SlideShow';
import HouseProfile from './HouseProfile';
import { abbreviateMonth, removeParentheses } from '../assets/utils';
import { Month } from '../assets/constants';
import { HousePost } from '../assets/models/PostModels';

// change this to PathProps extends HousePost {} to include other props
type PathProps = HousePost;

const HouseCard: React.FC<PathProps> = ({
  name,
  pricePerMonth,
  roomType,
  early,
  late,
  distance,
  location,
  photos,
  profilePhoto,
  stayPeriod,
  leaserName,
  leaserSchoolYear,
  leaserMajor,
  leaserIntro,
  leaserEmail,
  leaserPhone,
  roomId,
  other,
  facilities,
  negotiable,
  numBaths,
  numBeds,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [moveIn, setMoveIn] = useState<string>('');
  const [slideShowItems, setSlideShowItems] = useState<SlideShowItem[]>([]);

  // set the slide show items
  useEffect(() => {
    setSlideShowItems(
      photos.map((url) => ({
        src: `https://houseit.s3.us-east-2.amazonaws.com/${url}`,
        alt: `${leaserEmail} , ${location}}`,
      })),
    );
  }, [setSlideShowItems, photos, leaserEmail, location]);

  // abbreviate the move in date
  useEffect(() => {
    const [earlyInt, earlyMonth] = early.split(' ') as [string, Month];
    const [lateInt, lateMonth] = late.split(' ') as [string, Month];

    // TODO temporary, 'anytime' should not be in the database (same with the removeParentheses)
    const earlyIntDisplayed =
      earlyInt.toLowerCase() === 'anytime' ? '' : removeParentheses(earlyInt);
    const lateIntDisplayed =
      lateInt.toLowerCase() === 'anytime' ? '' : removeParentheses(lateInt);

    setMoveIn(
      `${earlyIntDisplayed} ${abbreviateMonth(
        earlyMonth,
      )} - ${lateIntDisplayed} ${abbreviateMonth(lateMonth)}`,
    );
  }, [early, late]);

  return (
    <>
      <HouseProfile
        photos={photos}
        pricePerMonth={pricePerMonth}
        roomType={roomType}
        early={early}
        late={late}
        distance={distance}
        location={location}
        name={name}
        stayPeriod={stayPeriod}
        facilities={facilities}
        other={other}
        leaserName={leaserName}
        leaserSchoolYear={leaserSchoolYear}
        leaserMajor={leaserMajor}
        leaserEmail={leaserEmail}
        leaserPhone={leaserPhone}
        profilePhoto={profilePhoto}
        leaserIntro={leaserIntro}
        roomId={roomId}
        show={show}
        onHide={() => setShow(false)}
        negotiable={negotiable}
        numBaths={numBaths}
        numBeds={numBeds}
      />

      <Card className="house-card">
        <Card.Body className="p-0">
          <Container>
            <Row className="house-pic">
              <SlideShow
                images={slideShowItems}
                onImageClick={() => setShow(true)}
              />
            </Row>
            <Row className="px-2">
              <Col md={4} className="price-related-large-text">
                <Row>
                  {negotiable && '~'}${pricePerMonth}
                </Row>
              </Col>
              <Col md={8} className="pt-1">
                <Row>
                  <div className="w-100 text-right secondary-text">
                    {roomType}
                    <span className="divider"> | </span>{' '}
                    {`${numBeds} B ${numBaths} Ba`}
                  </div>
                </Row>
                <div className="text-right secondary-text">
                  Move in {moveIn}
                </div>
              </Col>
            </Row>
            <Row className="px-2">
              <Col md={4} className="address-related-text">
                <Row>{distance}</Row>
              </Col>

              <Col md={8} className="secondary-text">
                <Row>
                  <div className="w-100 text-right text-truncate">
                    {location}
                  </div>
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
