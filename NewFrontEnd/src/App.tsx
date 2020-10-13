import React from 'react';
import NavBar from './components/NavBar';
import Filter from './components/Filter';
// import { Counter } from './redux-example/counter/Counter';
import Home from './components/Home';
import PostHousing from './components/PostHousing';
// import ImagesUploader from './components/ImagesUploaderModule';
import OtherOptions from './components/OtherOptionsModule';
import AutoComplete from './components/PlacesAutoComplete';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Filter />
      <Home />
      <PostHousing />
    </div>
  );
}

export default App;
