import React from 'react';
import NavBar from './components/NavBar';
import Filter from './components/Filter';
import { Counter } from './redux-example/counter/Counter';
import Home from './components/Home';

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
