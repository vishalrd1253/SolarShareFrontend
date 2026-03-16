import React, { useState, useEffect } from 'react';
import { Plus, Users, MapPin, Target, Send, X, Zap, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
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

const MapEvents = ({ contribution, setContribution }) => {
  const map = useMap();

  useMapEvents({
    click(e) {
      setContribution(prev => ({ ...prev, lat: e.latlng.lat, lng: e.latlng.lng }));
    },
  });

  return contribution.lat ? <Marker position={[contribution.lat, contribution.lng]} /> : null;
};

const SearchField = ({ setContribution }) => {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      showMarker: false,
      autoClose: true,
      keepResult: true,
    });
    map.addControl(searchControl);
    map.on('geosearch/showlocation', (result) => {
      setContribution(prev => ({
        ...prev,
        lat: result.location.y,
        lng: result.location.x,
        address: result.location.label
      }));
    });
    return () => map.removeControl(searchControl);
  }, [map, setContribution]);
  return null;
};

const ClusterMarketplace = () => {
  const { token } = useAuth();
  const [clusters, setClusters] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const { user, isAuthenticated, loading } = useAuth();


  const [newCluster, setNewCluster] = useState({ projectName: '', city: '', targetArea: 5000 });
  const [contribution, setContribution] = useState({ 
    address: '', 
    areaSquareFt: '', 
    expectedRent: '', 
    lat: null, 
    lng: null 
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => { fetchClusters(); }, []);

  const fetchClusters = async () => {
    try {
      const res = await fetch('https://solar-share-backend.onrender.com/api/clusters/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setClusters(data);
    } catch (err) {
      toast.error("Failed to load clusters");
    }
  };

  const handleCreateCluster = async () => {
    const res = await fetch('http://localhost:8081/api/clusters/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(newCluster)
    });
    if (res.ok) {
      toast.success("Cluster started!");
      setShowCreateModal(false);
      fetchClusters();
    }
  };

  const handleJoinCluster = async () => {
    if (!contribution.lat) return toast.error("Please pin your location on the map");
    
    const res = await fetch(`http://localhost:8081/api/clusters/${selectedCluster.id}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(contribution)
    });
    if (res.ok) {
      toast.success("Joined the pool!");
      setShowJoinModal(false);
      setContribution({ address: '', areaSquareFt: '', expectedRent: '', lat: null, lng: null });
      fetchClusters();
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl px-7 py-8 text-white shadow-xl overflow-hidden">
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <p className="text-emerald-100 text-xs font-semibold uppercase tracking-widest mb-1">Marketplace</p>
              <h1 className="text-3xl font-black tracking-tight">SolarPools</h1>
              <p className="text-emerald-100 text-sm mt-1 font-light">Aggregate rooftop space to hit industrial power targets.</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-white text-emerald-600 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-emerald-50 transition-all active:scale-95"
            >
              <Plus size={17} className="inline mr-1" /> Start New Pool
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-emerald-100 shadow-sm rounded-xl px-4 py-2 flex items-center gap-2">
            <Target size={15} className="text-emerald-500" />
            <span className="text-sm font-bold text-gray-700">Active Pools ({clusters.length})</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-emerald-100 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {clusters.map(cluster => (
            <ClusterCard
              key={cluster.id}
              cluster={cluster}
              onJoin={() => { setSelectedCluster(cluster); setShowJoinModal(true); }}
            />
          ))}
        </div>
      </div>

      {showCreateModal && (
        <Modal title="Start New Pool" onClose={() => setShowCreateModal(false)}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700">Project Name</label>
              <input className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm text-gray-800 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all placeholder:text-gray-400" placeholder="Enter project name" onChange={e => setNewCluster({...newCluster, projectName: e.target.value})} />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700">City/Village</label>
              <input className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm text-gray-800 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all placeholder:text-gray-400" placeholder="Enter city name" onChange={e => setNewCluster({...newCluster, city: e.target.value})} />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700">Target Area (sqft)</label>
              <input type="number" className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm text-gray-800 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all placeholder:text-gray-400" placeholder="e.g., 5000" onChange={e => setNewCluster({...newCluster, targetArea: e.target.value})} />
            </div>
            
            <button onClick={handleCreateCluster} className="w-full py-3.5 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-all shadow-md hover:shadow-lg">Launch Cluster</button>
          </div>
        </Modal>
      )}

      {showJoinModal && (
        <Modal title={`Join ${selectedCluster?.projectName}`} onClose={() => setShowJoinModal(false)}>
          <div className="space-y-5 max-h-[80vh] overflow-y-auto pr-2">
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Pin Your Rooftop Location</label>
              <div className="h-56 w-full rounded-xl overflow-hidden border border-gray-200 shadow-md relative z-0">
                <MapContainer center={[19.0760, 72.8777]} zoom={12} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <SearchField setContribution={setContribution} />
                  <MapEvents contribution={contribution} setContribution={setContribution} />
                </MapContainer>
                {!contribution.lat && (
                   <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none z-[1001]">
                      <div className="bg-white px-4 py-2 rounded-lg text-xs font-medium text-emerald-600 shadow-lg border border-emerald-200">
                        Click map to set location
                      </div>
                   </div>
                )}
              </div>
            </div>

            <div className="space-y-2 px-1">
              <label className="text-xs font-semibold text-gray-700">Full Address</label>
              <input 
                value={contribution.address}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm text-gray-800 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all placeholder:text-gray-400" 
                placeholder="Enter your complete address" 
                onChange={e => setContribution({...contribution, address: e.target.value})} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 px-1">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700">Area (Sq. Ft)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all placeholder:text-gray-400" 
                  placeholder="e.g., 1000" 
                  onChange={e => setContribution({...contribution, areaSquareFt: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700">Expected Rent</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm text-gray-800 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all placeholder:text-gray-400" 
                  placeholder="₹ /month" 
                  onChange={e => setContribution({...contribution, expectedRent: e.target.value})} 
                />
              </div>
            </div>

            <button 
              onClick={handleJoinCluster} 
              className={`w-full py-3.5 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg ${contribution.lat ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
            >
              {contribution.lat ? 'Submit Contribution →' : 'Select Location on Map'}
            </button>
          </div>
        </Modal>
      )}

      

    </div>
  );
};

const ClusterCard = ({ cluster, onJoin }) => {
  const progress = Math.min((cluster.currentArea / cluster.targetArea) * 100, 100);
  const interestedCount = cluster.interestedCompanies?.length || 0;

  return (
    <div className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className={`h-1.5 w-full ${interestedCount > 0 ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-gray-800">{cluster.projectName}</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={10} /> {cluster.city}</p>
          </div>
          {interestedCount > 0 && (
            <div className="bg-amber-50 text-amber-600 px-2 py-1 rounded-lg text-[10px] font-black animate-pulse flex items-center gap-1">
              <Zap size={10} fill="currentColor" /> {interestedCount} BIDS
            </div>
          )}
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-[10px] font-bold text-gray-400">
            <span>{cluster.currentArea} / {cluster.targetArea} sqft</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 transition-all duration-700" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <button onClick={onJoin} className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${cluster.isFull ? 'bg-gray-50 text-emerald-600 border border-emerald-100' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}>
          {cluster.isFull ? 'View Details' : 'Contribute Space'}
        </button>
      </div>
    </div>
  );
};

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative">
      <div className="h-1.5 w-full bg-emerald-500"></div>
      <div className="p-7">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  </div>
);

export default ClusterMarketplace;
