import React, { useState } from 'react'
import Login from './Login';

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src="/logo.png" width="66" height="66"></img>
        </a>
        <button className="sign-in" onClick={handleShow}>Sign In</button>
      </nav>

      <Login show={show} handleClose={handleClose}></Login>
    </>
  )
}

export default NavBar;