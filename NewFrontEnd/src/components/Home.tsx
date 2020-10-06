import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HouseCard, { PathProps } from './HouseCard';

const Home: React.FC<{}> = () => {
  const [cards, setCards] = useState<PathProps[]>([]);

  useEffect(() => {
    // api call to get the housing cards
    setCards([
      {
        pricePerMonth: 1200,
        roomType: 'Single',
        moveIn: 'Anytime',
        distance: 20,
        address: '8550 Julian Street, 93660',
      },
      {
        pricePerMonth: 1200,
        roomType: 'Single',
        moveIn: 'Anytime',
        distance: 20,
        address: '8550 Julian Street, 93660',
      },
      {
        pricePerMonth: 1200,
        roomType: 'Single',
        moveIn: 'Anytime',
        distance: 20,
        address: '8550 Julian Street, 93660',
      },
      {
        pricePerMonth: 1200,
        roomType: 'Single',
        moveIn: 'Anytime',
        distance: 20,
        address: '8550 Julian Street, 93660',
      },
      {
        pricePerMonth: 1200,
        roomType: 'Single',
        moveIn: 'Anytime',
        distance: 20,
        address: '8550 Julian Street, 93660',
      },
      {
        pricePerMonth: 1200,
        roomType: 'Single',
        moveIn: 'Anytime',
        distance: 20,
        address: '8550 Julian Street, 93660',
      },
      {
        pricePerMonth: 1200,
        roomType: 'Single',
        moveIn: 'Anytime',
        distance: 20,
        address: '8550 Julian Street, 93660',
      },
      {
        pricePerMonth: 1200,
        roomType: 'Single',
        moveIn: 'Anytime',
        distance: 20,
        address: '8550 Julian Street, 93660',
      },
      {
        pricePerMonth: 1200,
        roomType: 'Single',
        moveIn: 'Anytime',
        distance: 20,
        address: '8550 Julian Street, 93660',
      },
      {
        pricePerMonth: 1200,
        roomType: 'Single',
        moveIn: 'Anytime',
        distance: 20,
        address: '8550 Julian Street, 93660',
      },
      {
        pricePerMonth: 1200,
        roomType: 'Single',
        moveIn: 'Anytime',
        distance: 20,
        address: '8550 Julian Street, 93660',
      },
      {
        pricePerMonth: 1200,
        roomType: 'Single',
        moveIn: 'Anytime',
        distance: 20,
        address: '8550 Julian Street, 93660',
      },
      {
        pricePerMonth: 1200,
        roomType: 'Single',
        moveIn: 'Anytime',
        distance: 20,
        address: '8550 Julian Street, 93660',
      },
      {
        pricePerMonth: 1200,
        roomType: 'Single',
        moveIn: 'Anytime',
        distance: 20,
        address: '8550 Julian Street, 93660',
      },
      {
        pricePerMonth: 1200,
        roomType: 'Single',
        moveIn: 'Anytime',
        distance: 20,
        address: '8550 Julian Street, 93660',
      },
    ]);
  }, []);

  return (
    <Container fluid>
      <Col md={{ span: 8, offset: 1 }}>
        <Row>
          {cards.map(
            ({ pricePerMonth, roomType, moveIn, distance, address }) => (
              <Col md={6} style={{ marginBottom: '50px' }}>
                <HouseCard
                  pricePerMonth={pricePerMonth}
                  roomType={roomType}
                  moveIn={moveIn}
                  distance={distance}
                  address={address}
                />
              </Col>
            ),
          )}
        </Row>
      </Col>
    </Container>
  );
};

export default Home;
