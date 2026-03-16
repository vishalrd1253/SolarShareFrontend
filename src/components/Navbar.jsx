import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sun, LogOut, User, LayoutDashboard, Menu, X } from "lucide-react";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm z-[1001]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link
              to="/"
              className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={logo}
                  alt="SolarShare Logo"
                  className="h-10 w-10 lg:h-12 lg:w-12 rounded-full ring-2 ring-amber-400 ring-offset-2 transition-all duration-300 group-hover:ring-amber-500 group-hover:ring-offset-4 shadow-lg"
                />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  SolarShare
                </span>
                <p className="text-xs text-gray-500 -mt-1">Powering Tomorrow</p>
              </div>
            </Link>

            {isAuthenticated ? (
              <div className="hidden lg:flex items-center gap-6">
                <Link
                  to="/dashboard"
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 transition-all duration-300 hover:shadow-md hover:scale-105"
                >
                  <LayoutDashboard className="w-4 h-4 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-semibold text-blue-700">Dashboard</span>
                </Link>

                {user?.type === "HOMEOWNER" && (
                  <Link
                    to="/clusters"
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200 transition-all duration-300 hover:shadow-md hover:scale-105"
                  >
                    <Sun className="w-4 h-4 text-purple-600 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="font-semibold text-purple-700">
                      Clusters
                    </span>
                  </Link>
                )}

                <div className="h-10 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 shadow-sm">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white">
                      {(user?.fullName || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800 leading-tight">
                      {user?.fullName || "User"}
                    </span>
                    <span className="text-xs text-gray-500 capitalize leading-tight">
                      {user?.type?.replace("_", " ") || "Member"}
                    </span>
                  </div>
                </div>

                <div className="h-10 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

                <button
                  onClick={handleLogout}
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 border border-red-200 transition-all duration-300 hover:shadow-md hover:scale-105"
                >
                  <LogOut className="w-4 h-4 text-red-600 group-hover:translate-x-1 transition-transform duration-300" />
                  <span className="font-semibold text-red-700">Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-4">
                <Link
                  to="/login"
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-amber-400 transition-all duration-300 hover:shadow-md"
                >
                  <User className="w-4 h-4 text-gray-700 group-hover:text-amber-600 transition-colors" />
                  <span className="font-semibold text-gray-700 group-hover:text-amber-600 transition-colors">
                    Login
                  </span>
                </Link>

                <Link
                  to="/signup"
                  className="group relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {(user?.fullName || "U").charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-gray-800">
                        {user?.fullName || "User"}
                      </span>
                      <span className="text-sm text-gray-500 capitalize">
                        {user?.type?.replace("_", " ") || "Member"}
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 transition-all duration-200"
                  >
                    <LayoutDashboard className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-700">
                      Dashboard
                    </span>
                  </Link>

                  { user?.type === "HOMEOWNER" && (
                    <Link
                      to="/clusters"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200 transition-all duration-200"
                    >
                      <Sun className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-700">
                        Clusters
                      </span>
                    </Link>)
                  }

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 border border-red-200 transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-700">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-amber-400 transition-all duration-200"
                  >
                    <User className="w-5 h-5 text-gray-700" />
                    <span className="font-semibold text-gray-700">Login</span>
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white font-bold shadow-lg"
                  >
                    <span>Get Started</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
