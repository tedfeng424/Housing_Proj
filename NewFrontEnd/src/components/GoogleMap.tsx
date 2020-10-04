import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

const GoogleMap = (props: any) => {
  const [center, setCenter] = useState({ lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(11);
  return (
    <div style={{ height: '25%', minHeight: '40vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDP7ZDv6xGzfVe7y7Sgb3MsYMqCVLNljeY' }} // TODO put key in an .env
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <AnyReactComponent lat={11.0168} lng={76.9558} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
