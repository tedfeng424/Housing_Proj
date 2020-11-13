import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
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
  );
};

export default NavBar;
