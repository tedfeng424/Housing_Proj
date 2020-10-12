import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Button } from 'reactstrap';
import { GoogleLogout } from 'react-google-login';
import Login from './Login';
import { navIcons } from '../assets/icons/all';

interface NavBarProps {}

const logout = () => {
  console.log('Successful Logout');
};

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isSignedOut, setIsSignedOut] = useState<boolean>(true); // TODO change this to be handled by redux

  return (
    <div className="d-flex mx-5 justify-content-between">
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="/">
          <navIcons.logo />
        </a>
      </nav>
      {isSignedOut ? (
        <Button className="sign-in" onClick={handleShow}>
          {/* need to handle isSignedOut case */}
          Sign In
        </Button>
      ) : (
        <GoogleLogout
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
        />
      )}
      <Login show={show} handleClose={handleClose} />
    </div>
  );
};

export default NavBar;
