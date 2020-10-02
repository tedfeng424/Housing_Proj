import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import GoogleLogin from "react-google-login"

const responseGoogle = (response:Response) => {
  console.log(response);
};

// https://developers.google.com/identity/sign-in/web/sign-in
interface PathProps {
  handleClose: Function,
  show: boolean
}

const Login: React.FC<PathProps> = ({
  handleClose,
  show
}) => {
  return (
    <Modal
      id="LoginModal"
      show={show}
      onHide={handleClose}
      centered
    >
    <Button className="btn-filter">
    <img
    className="d-block"
    src="/close.svg"
    alt="Close"
    onClick={() => handleClose()}
    />
    </Button>
        <img
    className="d-block"
    src="/login.svg"
    alt="LogIn"
    />
      <GoogleLogin
        className="g-auth"
        clientId="778916194800-977823s60p7mtu1sj72ru0922p2pqh6m.apps.googleusercontent.com"
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
        icon={false}
      >
          <img
    className="d-block"
    src="/loginButton.svg"
    alt="LogInButton"
    />
      </GoogleLogin>
    </Modal>
  );
};

export default Login;