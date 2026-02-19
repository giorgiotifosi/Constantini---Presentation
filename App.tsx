import React, { useState, useEffect, useCallback } from 'react';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';
import { SlideData } from './types';
import { LayoutGrid, PenTool, Award, MessageSquare, Sparkles, X, ChevronLeft, ChevronRight, Globe } from 'lucide-react';

const getDriveUrl = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

const LOGO_ID = '1W1QNSvsbxYUCXYpoM8BWp8cJABRSjUZC';
const SLIDE1_BG_ID = '1xiCM0bUMsuvNCl0Mmi4Fbv4x2Z0kG21G';

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
      getDriveUrl('1EyMC-_EwlKNT30S8J6XjkSgFq-Fmv3aC'),
      getDriveUrl('1KCKeZOnq2wPCPQ-X5HogztFH6ivgz696'),
      getDriveUrl('1I_2X8uZnj9RXk-uCfbWVTC-MavhB-Bbz'),
      getDriveUrl('1AcqjE4wnQP7f1HKKzNjbRSQAPLMIit18'),
      getDriveUrl('17qiGsScK9wHVDF6aVInqPC6bWTF090dY'),
      getDriveUrl('1dhZsZFh_ZMBpf2HQUZVRFUUHzi2kS7Yu'),
      getDriveUrl('1pQS8vRl9OapdyvavxfiMWxdBmbMqrXWB')
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
      {/* Background Layer with Transition */}
      {SLIDES.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'
          }`}
        >
          <div className={`absolute inset-0 z-10 ${index === 0 ? 'bg-black/75' : 'bg-black/85'}`} />
          <img
            src={index === 0 ? s.imageUrls[0] : (s.imageUrls[activeSubImage] || s.imageUrls[0])}
            alt={s.title}
            className={`w-full h-full object-cover transform transition-transform duration-[20000ms] ease-linear ${
              index === currentSlide ? 'scale-105 md:scale-110' : 'scale-100'
            }`}
          />
        </div>
      ))}

      {/* Fixed Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 md:px-8 bg-[#354f60] shadow-xl h-14 md:h-20 flex items-center border-b border-white/10">
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
          <button 
            onClick={() => goToSlide(0)}
            className="focus:outline-none transition-transform active:scale-95 duration-200"
          >
             <img 
              src={getDriveUrl(LOGO_ID)} 
              alt="Constantini Logo" 
              className="h-7 md:h-10 lg:h-12 w-auto object-contain"
            />
          </button>
          <a 
            href="https://constantini.ge" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white/90 hover:text-white transition-all text-[10px] md:text-base font-medium flex items-center gap-2"
          >
            <Globe size={14} className="text-white/70 hidden sm:block" />
            <span className="tracking-wider">constantini.ge</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-20 h-full w-full flex flex-col pt-14 pb-44 md:pt-24 md:pb-56 overflow-y-auto scrollbar-hide">
        <div className="max-w-7xl w-full mx-auto px-5 md:px-12 my-auto">
          <div className={`grid grid-cols-1 ${currentSlide === 0 ? 'lg:grid-cols-1 max-w-3xl mx-auto text-center lg:text-left' : 'lg:grid-cols-12'} gap-8 lg:gap-12 items-center`}>
            
            {/* Content Column */}
            <div 
              className={`transition-all duration-700 ease-out transform ${
                currentSlide === 0 ? 'flex flex-col items-center lg:items-start' : 'lg:col-span-5'
              } ${
                isTransitioning ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'
              }`}
            >
              <div className="inline-block px-3 py-1 mb-4 md:mb-6 rounded-full bg-[#354f60]/60 backdrop-blur-md border border-white/20 text-white text-[9px] md:text-xs font-medium tracking-widest uppercase">
                {slide.subtitle}
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 md:mb-14 leading-tight">
                {slide.title}
              </h2>
              
              <p className="text-[13px] md:text-lg lg:text-xl text-white/80 leading-relaxed font-light mb-8 md:mb-10 max-w-2xl border-l-2 md:border-l-4 border-[#354f60] pl-5 text-left">
                {slide.description}
              </p>

              <div className={`grid grid-cols-2 gap-4 md:gap-6 max-w-lg ${currentSlide === 0 ? 'justify-items-center lg:justify-items-start' : ''}`}>
                 <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                    <Award size={18} className="text-[#354f60]" />
                    <span className="text-[11px] md:text-sm font-medium">15+ წელი ბაზარზე</span>
                 </div>
                 <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                    <LayoutGrid size={18} className="text-[#354f60]" />
                    <span className="text-[11px] md:text-sm font-medium">საკუთარი საწარმო</span>
                 </div>
                 <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                    <PenTool size={18} className="text-[#354f60]" />
                    <span className="text-[11px] md:text-sm font-medium">ინდივიდუალური</span>
                 </div>
                 <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                    <MessageSquare size={18} className="text-[#354f60]" />
                    <span className="text-[11px] md:text-sm font-medium">კონსულტაცია</span>
                 </div>
              </div>
            </div>

            {/* Gallery Column (Slide 2) */}
            {currentSlide !== 0 && (
              <div 
                className={`lg:col-span-7 flex flex-col gap-3 transition-all duration-1000 delay-200 transform ${
                  isTransitioning ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'
                }`}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                  {slide.imageUrls.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveSubImage(idx);
                        setEnlargedImageIndex(idx);
                      }}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-[1.05] shadow-2xl ${
                        activeSubImage === idx ? 'border-white ring-4 ring-[#354f60]/50' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img 
                        src={img} 
                        loading="lazy"
                        className="w-full h-full object-cover" 
                        alt={`Project view ${idx + 1}`} 
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center">
                        <Sparkles className="text-white opacity-0 hover:opacity-100 transition-opacity" size={20} />
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-white/40 text-[10px] md:text-xs italic text-center lg:text-left tracking-widest mt-2 uppercase">
                  დააკლიკეთ ფოტოს გასადიდებლად
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Navigation Controls */}
      <Navigation
        currentSlide={currentSlide}
        totalSlides={SLIDES.length}
        onPrev={prevSlide}
        onNext={nextSlide}
        onGoTo={goToSlide}
      />

      {/* Lightbox for Gallery */}
      {enlargedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-16 animate-in fade-in zoom-in duration-300"
          onClick={() => setEnlargedImageIndex(null)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]" onClick={() => setEnlargedImageIndex(null)}>
            <X size={32} />
          </button>
          
          <button className="absolute left-4 text-white/40 hover:text-white transition-colors z-[110]" onClick={prevEnlarged}>
            <ChevronLeft size={48} />
          </button>
          
          <div className="relative max-w-full max-h-[80vh] flex flex-col items-center">
             <img 
                src={slide.imageUrls[enlargedImageIndex]} 
                className="max-w-full max-h-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg"
                alt="Project detail"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute -bottom-10 text-white/60 text-sm font-light">
                {enlargedImageIndex + 1} / {slide.imageUrls.length}
              </div>
          </div>

          <button className="absolute right-4 text-white/40 hover:text-white transition-colors z-[110]" onClick={nextEnlarged}>
            <ChevronRight size={48} />
          </button>
        </div>
      )}

      <Footer />

      {/* Aesthetic Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/40 z-10" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)] z-10" />
    </div>
  );
};

export default App;