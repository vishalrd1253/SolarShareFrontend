import React from 'react';
import logo from "../assets/logo.jpeg";
import img1 from "../assets/img1.jpeg";
import impactImg from "../assets/impact.png";
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-[#f8faf9] via-[#ecfdf5] to-[#d1fae5] text-gray-800 overflow-x-hidden">
      
      <div className="flex justify-center items-center min-h-screen p-5 md:p-10">
        <div className="flex flex-col lg:flex-row w-full max-w-[1100px] min-h-[650px] rounded-[24px] overflow-hidden shadow-2xl bg-white">
          
          <div className="flex-1 p-8 md:p-12 lg:p-[50px_60px] bg-white flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 flex items-center justify-center shadow-sm">
                <img src={logo} alt="Solar Share Logo" className="w-9 h-9 object-contain" />
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">Solar Share</span>
            </div>

            <span className="inline-block text-[11px] font-semibold text-emerald-500 tracking-[2px] mb-4 uppercase">
              Unlock India's Rooftop Potential
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-[1.2] mb-4 tracking-tight">
              Turn Your Roof Into Revenue
            </h1>
            <p className="text-base text-gray-500 leading-relaxed mb-7 max-w-[420px]">
              Connecting Industrial Rooftops with Renewable Energy Companies
            </p>
            
            <ul className="list-none mb-8 space-y-3">
              {[
                "Earn passive monthly income",
                "Zero land acquisition delays",
                "Verified rooftop listings",
                "Clean energy adoption"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <span className="w-[22px] h-[22px] bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center color-white text-[11px] font-bold shadow-md text-white">
                    ✓
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-[14px] bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-200 active:scale-95">
                <Link to="/login" className='text-white'>Login</Link>
              </button>
              <button className="px-8 py-[14px] bg-transparent text-emerald-500 border-2 border-emerald-500 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:bg-emerald-500 hover:text-white hover:-translate-y-0.5">
                <Link to="/signup" className='text-black'>Signup</Link>
              </button>
            </div>
          </div>

          <div className="flex-1 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 relative flex items-center justify-center overflow-hidden p-10 min-h-[300px]">
            <div className="absolute w-[180px] h-[180px] bg-white/10 rounded-full -top-[60px] -right-[60px]"></div>
            <div className="absolute w-[140px] h-[140px] bg-white/5 rounded-full -bottom-[40px] -left-[40px]"></div>
            <div className="absolute w-[60px] h-[60px] bg-white/10 rounded-full top-20 left-8"></div>
            
            <div className="text-center z-10">
              <span className="inline-block text-xs font-semibold text-white/80 tracking-[3px] mb-5 uppercase">
                Sustainable Future
              </span>
              <h2 className="text-2xl md:text-[32px] font-bold text-white leading-tight mb-5 tracking-tight">
                Your Roof. Your Revenue. <br/> India's Solar Future.
              </h2>
              <div className="w-12 h-1 bg-white/40 rounded-full mx-auto mb-5"></div>
              <p className="text-base text-white/90 leading-relaxed max-w-[320px] mx-auto">
                Where Empty Space Meets Clean Energy
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 w-full flex justify-center">
            <div className="w-full max-w-[500px] h-[300px] md:h-[400px] rounded-[20px] overflow-hidden shadow-2xl">
              <img src={img1} alt="Solar Rooftop" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold text-emerald-500 tracking-[2px] mb-4 uppercase block">
              Why SolarShare
            </span>
            <h2 className="text-3xl md:text-[34px] font-bold text-gray-900 leading-tight mb-5 tracking-tight">
              Turn Your Rooftop Into Passive Income
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-6">
              Don't let your rooftop space go to waste. With SolarShare, industrial and commercial 
              building owners can monetize their idle roof space by partnering with solar energy 
              companies. Our platform ensures seamless verification and consistent passive income.
            </p>
            <ul className="space-y-3">
              {[
                "Long-term lease agreements (10-25 years)",
                "Professional installation & maintenance",
                "Real-time monitoring dashboard",
                "Guaranteed monthly payments"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0 shadow-sm">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
          <div className="flex-1 w-full flex justify-center">
            <div className="bg-white border border-gray-200 rounded-[20px] p-8 w-full max-w-[450px] shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "🔒", label: "Secure" },
                  { icon: "🌱", label: "Green Impact" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-semibold text-gray-900 leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold text-emerald-500 tracking-[2px] mb-4 uppercase block">
              For Solar Companies
            </span>
            <h2 className="text-3xl md:text-[34px] font-bold text-gray-900 leading-tight mb-5 tracking-tight">
              Accelerate Your Renewable Energy Projects
            </h2>
            <p className="text-base text-gray-500 leading-relaxed">
              Finding suitable rooftop space for solar installations has never been easier. 
              SolarShare connects solar energy companies directly with verified rooftop owners, 
              eliminating middlemen and reducing delays. Scale faster with our curated database.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 w-full flex justify-center">
            <div className="w-full max-w-[500px] h-[300px] md:h-[400px] rounded-[20px] overflow-hidden shadow-2xl">
              <img src={impactImg} alt="Clean Energy Impact" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold text-emerald-500 tracking-[2px] mb-4 uppercase block">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-[34px] font-bold text-gray-900 leading-tight mb-5 tracking-tight">
              Powering India's Clean Energy Revolution
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              SolarShare is committed to accelerating India's transition to renewable energy. 
              Every rooftop solar installation through our platform contributes to reducing 
              carbon emissions and creating jobs in the green energy sector.
            </p>
            <Link 
                to="/dashboard" 
                className="inline-block px-10 py-4 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-xl text-base font-semibold transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-200 text-center no-underline"
                >
                Join
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;