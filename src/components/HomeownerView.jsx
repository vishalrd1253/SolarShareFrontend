import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MapPin, Maximize, ClipboardList, PlusCircle, Building2, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


const HomeownerView = () => {
  const [myListings, setMyListings] = useState([]);
  const { token } = useAuth();
  const { user, isAuthenticated, loading } = useAuth();

  const navigate = useNavigate();
  if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
  }
  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const response = await fetch('https://solar-share-backend.onrender.com/api/listings/my-listings', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setMyListings(data);
        }
      } catch (error) {
        console.error("Error fetching listings", error);
      }
    };
    fetchMyListings();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-3 sm:px-8 py-6 sm:py-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">

        <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-emerald-200 overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-white opacity-5 rounded-full"></div>
          
          <p className="text-emerald-100 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-1">Homeowner Panel</p>
          <h1 className="text-xl sm:text-3xl font-bold leading-tight">My Rooftop Dashboard</h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 font-light opacity-90">Manage and track your properties</p>

          <button
            onClick={() => navigate('/create-listing')}
            className="mt-5 inline-flex items-center gap-2 bg-white text-emerald-600 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
          >
            <PlusCircle size={16} />
            List New Rooftop
          </button>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <div className="flex items-center gap-2 bg-white border border-emerald-100 shadow-sm rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2">
              <ClipboardList size={14} className="text-emerald-500" />
              <span className="text-xs sm:text-sm font-bold text-gray-700">Active Listings</span>
              <span className="ml-1 bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">
                {myListings.length}
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-100 to-transparent"></div>
          </div>

          {myListings.length === 0 ? (
            <div className="bg-white border border-dashed border-emerald-200 rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-3">
              <ClipboardList size={24} className="text-emerald-300" />
              <p className="text-gray-500 text-sm font-medium">No listings yet</p>
              <button
                onClick={() => navigate('/create-listing')}
                className="mt-2 text-emerald-500 text-xs font-bold underline"
              >
                Add your first listing
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-5">
              {myListings.map((listing) => (
                <div
                  key={listing.id}
                  className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-400"></div>

                  <div className="p-4 sm:p-7">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4 border-b border-gray-50">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                            <MapPin size={14} className="text-emerald-500" />
                          </div>
                          <h4 className="font-bold text-base sm:text-lg text-gray-800 truncate">{listing.city} Rooftop</h4>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 max-w-[180px] sm:max-w-none">
                            <MapPin size={10} /> <span className="truncate">{listing.address}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                            <Maximize size={10} /> {listing.areaSquareFt} sqft
                          </span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-baseline sm:items-end gap-2 sm:gap-0 bg-emerald-50/50 sm:bg-transparent p-2 sm:p-0 rounded-lg">
                        <p className="text-[10px] text-gray-400 font-bold uppercase hidden sm:block">Expected Rent</p>
                        <p className="text-emerald-600 font-black text-lg sm:text-xl">₹{listing.expectedRent}</p>
                        <p className="text-[10px] text-gray-400 font-medium">/ month</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Building2 size={12} className="text-blue-400" />
                        Interested Companies
                        <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[9px] font-black">
                          {listing.interestedCompanies?.length || 0}
                        </span>
                      </p>

                      <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2">
                        {listing.interestedCompanies?.length > 0 ? (
                          listing.interestedCompanies.map((company, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between sm:justify-start gap-3 bg-white border border-gray-100 px-3 py-2 rounded-xl hover:border-blue-200 transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm shadow-blue-100">
                                  {company.fullName?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-gray-700 leading-tight">{company.fullName}</p>
                                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                                    <Phone size={8} /> {company.phoneNumber}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="w-full text-center sm:text-left py-2">
                            <span className="text-[10px] text-gray-400 italic">
                              No interests yet — we'll notify you soon!
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeownerView;
