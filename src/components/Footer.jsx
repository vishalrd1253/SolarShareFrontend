import React from 'react';
import { Sun, Heart } from 'lucide-react';
import logo from "../assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="relative bg-gray-950 border-t border-white/5 overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>

      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-black/30 shrink-0">
              <img src={logo} alt="SolarShare logo" className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight">
              <span className="font-extrabold text-white tracking-tight text-base">SolarShare</span>
              <p className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">Powering Tomorrow</p>
            </div>
            <span className="ml-2 text-gray-700 text-xs border border-white/5 bg-white/5 px-2 py-0.5 rounded-full font-medium">
              © 2026
            </span>
          </div>

          <div className="flex items-center gap-1">
            {['Privacy', 'Terms', 'Contact'].map((link, i, arr) => (
              <React.Fragment key={link}>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-emerald-400 px-3 py-1.5 rounded-lg hover:bg-emerald-500/10 transition-all duration-200 font-medium"
                >
                  {link}
                </a>
                {i < arr.length - 1 && (
                  <span className="text-gray-800 text-xs select-none">·</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/8 px-4 py-2 rounded-full">
            <span className="text-xs text-gray-500 font-medium">Made by</span>
            <span className="text-xs font-bold text-gray-300">Techno Coders</span>
            <Heart size={12} className="text-emerald-500 fill-emerald-500 animate-pulse" />
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[11px] text-gray-700 uppercase tracking-[0.2em] font-semibold">
            Secure &nbsp;·&nbsp; Sustainable &nbsp;·&nbsp; Scalable
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
