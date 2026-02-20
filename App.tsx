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
      getDriveUrl('1aVzhceADxZz4eNzE5MaNt8CziGHMiG9v'),
      getDriveUrl('1ALTb0eTkEz4OA7wxgW-gbZCXvM9w8FYg'),
      getDriveUrl('11dCxdcpmrZUnPR9OHlaR4AqWBRFMqWTk'),
      getDriveUrl('1GU-4OaUPGX61BFEaR5Sg0Jhagil56kyy'),
      getDriveUrl('1J-Gh1-H02Za6iXXU45__8naIE8DquPeY'),
      getDriveUrl('1J9yeWSgOT8L_YATYQOjCvVxB8BPNHwYp'),
      getDriveUrl('1oJxbLomsVr0_I9yz57N_ZQ-NSs4mP4wR'),
      getDriveUrl('1mZmlhcEGVAQdI_qWYJ8FjBzHQtz_BC-R'),
      getDriveUrl('1D2v3xkbLmH-y8wStAi0NmMwdNKWYdKK6'),
      getDriveUrl('1JEwsLIKh3XgnP9msJ1_9J8QIRWCeywpE'),
      getDriveUrl('1OZka6IbLcPxlGYa1EoR0NIZ5kZT5WdXW'),
      getDriveUrl('15iNPd5uBXdbRrT10mO5LCcte8dBTx6FW'),
      getDriveUrl('1Z1MlWiluxAOBFCPSzNiREyJ2EE0sjZ1u'),
      getDriveUrl('1Uxz5bjuq779vvliFZDxwWWFhUtuREQh4'),
      getDriveUrl('19kGufTJOYy8CFq9KOtsCSr1FXq8MJNz9'),
      getDriveUrl('169sJYKFT0eV95-hbOEK_pkB0Ia_9v62R'),
      getDriveUrl('1smTztM1bFI0sj8wOP3n98OilW7TtrTs-'),
      getDriveUrl('193KXCluAej4ipQzF8RCqi1WO0RCH2Zms'),
      getDriveUrl('1QJ5j-NDec6dFp3PXuUnjIv37VRy47v2j'),
      getDriveUrl('1o2-itIPxlhgjmMg6qKih2Ixjb9icvstO'),
      getDriveUrl('1Asdk3rSglOQ30MPbWxxOJvlbyWPdIF9s'),
      getDriveUrl('1Lv8KIy9eV7axUL5KQKy-NAuzsRUuMgB4'),
      getDriveUrl('1TgO2i3Z5SW61t7h4uWJ2_dpPqhgbD51j'),
      getDriveUrl('1OY5b7Z769dvWpYEsqz8jxFjmj7m1-lKQ'),
      getDriveUrl('1tsqVAsGE79rfKd6OsOJBew26Ap27_04O'),
      getDriveUrl('1vk9sl6or0D5ZD3l4hvXPUprCS--T4SFV'),
      getDriveUrl('17S3kuzqDVbtRWV3ouvO_DmyPgVRp5EPL'),
      getDriveUrl('1I7gb7oiZVZ-jogvlXkYVFYm6U35aBJRU'),
      getDriveUrl('1qyqNd5H2PbO2CQHEMB7skiR_tmRVpZBv'),
      getDriveUrl('1JKDFAhGbRAr6wvyS1L0i9q1RCIL8JoQp'),
      getDriveUrl('1YgAHMcMWBit6vYQtbPZbN6F00G_qt4w1'),
      getDriveUrl('189NqyYMzdudvvXTtm2aG3TNSbkg2Mjah'),
      getDriveUrl('1pHrAnbfxvRRByKSp340hCtyjqjWX0Krw'),
      getDriveUrl('14zMhqMPDe2OEl6Sv_a76Qcn9h8-pnFSl'),
      getDriveUrl('1KnfzCSyxJPMxgvAsmKKplZcnYzBgxlHF')
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
      <main className={`relative z-20 h-full w-full flex flex-col ${currentSlide === 0 ? 'overflow-hidden' : 'overflow-y-auto lg:overflow-hidden'} scrollbar-hide`}>
        <div className="h-14 md:h-20 w-full shrink-0" />
        <div className="max-w-7xl w-full mx-auto px-5 md:px-12 flex-1 flex flex-col pt-4 md:pt-10 pb-32 md:pb-40 min-h-0">
          <div className={`grid grid-cols-1 ${currentSlide === 0 ? 'lg:grid-cols-1 max-w-3xl mx-auto text-center lg:text-left' : 'lg:grid-cols-12'} gap-4 lg:gap-16 items-start lg:items-center w-full h-full`}>
            
            {/* Content Column */}
            <div 
              className={`transition-all duration-700 ease-out transform ${
                currentSlide === 0 ? 'flex flex-col items-center lg:items-start' : 'lg:col-span-5 mb-4 lg:mb-0'
              } ${
                isTransitioning ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'
              }`}
            >
              <div className="inline-block px-3 py-1 mb-3 md:mb-6 rounded-full bg-[#354f60]/60 backdrop-blur-md border border-white/20 text-white text-[9px] md:text-xs font-medium tracking-widest uppercase">
                {slide.subtitle}
              </div>
              
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-14 leading-tight">
                {slide.title}
              </h2>
              
              <p className="text-[12px] md:text-lg lg:text-xl text-white/80 leading-relaxed font-light mb-6 md:mb-10 max-w-2xl border-l-2 md:border-l-4 border-[#354f60] pl-4 md:pl-5 text-left">
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
                className={`lg:col-span-7 flex flex-col gap-4 transition-all duration-1000 delay-200 transform min-h-0 ${
                  isTransitioning ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'
                }`}
              >
                <div 
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:overflow-y-auto lg:max-h-[55vh] pr-0 lg:pr-4 pb-10 lg:pb-20 custom-scrollbar items-start"
                >
                  {slide.imageUrls.map((img, idx) => (
                    <div key={idx} className="w-full">
                      <button
                        onClick={() => {
                          setActiveSubImage(idx);
                          setEnlargedImageIndex(idx);
                        }}
                        className={`relative w-full aspect-square rounded-xl overflow-hidden border transition-all duration-500 transform hover:scale-[1.03] shadow-lg bg-white/5 group flex items-center justify-center ${
                          activeSubImage === idx ? 'border-white ring-2 ring-white/20' : 'border-white/10 hover:border-white/40'
                        }`}
                      >
                        <img 
                          src={img} 
                          loading="lazy"
                          className="w-full h-full object-contain p-1 transition-transform duration-700 group-hover:scale-105" 
                          alt={`Project view ${idx + 1}`} 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="bg-white/10 backdrop-blur-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                            <Sparkles className="text-white" size={16} />
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
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
          
          <div className="relative w-full h-full flex items-center justify-center">
             <img 
                src={slide.imageUrls[enlargedImageIndex]} 
                className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                alt="Project detail"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-light bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
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