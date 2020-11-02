import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/auth';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import HousingList from './HouseCardList';
import Filter from './Filter';
import TV from './TV';
import Login from './Login';
import HousingPost from './HousingPostForm';
import HouseCard, { PathProps } from './HouseCard';
import MyList from './MyList';
import MyListCard from './MyListCard';

const Home: React.FC = () => {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [showHousingPost, setShowHousingPost] = useState<boolean>(false);
  const handleCloseHousingPost = () => setShowHousingPost(false);
  const handleShowHousingPost = () => setShowHousingPost(true);
  const user = useSelector(selectUser);

  return (
    <Container>
      {/* Modals */}
      <Login show={showLogin} handleClose={handleCloseLogin} />
      <HousingPost show={showHousingPost} setShow={setShowHousingPost} />

      {/* The actual home page */}
      <Row className="mb-5">
        <Col md={9} className="my-auto">
          <Filter />
        </Col>

        <Col md={3} className="my-auto">
          <TV>
            {!user ? (
              <>
                <div className="secondary-title mt-3">Hello</div>
                <div className="tv-separator" />
                <Button onClick={handleShowLogin}>Sign in to post</Button>
              </>
            ) : (
              <>
                {/* TODO this is temporary for while the 'Post ur request' is disabled */}
                <div className="secondary-title mt-3">Hello</div>
                <div className="tv-separator" />
                <Button onClick={handleShowHousingPost}>Post house info</Button>
                {/* <Button>Post ur request</Button> */}
              </>
            )}
          </TV>
        </Col>
      </Row>

      <Row>
        <Col md={9}>
          <HousingList />
        </Col>

        {/* see if either md=3 or md=auto works -Keenan */}
        <Col md={3}>
          <MyList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
