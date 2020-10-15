import React, { useState } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { GoogleLogout } from 'react-google-login';
import Login from './Login';
import { navIcons } from '../assets/icons/all';
import { useCookies } from 'react-cookie';

interface NavBarProps {}

const logout = () => {
  console.log('Successful Logout');
};

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  console.log(cookies);

  return (
    <Container fluid className="d-flex navbar-whole">
      <Col md={{ offset: 1, span: 8 }}>
        <nav className="navbar navbar-light">
          <a className="navbar-brand" href="/">
            <navIcons.logo />
          </a>
        </nav>
      </Col>
      <Col md={2}>
        <Row className="h-25"></Row>
        {cookies.user === undefined ? (
          <Button className="g-sign-in" onClick={handleShow}>
            {/* need to handle isSignedOut case */}
            Sign In
          </Button>
        ) : (
          <GoogleLogout
            clientId="778916194800-977823s60p7mtu1sj72ru0922p2pqh6m.apps.googleusercontent.com"
            onLogoutSuccess={() => {
              removeCookie('user');
            }}
            render={(renderProps) => (
              <Button
                className="g-sign-in"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                {/* need to handle isSignedOut case */}
                Log Out
              </Button>
            )}
          ></GoogleLogout>
        )}
      </Col>
      <Login show={show} handleClose={handleClose} />
    </Container>
  );
};

export default NavBar;
