import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HouseCard, { PathProps } from './HouseCard';
import { getHousing } from '../apis/index';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectingHousingPosts,
  updateHousingPosts,
} from '../redux/slices/housing';

const HousingList: React.FC = () => {
  //const [cards, setCards] = useState<PathProps[]>([]);
  const cards = useSelector(selectingHousingPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    // api call to get the housing card info
    dispatch(updateHousingPosts(getHousing));
  }, []);

  return (
    <Container fluid>
      <Row>
        {cards.map(
          ({
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
                photo={photo}
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
