import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const SolarMap = ({ items, center = [19.0760, 72.8777] }) => { 
  return (
    <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-inner border border-emerald-100">
      <MapContainer 
        center={center} 
        zoom={11} 
        scrollWheelZoom={false} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {items.map((item) => (
          item.lat && item.lng && (
            <Marker key={item.id} position={[item.lat, item.lng]}>
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-emerald-600">{item.projectName || item.address}</h3>
                  <p className="text-xs text-gray-600">{item.areaSquareFt || item.targetArea} sq.ft available</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
};

export default SolarMap;