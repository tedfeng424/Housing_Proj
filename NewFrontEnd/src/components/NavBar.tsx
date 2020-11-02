import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { GoogleLogout } from 'react-google-login';
import { useCookies } from 'react-cookie';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectToken, selectUser } from '../redux/slices/auth';
import Login from './Login';
import { navIcons } from '../assets/icons/all';

const NavBar: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  // useEffect(() => {
  //   if (cookies.user !== undefined && user === undefined) {
  //     const { name, email, imageUrl, ...rest } = cookies.user;
  //     const userFromCookie = { name, email, imageUrl };
  //     dispatch(setUser(userFromCookie));
  //   }
  // });

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
                {/* need to handle isSignedOut case */}
                Sign In
              </Button>
            ) : (
              <GoogleLogout
                clientId="778916194800-977823s60p7mtu1sj72ru0922p2pqh6m.apps.googleusercontent.com"
                onLogoutSuccess={() => {
                  removeCookie('user'); // TODO change this to be in auth.ts
                  dispatch(logout(JSON.stringify({ access_token: token })));
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
