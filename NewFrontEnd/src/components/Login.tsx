import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, selectUser, login } from '../redux/slices/auth';

// https://developers.google.com/identity/sign-in/web/sign-in
interface PathProps {
  handleClose: Function;
  show: boolean;
}

const Login: React.FC<PathProps> = ({ handleClose, show }) => {
  const [cookies, setCookie] = useCookies(['user']);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const isOnline = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ): response is GoogleLoginResponse => {
    return 'profileObj' in response;
  };

  const responseGoogleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    if (isOnline(response)) {
      const { profileObj } = response;

      // TODO this is temporary, since the backend will be setting the cookie in the future
      setCookie('user', profileObj, {
        maxAge: 4320, // expires  72 hours after login
      });

      const { name, email, imageUrl } = profileObj;
      const newUser = { name, email, imageUrl };
      dispatch(login(JSON.stringify(newUser)));
    } else {
      console.log(response);
    }
  };

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
      {user !== undefined ? (
        <span className="word"> Logged In using Redux as {user.name}! </span> // lil' test here
      ) : (
        <></>
      )}
      <GoogleLogin
        className="g-auth"
        clientId="778916194800-977823s60p7mtu1sj72ru0922p2pqh6m.apps.googleusercontent.com"
        onSuccess={(response) => {
          responseGoogleSuccess(response);
          handleClose();
        }}
        onFailure={(response) => console.log(response)}
        // TODO: add login cookie to onSuccess using react-cookie
        cookiePolicy="single_host_origin"
        icon={false}
      >
        {/* 
        isSignedIn={true} attribute will call onSuccess callback on load to keep the user signed in
         */}
        <img className="d-block" src="/loginButton.svg" alt="LogInButton" />
      </GoogleLogin>
    </Modal>
  );
};

export default Login;
