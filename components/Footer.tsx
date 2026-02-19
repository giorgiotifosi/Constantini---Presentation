import React from 'react';
import { Facebook, Instagram, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#354f60] text-white py-2 md:py-5 px-4 md:px-8 z-30 border-t border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-6">
        <div className="flex flex-col gap-1 w-full md:w-auto text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1 md:gap-3">
             <MapPin size={12} className="text-white/70 flex-shrink-0 md:w-4 md:h-4" />
             <span className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-light">დავით აღმაშენებლის ხეივანი 68, თბილისი, 0108 - მაღაზია 119</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-6">
          <a 
            href="https://www.facebook.com/Constantini.ge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-blue-300 transition-colors group"
          >
            <div className="p-1 md:p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all">
              <Facebook size={12} className="md:w-4 md:h-4" />
            </div>
            <span className="text-[9px] md:text-xs lg:text-sm font-medium">Facebook</span>
          </a>
          <a 
            href="https://www.instagram.com/constantini.ge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-pink-300 transition-colors group"
          >
            <div className="p-1 md:p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all">
              <Instagram size={12} className="md:w-4 md:h-4" />
            </div>
            <span className="text-[9px] md:text-xs lg:text-sm font-medium">Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
};