import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { GoogleLogout } from 'react-google-login';
import Login from './Login';

interface NavBarProps {}
const logout = () => {
  console.log('Successful Logout');
};

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isSignedOut = true;

  return (
    <Container>
      <Row>
        <Col md={6}>
          <nav className="navbar navbar-light">
            <a className="navbar-brand" href="#">
              <img src="/logo.svg" width="66" height="66" />
            </a>
          </nav>
        </Col>
        <Col md={{ span: 1, offset: 5 }}>
          <Row className="h-50" />
          <Row>
            {isSignedOut ? (
              <button className="sign-in" onClick={handleShow}>
                {/* need to handle isSignedOut case */}
                Sign In
              </button>
            ) : (
              <GoogleLogout
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
              />
            )}
          </Row>
        </Col>
        <Login show={show} handleClose={handleClose} />
      </Row>
    </Container>
  );
};

export default NavBar;
