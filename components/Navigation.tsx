
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onGoTo,
}) => {
  return (
    <div className="fixed bottom-32 md:bottom-44 left-0 right-0 z-40 flex flex-col items-center gap-3 md:gap-4 pointer-events-none">
      <div className="flex gap-4 pointer-events-auto">
        <button
          onClick={onPrev}
          className="p-2 md:p-3 rounded-full bg-white/10 md:bg-white/20 backdrop-blur-md hover:bg-white/40 transition-colors border border-white/30 text-white shadow-xl"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} className="md:w-6 md:h-6" />
        </button>
        <button
          onClick={onNext}
          className="p-2 md:p-3 rounded-full bg-white/10 md:bg-white/20 backdrop-blur-md hover:bg-white/40 transition-colors border border-white/30 text-white shadow-xl"
          aria-label="Next slide"
        >
          <ChevronRight size={18} className="md:w-6 md:h-6" />
        </button>
      </div>
      
      <div className="flex gap-2 pointer-events-auto">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            className={`h-1 md:h-2 rounded-full transition-all duration-300 ${
              currentSlide === i ? 'bg-white w-4 md:w-8' : 'bg-white/40 w-1 md:w-2 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
