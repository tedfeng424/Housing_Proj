import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import HouseCard from './HouseCard';
import { getHousingPosts, selectHousingPosts } from '../redux/slices/housing';

const HousingList: React.FC = () => {
  const cards = useSelector(selectHousingPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    // api call to get the housing card info
    dispatch(getHousingPosts());
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        {cards && // TODO this should be handled within the loader component (not yet made)
          cards.map(
            ({
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
              other,
              facilities,
            }) => (
              <Col xs={12} md={6} className="mb-5">
                <HouseCard
                  name={name}
                  pricePerMonth={pricePerMonth}
                  roomType={roomType}
                  early={early}
                  late={late}
                  distance={distance}
                  location={location}
                  photos={photos}
                  profilePhoto={profilePhoto}
                  stayPeriod={stayPeriod}
                  leaserName={leaserName}
                  leaserSchoolYear={leaserSchoolYear}
                  leaserMajor={leaserMajor}
                  leaserIntro={leaserIntro}
                  leaserEmail={leaserEmail}
                  leaserPhone={leaserPhone}
                  other={other}
                  facilities={facilities}
                />
              </Col>
            ),
          )}
      </Row>
    </Container>
  );
};

export default HousingList;
