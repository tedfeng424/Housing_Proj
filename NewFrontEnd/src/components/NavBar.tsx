import React, { useState } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { GoogleLogout } from 'react-google-login';
import { useCookies } from 'react-cookie';
import Login from './Login';
import { navIcons } from '../assets/icons/all';

const logout = () => {
  console.log('Successful Logout');
};

const NavBar: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  return (
    <Container fluid className="d-flex navbar-whole">
      <Login show={showLogin} handleClose={handleCloseLogin} />

      <Col md={{ offset: 1, span: 8 }}>
        <nav className="navbar navbar-light">
          <a className="navbar-brand" href="/">
            <navIcons.logo />
          </a>
        </nav>
      </Col>
      <Col md={3}>
        <Row className="h-25" />
        {cookies.user === undefined ? (
          <Button className="g-sign-in" onClick={handleShowLogin}>
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
          />
        )}
      </Col>
    </Container>
  );
};

export default NavBar;
