import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import Home from './components/Home';
import { setIsLoggedIn, setUser } from './redux/slices/auth';

function App() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch to redux setting the user
    if (cookies.get('user')) {
      dispatch(setUser(cookies.get('user')));
      dispatch(setIsLoggedIn(true));
    }
  }, [cookies, dispatch]);

  return (
    <div className="App">
      <NavBar />
      <Home />
    </div>
  );
}

export default App;
