import {
  MapContainer,
  TileLayer,
  LayersControl,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-easybutton/src/easy-button.js';
import 'leaflet-easybutton/src/easy-button.css';
import 'font-awesome/css/font-awesome.min.css';
import L from 'leaflet';

const { BaseLayer, Overlay } = LayersControl;

export const Map = (): JSX.Element => {
  const [position, setPosition] = useState<L.LatLngLiteral>({
    lat: -22.56,
    lng: 17.08,
  });

  function LocateButton() {
    const map = useMap();

    useEffect(() => {
      const locateButton = L.easyButton(
        'fa-crosshairs fa-lg',
        function (btn, map) {
          map.locate();
          map.on('locationfound', function (e) {
            setPosition(e.latlng as L.LatLngLiteral);
            map.flyTo(e.latlng, map.getZoom());
          });
        }
      ).addTo(map);

      // Cleanup
      return () => {
        locateButton.remove();
      };
    });

    return null;
  }

  return (
    <div>
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '600px', width: '100%' }}
      >
        <LayersControl>
          <BaseLayer checked name='Street Map'>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          </BaseLayer>
          <BaseLayer name='Topography Map'>
            <TileLayer url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png' />
          </BaseLayer>
          <BaseLayer name='Satellite Map'>
            <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' />
          </BaseLayer>
          <BaseLayer name='Night Map'>
            <TileLayer url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' />
          </BaseLayer>
          <BaseLayer name='Cycle Map'>
            <TileLayer url='https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png' />
          </BaseLayer>
          <Overlay name='Overlay'>
            <TileLayer url='http://openfiremap.org/hytiles/{z}/{x}/{y}.pn' />
          </Overlay>
        </LayersControl>
        <LocateButton />
      </MapContainer>
    </div>
  );
};
