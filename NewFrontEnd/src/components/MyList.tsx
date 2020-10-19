import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useCookies } from 'react-cookie';
import MyListCard from './MyListCard';

const MyList: React.FC<{}> = () => {
  const [cookies] = useCookies(['liked']);

  return (
    <Container className="my-list">
      My list
      <Row>
        <MyListCard name="Keen" phone="123-456-7890" email="email@email.com" />
      </Row>
      {cookies.liked !== undefined ? (
        cookies.liked.map(
          ({
            bioName,
            email,
            phone,
          }: {
            bioName: any;
            email: any;
            phone: any;
          }) => (
            <Row>
              <MyListCard
                name={String(bioName)}
                phone={String(phone)}
                email={String(email)}
              />
            </Row>
          ),
        )
      ) : (
        <></>
      )}
    </Container>
  );
};

export default MyList;
