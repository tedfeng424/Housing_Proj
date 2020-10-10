import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HouseCard, { PathProps } from './HouseCard';
import WizardForm, {
  FakeStepTest1,
  FakeStepTest2,
  FakeStepTest3,
} from './WizardForm';

const Home: React.FC<{}> = () => {
  const [cards, setCards] = useState<PathProps[]>([]);

  useEffect(() => {
    // fake the api call to get the housing card info
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

  // TODO remove the wizard form test
  const [sh, setSh] = useState<boolean>(true);
  return (
    <>
      <WizardForm
        steps={[<FakeStepTest1 />, <FakeStepTest2 />, <FakeStepTest3 />]}
        show={sh}
        setShow={setSh}
      />

      <Container fluid>
        <Row>
          {cards.map(
            ({ pricePerMonth, roomType, moveIn, distance, address }) => (
              <Col xs={12} md={6} lg={4} style={{ marginBottom: '50px' }}>
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
      </Container>
    </>
  );
};

export default Home;
