import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  MapPin,
  IndianRupee,
  Send,
  Layers,
  Zap,
  TrendingUp,
  CheckCircle,
  Users,
  X,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { toast } from "react-hot-toast";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Navigate } from "react-router-dom";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

const SolarCompanyView = () => {
  const [listings, setListings] = useState([]);
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPool, setSelectedPool] = useState(null);
  const { token } = useAuth();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const fetchMarketplace = async () => {
    try {
      const [resListings, resPools] = await Promise.all([
        fetch("https://solar-share-backend.onrender.com/api/listings/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("https://solar-share-backend.onrender.com/api/clusters/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (resListings.ok && resPools.ok) {
        const listData = await resListings.json();
        const poolData = await resPools.json();
        setListings(listData.filter((item) => !item.clusterProject));
        setPools(poolData);
      }
    } catch (error) {
      toast.error("Connection to marketplace failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketplace();
  }, [token]);

  const handleInterest = async (id, type) => {
    const url =
      type === "pool"
        ? `https://solar-share-backend.onrender.com/api/clusters/${id}/interest`
        : `https://solar-share-backend.onrender.com/api/listings/${id}/interest`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success(`Interest sent!`);
        fetchMarketplace();
        setSelectedPool(null);
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="relative bg-emerald-600 rounded-3xl p-10 text-white overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h1 className="text-4xl font-black italic">
              Industrial Marketplace
            </h1>
            <p className="opacity-90 mt-2 font-medium">
              Bidding platform for high-capacity solar clusters.
            </p>
          </div>
          <Zap
            size={180}
            className="absolute -right-10 -top-10 opacity-10 rotate-12"
          />
        </header>

        <section className="space-y-6">
          <SectionHeader
            icon={<Layers size={20} />}
            title="Active Capacity Pools"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pools.map((pool) => (
              <PoolCard
                key={pool.id}
                pool={pool}
                onView={() => setSelectedPool(pool)}
              />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeader
            icon={<TrendingUp size={20} />}
            title="Individual Residential Units"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <IndividualCard
                key={listing.id}
                listing={listing}
                onInterest={() => handleInterest(listing.id, "individual")}
              />
            ))}
          </div>
        </section>
      </div>

      {selectedPool && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-8 border-b flex justify-between items-center bg-emerald-50">
              <div>
                <h2 className="text-3xl font-black text-emerald-900 tracking-tight">
                  {selectedPool.projectName}
                </h2>
                <div className="flex gap-4 mt-1 text-emerald-700 font-bold text-sm uppercase tracking-wider">
                  <span>{selectedPool.city}</span>
                  <span>•</span>
                  <span>Target: {selectedPool.targetArea} sqft</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPool(null)}
                className="p-3 bg-white hover:bg-red-50 hover:text-red-500 rounded-2xl shadow-sm transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <MapPin size={18} className="text-emerald-500" /> Site
                    Locations
                  </h3>
                  <span className="text-[10px] text-gray-400 font-bold">
                    ZOOM ENABLED
                  </span>
                </div>
                <div className="h-[350px] rounded-[2rem] overflow-hidden border-4 border-emerald-50 shadow-inner z-0">
                  <MapContainer
                    key={selectedPool.id}
                    center={[
                      selectedPool.contributions?.find((c) => c.lat)?.lat ||
                        19.076,
                      selectedPool.contributions?.find((c) => c.lng)?.lng ||
                        72.8777,
                    ]}
                    zoom={12}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {selectedPool.contributions?.map(
                      (c, i) =>
                        c.lat &&
                        c.lng && (
                          <Marker key={i} position={[c.lat, c.lng]}>
                            <Popup>
                              <div className="font-sans">
                                <p className="font-bold text-gray-800">
                                  {c.address}
                                </p>
                                <p className="text-emerald-600 font-bold">
                                  {c.areaSquareFt} sqft
                                </p>
                              </div>
                            </Popup>
                          </Marker>
                        ),
                    )}
                  </MapContainer>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Users size={18} className="text-emerald-500" /> Pool Members
                </h3>
                <div className="space-y-3">
                  {selectedPool.contributions?.map((c, i) => (
                    <div
                      key={i}
                      className="group p-4 bg-gray-50 hover:bg-emerald-50 rounded-2xl border border-gray-100 transition-all flex justify-between items-center"
                    >
                      <div className="min-w-0 pr-4">
                        <p className="font-bold text-gray-700 truncate text-sm">
                          {c.address || "Unnamed Site"}
                        </p>
                        <p className="font-bold text-gray-700 truncate text-sm">
                          ₹{c.expectedRent || "Unnamed Site"}
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                          Contributor #{i + 1}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="block text-emerald-600 font-black text-sm">
                          {c.areaSquareFt}
                        </span>
                        <span className="text-[9px] text-gray-400 font-bold">
                          SQ.FT
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 border-t flex flex-col items-center gap-3">
              <button
                onClick={() => handleInterest(selectedPool.id, "pool")}
                disabled={selectedPool.currentArea < selectedPool.targetArea}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95 
                ${
                  selectedPool.currentArea >= selectedPool.targetArea
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                }`}
              >
                <Send size={22} />
                {selectedPool.currentArea >= selectedPool.targetArea
                  ? "Show Interest"
                  : "Capacity Not Reached"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PoolCard = ({ pool, onView }) => {
  const progress = (pool.currentArea / pool.targetArea) * 100;
  return (
    <div
      className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
      onClick={onView}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-black text-gray-800 text-xl tracking-tight group-hover:text-emerald-600 transition-colors">
            {pool.projectName}
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            {pool.city}
          </p>
        </div>
        <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-xl text-[10px] font-black uppercase">
          Aggregate
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-black text-gray-500 uppercase tracking-tighter">
            <span>Capacity</span>
            <span className="text-emerald-600">
              {pool.currentArea.toLocaleString()} /{" "}
              {pool.targetArea.toLocaleString()} SQFT
            </span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
            <div
              className="h-full bg-emerald-500 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
          <Users size={14} /> {pool.contributions?.length || 0} Sites Combined
        </div>

        <button className="w-full py-3.5 bg-emerald-600 text-white rounded-2xl font-bold text-sm group-hover:bg-emerald-600 transition-colors">
          Analyze Cluster
        </button>
      </div>
    </div>
  );
};

const IndividualCard = ({ listing, onInterest }) => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all flex flex-col font-sans">
      <div className="h-40 -mx-4 -mt-4 mb-4 bg-slate-100 border-b relative z-0">
        {listing.lat && listing.lng ? (
          <MapContainer
            center={[listing.lat, listing.lng]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
            scrollWheelZoom={false}
            dragging={false}
            touchZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[listing.lat, listing.lng]} />
          </MapContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-[10px] uppercase tracking-wider">
            No Location Data
          </div>
        )}

        <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur shadow-sm px-2 py-1 rounded-lg border border-emerald-50">
          <p className="text-[8px] font-bold text-gray-400 uppercase leading-none mb-0.5">
            Rent
          </p>
          <p className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
            <IndianRupee size={10} /> {listing.expectedRent || "N/A"}
            <span className="text-[9px] text-gray-400 font-normal">/mo</span>
          </p>
        </div>
      </div>

      <div className="mb-3">
        <h3 className="font-semibold text-gray-800 text-base mb-1">
          {listing.address}
        </h3>
        <p className="text-[10px] text-gray-500 font-medium flex items-center gap-1 uppercase tracking-wide">
          <MapPin size={10} className="text-emerald-500" /> {listing.city}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-auto">
        <div>
          <span className="text-[9px] text-gray-400 block uppercase font-bold tracking-tighter">
            Area
          </span>
          <span className="font-bold text-slate-700 text-sm">
            {listing.areaSquareFt}{" "}
            <small className="text-[9px] text-gray-400 font-normal">SQFT</small>
          </span>
        </div>

        <button
          onClick={onInterest}
          className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95"
        >
          <Send size={12} /> Interest
        </button>
      </div>
    </div>
  );
};

const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-3">
    <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-emerald-50 text-emerald-500">
      {icon}
    </div>
    <h2 className="text-2xl font-black text-gray-800 tracking-tight">
      {title}
    </h2>
    <div className="h-px flex-1 bg-gradient-to-r from-emerald-100 to-transparent"></div>
  </div>
);

const LoadingSpinner = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
    <div className="w-16 h-16 border-[6px] border-emerald-50 border-t-emerald-600 rounded-full animate-spin"></div>
    <p className="text-emerald-600 font-black tracking-widest uppercase text-xs animate-pulse">
      Syncing Marketplace...
    </p>
  </div>
);

export default SolarCompanyView;
