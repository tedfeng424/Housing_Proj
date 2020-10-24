import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

interface PathProps {
  address: string;
}
const GoogleMap: React.FC<PathProps> = ({ address }) => {
  const [center, setCenter] = useState({ lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(11);
  const code = geocodeByAddress(address);
  const location = code.then((results) => getLatLng(results[0]));
  useEffect(() => {
    location.then((longlat) => {
      setCenter(longlat);
      console.log(center);
    });
  }, [center]);
  return (
    <div style={{ height: '25%', minHeight: '40vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDP7ZDv6xGzfVe7y7Sgb3MsYMqCVLNljeY' }} // TODO put key in an .env
        center={center}
        defaultZoom={zoom}
      >
        <AnyReactComponent
          lat={center.lat}
          lng={center.lng}
          text="I am Here!"
        />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
