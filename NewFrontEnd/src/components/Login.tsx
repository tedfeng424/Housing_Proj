import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useCookies } from 'react-cookie';
import moment from 'moment';

// https://developers.google.com/identity/sign-in/web/sign-in
interface PathProps {
  handleClose: Function;
  show: boolean;
}

const Login: React.FC<PathProps> = ({ handleClose, show }) => {
  const [cookies, setCookie] = useCookies(['user']);

  const responseGoogleFail = (response: Error) => {
    console.log(response);
  };

  const responseGoogleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    if (isOnline(response)) {
      setCookie('user', response.profileObj, {
        expires: moment().add(30, 'seconds').toDate(), // expires 1 minute after login
      });
    } else {
      console.log(response);
    }
  };

  const isOnline = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ): response is GoogleLoginResponse => {
    return 'profileObj' in response;
  };

  console.log(cookies.user);

  return (
    <Modal id="LoginModal" show={show} onHide={handleClose} centered>
      <Button className="btn-filter">
        <img
          className="d-block"
          src="/close.svg"
          alt="Close"
          onClick={() => handleClose()}
        />
      </Button>
      <img className="d-block" src="/login.svg" alt="LogIn" />
      {cookies.user !== undefined ? (
        <span className="word"> Logged In as {cookies.user.givenName}! </span>
      ) : (
        <></>
      )}
      <GoogleLogin
        className="g-auth"
        clientId="778916194800-977823s60p7mtu1sj72ru0922p2pqh6m.apps.googleusercontent.com"
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleFail}
        // TODO: add login cookie to onSuccess using react-cookie
        cookiePolicy="single_host_origin"
        icon={false}
      >
        <img className="d-block" src="/loginButton.svg" alt="LogInButton" />
      </GoogleLogin>
    </Modal>
  );
};

export default Login;
