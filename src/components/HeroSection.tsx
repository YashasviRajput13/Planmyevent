import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Button } from './ui/button';

const eventTypes = [
  { id: 'wedding', label: 'Wedding', color: 'text-blue-400' },
  { id: 'festival', label: 'Festival', color: 'text-cyan-400' },
  { id: 'birthday', label: 'Birthday', color: 'text-pink-400' },
  { id: 'corporate', label: 'Corporate Event', color: 'text-blue-400' },
];

const eventBackgrounds = {
  wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552',
  festival: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
  birthday: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d',
  corporate: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
};

export function HeroSection() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % eventTypes.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentEvent = eventTypes[currentEventIndex];
  const backgroundImage = eventBackgrounds[currentEvent.id as keyof typeof eventBackgrounds];

  const handleGetInTouch = () => {
    const vendorSection = document.getElementById('vendors');
    if (vendorSection) {
      vendorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay - Animated Transition */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-105"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
        }}
        key={currentEvent.id}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-3xl space-y-8">
          {/* Main Heading with Animated Event Type */}
          <h1 className="text-5xl md:text-7xl text-white leading-tight">
            Plan Your{' '}
            <span 
              className={`${currentEvent.color} transition-all duration-500`}
              key={currentEvent.id}
            >
              {currentEvent.label}
            </span>
            <br />
            With Us
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
            Are you planning an event and panicking that you may forget something? 
            Do you have a vision but you don't know how to implement it? Look no further. 
            Leave it to us. Visualise your event and we will make it a reality for you!
          </p>

          {/* CTA Button */}
          <div>
            <Button 
              onClick={handleGetInTouch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-6 text-lg rounded-sm transition-all duration-300 hover:scale-105"
            >
              GET IN TOUCH
            </Button>
          </div>

          {/* Google Rating Badge */}
          <div className="inline-block bg-white rounded-lg shadow-lg px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <div>
                  <div className="text-sm text-gray-600">Google Rating</div>
                  <div className="flex items-center gap-1">
                    <span className="text-xl text-amber-500">5.0</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Type Indicators (Optional - dots to show current slide) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {eventTypes.map((event, index) => (
          <button
            key={event.id}
            onClick={() => setCurrentEventIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentEventIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`View ${event.label}`}
          />
        ))}
      </div>
    </section>
  );
}