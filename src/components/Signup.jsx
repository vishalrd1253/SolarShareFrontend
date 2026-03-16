import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    city: '',
    userType: 'HOMEOWNER'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://solar-share-backend.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Registration Successful! Welcome to the Solar Share.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const errorData = await response.json();
        toast.error(`Registration Failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error("Connection Error ?");
      console.error("Connection Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-12">
      <div className="w-full max-w-lg">

        <div className="bg-white rounded-3xl shadow-2xl shadow-emerald-100 border border-emerald-100 overflow-hidden">

          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300"></div>

          <div className="px-7 sm:px-10 py-9 relative">

            <div className="absolute -top-10 -right-10 w-36 h-36 bg-emerald-50 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-teal-50 rounded-full blur-3xl pointer-events-none"></div>

            <div className="text-center mb-8 relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-200 mb-4">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                </svg>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-gray-800">
                Solar<span className="text-emerald-500">Share</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1.5 font-medium">Monetize your rooftop</p>
            </div>

            <form onSubmit={handleSubmit} className="relative space-y-5">

              <div className="flex p-1.5 bg-gray-100 rounded-2xl mb-2">
                <button
                  type="button"
                  className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                    formData.userType === 'HOMEOWNER'
                      ? 'bg-white shadow-md shadow-emerald-100 text-emerald-600 scale-[1.02]'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  onClick={() => setFormData({ ...formData, userType: 'HOMEOWNER' })}
                >
                  🏠 User Roof Provider
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                    formData.userType === 'SOLAR_COMPANY'
                      ? 'bg-white shadow-md shadow-emerald-100 text-emerald-600 scale-[1.02]'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  onClick={() => setFormData({ ...formData, userType: 'SOLAR_COMPANY' })}
                >
                  ⚡ Company
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-0.5">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    placeholder="John Doe"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-300 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white hover:border-emerald-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-0.5">
                    City / Village
                  </label>
                  <input
                    name="city"
                    placeholder="Mumbai"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-300 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white hover:border-emerald-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-0.5">
                  Email Address
                </label>
                <input
                  name="username"
                  type="email"
                  placeholder="name@gmail.com"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-300 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white hover:border-emerald-300"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-0.5">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold select-none">📞</span>
                  <input
                    name="phoneNumber"
                    placeholder="+91 9011 xxxxxx"
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-300 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white hover:border-emerald-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-0.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-300 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white hover:border-emerald-300"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-200 hover:from-emerald-600 hover:to-teal-600 hover:shadow-emerald-300 transition-all duration-200 active:scale-[0.98]"
              >
                Create Account →
              </button>

            </form>

            <div className="mt-8 pt-6 border-t border-dashed border-gray-100 text-center space-y-3">
              <p className="text-gray-500 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-emerald-600 font-bold hover:underline underline-offset-2">
                  Sign In
                </Link>
              </p>
              <div className="flex items-center justify-center gap-2">
                {['Secure', 'Sustainable', 'Scalable'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        <p className="text-center text-gray-300 text-xs mt-5 tracking-wide">
          By signing up, you agree to our Terms & Privacy Policy.
        </p>

      </div>
    </div>
  );
};

export default Signup;
