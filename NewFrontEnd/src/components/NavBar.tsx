import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { GoogleLogout } from 'react-google-login';
import Cookies from 'universal-cookie';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../redux/slices/auth';
import Login from './Login';
import { navIcons } from '../assets/icons/all';

const NavBar: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <>
      <Login show={showLogin} handleClose={handleCloseLogin} />
      <Navbar sticky="top" className="navbar-wrapper p-0 m-0 mb-4">
        <Container className="d-flex align-items-center my-0">
          <div className="mr-auto">
            <a className="navbar-brand" href="/">
              <navIcons.logo className="navbar-logo-svg" />
            </a>
          </div>

          <div>
            {!user ? (
              <Button className="g-sign-in" onClick={handleShowLogin}>
                Sign In
              </Button>
            ) : (
              <Button className="g-sign-in" onClick={() => dispatch(logout())}>
                Log Out
              </Button>
            )}
          </div>
        </Container>
      </Navbar>
    </>
    // <Container fluid className="d-flex navbar-whole">

    //   <Col md={9}>
    //     <nav className="navbar navbar-light">
    //       <a className="navbar-brand" href="/">
    //         <navIcons.logo />
    //       </a>
    //     </nav>
    //   </Col>
    //   <Col md={3}>
    //     <Row className="h-25" />

    //   </Col>
    // </Container>
  );
};

export default NavBar;
