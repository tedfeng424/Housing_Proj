import React from 'react';
import HouseProfile from './components/HouseProfile';
import { Counter } from './features/counter/Counter';

function App() {
  return (
    <div className="App">
      <HouseProfile houseType="Townhouse" pricePerMonth={1200} roomType="Single" moveIn="Anytime" stayPeriod="1-year lease" facilities={["Pets friendly", "Parking", "Indoor washer", "Swimming pool", "Gym room"]} lookingFor={["Female roomates only", "Clean", "Outgoing", "No smoke"]} distance={30} address="8550 Julian Street, 93660" />
    </div>
  );
}

export default App;
