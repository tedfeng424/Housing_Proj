import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Cookies from 'universal-cookie';
import MyListCard from './MyListCard';

const MyList: React.FC<{}> = () => {
  const cookies = new Cookies();

  return (
    <Container className="my-list">
      My list
      <Row>
        <MyListCard name="Keen" phone="123-456-7890" email="email@email.com" />
      </Row>
      {cookies.get('liked') ? ( // TODO: this must be done through backend. don't use cookies to check
        cookies
          .get('liked')
          .map(
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
