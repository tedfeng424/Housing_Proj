import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { miscIcons } from '../assets/icons/all';

// todo: figure out how to make marker POINT be on top of location
// todo: remove text from parameters without breaking the component
const AnyReactComponent = ({ text }: any) => {
  return <miscIcons.mapMarker className="d-block" />;
};

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
  }, [center, location]);
  return (
    <div style={{ height: '25%', minHeight: '40vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDP7ZDv6xGzfVe7y7Sgb3MsYMqCVLNljeY' }} // TODO put key in an .env
        center={center}
        defaultZoom={zoom}
      >
        <AnyReactComponent lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
