import React from 'react';
import HouseProfile from './components/HouseProfile';
import NavBar from './components/NavigationBar';

import HouseCard from './components/HouseCard';
import Filter from './components/Filter';
import { Counter } from './redux-example/counter/Counter';
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Filter />
      <Home />
    </div>
  );
}

export default App;
