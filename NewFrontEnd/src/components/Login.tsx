import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'


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
      <div className="card">
        <article className="card-body">
          <h4 className="card-title text-center">Sign in</h4>
          <hr></hr>
          <form>
            <div className="form-group">
              <p className="text-center">insert google signin here</p>
            </div>
            <div className="form-group">
              <input name="" className="form-control" placeholder="UCSD Email" type="email"></input>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="*********" type="password"></input>
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary">Login</button>
            </div> 

            <div className="text-center">
              <a className="small" href="#">Forgot password?</a>
            </div>                                            
          </form>
        </article>
      </div>
    </Modal>
  );
};

export default Login;