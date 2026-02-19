
import React, { useState, useEffect, useCallback } from 'react';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { SlideData } from './types';
import { LayoutGrid, PenTool, Award, MessageSquare, Sparkles, X, ChevronLeft, ChevronRight, Globe } from 'lucide-react';

const getDriveUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

const LOGO_ID = '1W1QNSvsbxYUCXYpoM8BWp8cJABRSjUZC';
const SLIDE1_BG_ID = '1p6CX1p5eRMorKERvOn9rwlRawna8Zmjm';

const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "კონსტანტინი — 15+ წელი ბაზარზე",
    subtitle: "გამოცდილება და ხარისხი",
    description: "კონსტანტინი უკვე 15 წელზე მეტია აწარმოებს სერიულ და ინდივიდუალურ ავეჯს — თანამედროვე და კლასიკური სამზარეულოებს, განსხვავებულ საძინებლებს და კომფორტულ რბილ ავეჯს. ჩვენ ვმუშავობთ როგორც მცირე, ისე მასშტაბურ პროექტებზე. კომპანიის მფლობელობაშია საკუთარი მაღაზიები და საწარმო.",
    imageUrls: [getDriveUrl(SLIDE1_BG_ID)]
  },
  {
    id: 2,
    title: "ჩვენი პროექტები",
    subtitle: "ინდივიდუალური გადაწყვეტილებები",
    description: "ჩვენი გუნდი ქმნის უნიკალურ გადაწყვეტილებებს: თანამედროვე სამზარეულოები, სიმყუდროვეზე ორიენტირებული საძინებლები და რბილი ავეჯი. პროფესიონალური დაგეგმარება და შესრულება ნებისმიერი სირთულის პროექტში. მომხმარებლის აზრი არის განვითარების მთავარი საფეხური.",
    imageUrls: [
      getDriveUrl('1q57_dQk2oToB6aBisXrk6pEeelYu6sUp'),
      getDriveUrl('1wuavRB88e1I5bfds_hPQTkEGkByVo179'),
      getDriveUrl('1sCNa4tpP73O15S0C7NPHdRrpqnKYf_4n'),
      getDriveUrl('1nu2-jGRfGKhcvWLnj_n-SMf1pkoFRmNn'),
      getDriveUrl('1CZ31gwAJYPDVZihrjrvErS5UTUtd5ocT'),
      getDriveUrl('1KE0gVWfNeMnGtwPygDhl_18bVunUvNr9'),
      getDriveUrl('1ZFLq4IEuCArtvJwsw4aWv0nriOkeRTah')
    ]
  }
];

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeSubImage, setActiveSubImage] = useState(0);
  const [enlargedImageIndex, setEnlargedImageIndex] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    setActiveSubImage(0);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    setActiveSubImage(0);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setActiveSubImage(0);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const nextEnlarged = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (enlargedImageIndex !== null) {
      const nextIdx = (enlargedImageIndex + 1) % SLIDES[currentSlide].imageUrls.length;
      setEnlargedImageIndex(nextIdx);
    }
  };

  const prevEnlarged = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (enlargedImageIndex !== null) {
      const prevIdx = (enlargedImageIndex - 1 + SLIDES[currentSlide].imageUrls.length) % SLIDES[currentSlide].imageUrls.length;
      setEnlargedImageIndex(prevIdx);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (enlargedImageIndex !== null) {
        if (e.key === 'Escape') setEnlargedImageIndex(null);
        if (e.key === 'ArrowRight') nextEnlarged();
        if (e.key === 'ArrowLeft') prevEnlarged();
      } else {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, enlargedImageIndex]);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans selection:bg-[#354f60] selection:text-white">
      {/* Background Layer */}
      {SLIDES.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
          }`}
        >
          {/* Darker Overlays for improved readability */}
          <div className={`absolute inset-0 z-10 ${index === 0 ? 'bg-black/75' : 'bg-black/80'}`} />
          
          <img
            src={index === 0 ? s.imageUrls[0] : (s.imageUrls[activeSubImage] || s.imageUrls[0])}
            alt={s.title}
            className={`w-full h-full object-cover transform transition-transform duration-[20000ms] ease-linear ${
              index === currentSlide ? 'scale-105 md:scale-110' : 'scale-100'
            }`}
          />
        </div>
      ))}

      {/* Header with Brand Background Color */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 md:px-8 bg-[#354f60] shadow-xl py-3 md:py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img 
            src={getDriveUrl(LOGO_ID)} 
            alt="Constantini Logo" 
            className="h-8 md:h-10 lg:h-12 w-auto object-contain transition-transform hover:scale-105 duration-300 drop-shadow-xl"
          />
          <a 
            href="https://constantini.ge" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white/90 hover:text-white transition-all text-sm md:text-base font-medium flex items-center gap-2 group"
          >
            <Globe size={18} className="text-white/70 group-hover:text-white group-hover:scale-110 transition-transform hidden sm:block" />
            <span className="tracking-wider">constantini.ge</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-20 h-full flex flex-col items-center justify-start pt-28 md:pt-36 lg:pt-0 lg:justify-center pb-48 px-6 md:px-12 overflow-y-auto scrollbar-hide">
        <div className="max-w-6xl w-full mx-auto">
          <div className={`grid grid-cols-1 ${currentSlide === 0 ? 'lg:grid-cols-1 max-w-3xl' : 'lg:grid-cols-2'} gap-6 lg:gap-12 items-center mx-auto`}>
            
            {/* Content Column */}
            <div 
              className={`transition-all duration-700 ease-out transform ${
                isTransitioning ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'
              }`}
            >
              <div className="inline-block px-3 py-1 mb-3 md:mb-6 rounded-full bg-[#354f60]/40 backdrop-blur-md border border-white/20 text-white/90 text-[10px] md:text-sm font-medium tracking-wide">
                {slide.subtitle}
              </div>
              
              <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-8 leading-tight">
                {slide.title}
              </h2>
              
              <p className="text-sm md:text-lg lg:text-xl text-white/80 leading-relaxed font-light mb-4 md:mb-10 max-w-xl border-l-4 border-[#354f60] pl-4 md:pl-6">
                {slide.description}
              </p>

              <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-md mb-6 lg:mb-0">
                 <div className="flex items-center gap-2 md:gap-3 text-white/60 hover:text-white transition-colors">
                    <Award size={16} className="text-[#354f60]" />
                    <span className="text-[10px] md:text-sm font-medium tracking-wider">15+ წელი</span>
                 </div>
                 <div className="flex items-center gap-2 md:gap-3 text-white/60 hover:text-white transition-colors">
                    <LayoutGrid size={16} className="text-[#354f60]" />
                    <span className="text-[10px] md:text-sm font-medium tracking-wider">საწარმო</span>
                 </div>
                 <div className="flex items-center gap-2 md:gap-3 text-white/60 hover:text-white transition-colors">
                    <PenTool size={16} className="text-[#354f60]" />
                    <span className="text-[10px] md:text-sm font-medium tracking-wider">ინდივიდუალური</span>
                 </div>
                 <div className="flex items-center gap-2 md:gap-3 text-white/60 hover:text-white transition-colors">
                    <MessageSquare size={16} className="text-[#354f60]" />
                    <span className="text-[10px] md:text-sm font-medium tracking-wider">კონსულტაცია</span>
                 </div>
              </div>
            </div>

            {/* Right Side Content - Adaptive Gallery (Only shown for Project Slide) */}
            {currentSlide !== 0 && (
              <div 
                className={`flex flex-col gap-4 transition-all duration-1000 delay-200 transform ${
                  isTransitioning ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'
                }`}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 md:gap-4 max-h-[35vh] lg:max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20">
                  {slide.imageUrls.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveSubImage(idx);
                        setEnlargedImageIndex(idx);
                      }}
                      className={`relative aspect-video rounded-lg md:rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 shadow-2xl ${
                        activeSubImage === idx ? 'border-white ring-2 md:ring-4 ring-[#354f60]/50' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img 
                        src={img} 
                        loading="lazy"
                        className="w-full h-full object-cover" 
                        alt={`Project view ${idx + 1}`} 
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Sparkles className="text-white opacity-0 hover:opacity-100 drop-shadow-lg scale-75 md:scale-100 transition-opacity" size={24} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Popup / Lightbox */}
      {enlargedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in duration-300"
          onClick={() => setEnlargedImageIndex(null)}
        >
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors z-[110]"
            onClick={() => setEnlargedImageIndex(null)}
          >
            <X size={32} />
          </button>
          
          <button 
            className="absolute left-4 md:left-8 text-white/30 hover:text-white transition-colors z-[110]"
            onClick={prevEnlarged}
          >
            <ChevronLeft size={48} className="md:w-16 md:h-16" />
          </button>
          
          <div 
            className="relative max-w-5xl w-full h-full flex items-center justify-center pointer-events-none"
          >
            <img 
              src={slide.imageUrls[enlargedImageIndex]} 
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm pointer-events-auto"
              alt="Enlarged project"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <button 
            className="absolute right-4 md:right-8 text-white/30 hover:text-white transition-colors z-[110]"
            onClick={nextEnlarged}
          >
            <ChevronRight size={48} className="md:w-16 md:h-16" />
          </button>

          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
            {slide.imageUrls.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all ${i === enlargedImageIndex ? 'bg-white scale-125' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      )}

      <Navigation
        currentSlide={currentSlide}
        totalSlides={SLIDES.length}
        onPrev={prevSlide}
        onNext={nextSlide}
        onGoTo={goToSlide}
      />
      
      <Footer />

      {/* Aesthetic Overlay Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
    </div>
  );
};

export default App;
