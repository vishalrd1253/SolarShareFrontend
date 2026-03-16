import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { Target } from 'lucide-react'; 
import L from 'leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import { Navigate } from "react-router-dom";

import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const SearchField = ({ setFormData }) => {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      showMarker: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
      searchLabel: 'Search for your location...',
    });
    map.addControl(searchControl);
    map.on('geosearch/showlocation', (result) => {
      setFormData(prev => ({
        ...prev,
        lat: result.location.y,
        lng: result.location.x,
        address: result.location.label
      }));
    });
    return () => map.removeControl(searchControl);
  }, [map, setFormData]);
  return null;
};

const CreateListing = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();

  const [formData, setFormData] = useState({
    address: '',
    areaSquareFt: '',
    city: '',
    expectedRent: '',
    description: '',
    lat: 19.0760, 
    lng: 72.8777
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setFormData(prev => ({ ...prev, lat: e.latlng.lat, lng: e.latlng.lng }));
      },
    });

    return formData.lat ? (
      <>
        <Marker position={[formData.lat, formData.lng]} />
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none w-[90%] sm:w-auto">
          <div className="bg-white/90 backdrop-blur-md border border-emerald-200 px-4 py-2 rounded-2xl shadow-xl flex items-center justify-center gap-3">
            <div className="bg-emerald-500 p-1.5 rounded-lg">
              <Target size={16} className="text-white" />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Latitude</span>
                <span className="text-sm font-mono font-bold text-gray-700">{formData.lat.toFixed(6)}</span>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Longitude</span>
                <span className="text-sm font-mono font-bold text-gray-700">{formData.lng.toFixed(6)}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://solar-share-backend.onrender.com/api/listings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success("Rooftop listed successfully!");
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error("Failed to create listing");
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-0 py-4 sm:px-4 sm:py-12">
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden flex flex-col md:flex-row md:min-h-[650px]">
          
          <div className="w-full h-[350px] md:h-auto md:flex-1 bg-gray-100 relative overflow-hidden order-1 md:order-2">
            <MapContainer 
                center={[19.0760, 72.8777]} 
                zoom={11} 
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false} // Better for mobile scrolling
            >
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              <SearchField setFormData={setFormData} />
              <LocationMarker />
            </MapContainer>
          </div>

          <div className="w-full md:w-[400px] p-8 sm:p-10 border-t md:border-t-0 md:border-r border-gray-100 order-2 md:order-1 bg-white">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Property Info</h2>
                <p className="text-sm text-gray-400">Specify details for solar installers</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Address</label>
                <input required 
                  value={formData.address}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 mt-1 focus:ring-2 focus:ring-emerald-400 outline-none transition-all" 
                  onChange={(e) => setFormData({...formData, address: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">City</label>
                  <input required 
                    value={formData.city}
                    className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 mt-1 outline-none focus:ring-2 focus:ring-emerald-400" 
                    onChange={(e) => setFormData({...formData, city: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Area (sqft)</label>
                  <input type="number" required 
                    value={formData.areaSquareFt}
                    className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 mt-1 outline-none focus:ring-2 focus:ring-emerald-400" 
                    onChange={(e) => setFormData({...formData, areaSquareFt: e.target.value})} 
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Monthly Rent (₹)</label>
                <input type="number" required 
                  value={formData.expectedRent}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 mt-1 outline-none focus:ring-2 focus:ring-emerald-400" 
                  onChange={(e) => setFormData({...formData, expectedRent: e.target.value})} 
                />
              </div>

              <button type="submit" className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg hover:bg-emerald-700 transition-all active:scale-[0.98] mt-6">
                Publish Listing
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateListing;
