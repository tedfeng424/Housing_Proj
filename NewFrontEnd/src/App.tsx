import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import Home from './components/Home';
import { setUser } from './redux/slices/auth';

function App() {
  const [cookies] = useCookies(['user']);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch to redux setting the user
    dispatch(setUser(cookies.user));
  }, [cookies, dispatch]);

  return (
    <div className="App">
      <NavBar />
      <Home />
    </div>
  );
}

export default App;
