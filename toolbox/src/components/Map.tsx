import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiYW5uZW9sZCIsImEiOiJjbGV3bnNrMHIwZWw5M3pxdzJwNHM3dDdiIn0.R8xh7lwFlJu0-2hK76_qqg'
});

interface Props {
  coordinates: [number, number];
}

const MapComponent: React.FC<Props> = ({ coordinates }) => {

  return (
    <div style={{ height: '350px', width: '100%' }}>
      <Map
        style="mapbox://styles/mapbox/streets-v11"
        center={coordinates}
        zoom={[12]}
        containerStyle={{ height: '350px', width: '100%' }}
      >
      </Map>
    </div>
  );
};

export default MapComponent;

