import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Button } from 'reactstrap';
import Login from './Login';
import { navIcons } from '../assets/icons/all';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-flex mx-5 justify-content-between">
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="/">
          <navIcons.logo />
        </a>
      </nav>
      <Button className="navbar-sign-in-button" onClick={handleShow}>
        Sign In
      </Button>
      <Login show={show} handleClose={handleClose} />
    </div>
  );
};

export default NavBar;
