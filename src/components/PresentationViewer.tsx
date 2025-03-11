
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Slide {
  id?: number;  // Make id optional to support both formats
  title: string;
  content?: string;
  imageUrl?: string;
  type?: string;
  chartData?: {
    labels: string[];
    values: number[];
  };
}

interface PresentationViewerProps {
  isOpen: boolean;
  onClose: () => void;
  slides: Slide[];
  title?: string;
}

const PresentationViewer = ({ isOpen, onClose, slides, title }: PresentationViewerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlide, slides.length, onClose]);

  // Block scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  // Exit fullscreen when closing
  useEffect(() => {
    if (!isOpen && document.fullscreenElement) {
      document.exitFullscreen();
      setFullscreen(false);
    }
  }, [isOpen]);

  // Navigation functions
  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Handle click outside the presentation content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 presentation-overlay flex items-center justify-center overflow-hidden transition-opacity duration-300 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div 
        ref={containerRef}
        className={cn(
          "relative bg-white rounded-xl shadow-2xl max-w-5xl w-full mx-4 h-[90vh] flex flex-col",
          "transition-all duration-300",
          fullscreen ? "rounded-none" : ""
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-xl font-semibold text-finance-blue truncate">
            {title || "Presentation"} - Presentation
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleFullscreen}
              className="text-gray-500 hover:text-finance-blue"
            >
              {fullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-gray-500 hover:text-finance-blue"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Slide content */}
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
            <div 
              className="slide-card w-full h-full max-w-4xl mx-auto flex flex-col overflow-y-auto"
              style={{ aspectRatio: '16/9' }}
            >
              {slides[currentSlide].imageUrl && (
                <div className="w-full h-48 md:h-64 mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={slides[currentSlide].imageUrl} 
                    alt={slides[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h2 className="text-xl md:text-2xl font-bold text-finance-blue mb-3">
                {slides[currentSlide].title}
              </h2>
              <div className="text-gray-700 flex-1 overflow-y-auto">
                {slides[currentSlide].content || ""}
                
                {/* Render chart data if available */}
                {slides[currentSlide].chartData && (
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 italic">Chart visualization would appear here</p>
                    <div className="mt-2">
                      {slides[currentSlide].chartData.labels.map((label, idx) => (
                        <div key={idx} className="flex justify-between text-sm mb-1">
                          <span>{label}:</span>
                          <span>{slides[currentSlide].chartData?.values[idx]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevSlide}
            disabled={currentSlide === 0}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow-md hover:bg-white",
              "transition-opacity duration-200",
              currentSlide === 0 ? "opacity-30 cursor-not-allowed" : "opacity-80 hover:opacity-100"
            )}
          >
            <ChevronLeft className="h-6 w-6 text-finance-blue" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextSlide}
            disabled={currentSlide === slides.length - 1}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow-md hover:bg-white",
              "transition-opacity duration-200",
              currentSlide === slides.length - 1 ? "opacity-30 cursor-not-allowed" : "opacity-80 hover:opacity-100"
            )}
          >
            <ChevronRight className="h-6 w-6 text-finance-blue" />
          </Button>
        </div>
        
        {/* Slide thumbnails/indicators */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Slide {currentSlide + 1} of {slides.length}
            </div>
            
            <div className="flex items-center space-x-1.5">
              {slides.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-200",
                    currentSlide === index 
                      ? "bg-finance-accent scale-125" 
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <div className="text-sm text-gray-500">
              {Math.floor((currentSlide / (slides.length - 1)) * 100)}% complete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationViewer;
