import React from 'react';
import NavBar from './components/NavBar';
import Filter from './components/Filter';
// import { Counter } from './redux-example/counter/Counter';
import Home from './components/Home';
// import ImagesUploader from './components/ImagesUploaderModule';
import OtherOptions from './components/OtherOptionsModule';
import AutoComplete from './components/PlacesAutoComplete';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
    </div>
  );
}

export default App;
