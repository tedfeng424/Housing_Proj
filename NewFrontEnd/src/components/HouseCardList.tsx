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
          cards.map((card) => (
            <Col xs={12} md={6} key={JSON.stringify(card)} className="mb-5">
              <HouseCard
                name={card.name}
                pricePerMonth={card.pricePerMonth}
                roomType={card.roomType}
                early={card.early}
                late={card.late}
                distance={card.distance}
                location={card.location}
                photos={card.photos}
                profilePhoto={card.profilePhoto}
                stayPeriod={card.stayPeriod}
                leaserName={card.leaserName}
                leaserSchoolYear={card.leaserSchoolYear}
                leaserMajor={card.leaserMajor}
                leaserIntro={card.leaserIntro}
                leaserEmail={card.leaserEmail}
                leaserPhone={card.leaserPhone}
                other={card.other}
                facilities={card.facilities}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default HousingList;
