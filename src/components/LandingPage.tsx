import { useState, useEffect } from 'react';
import { User, Store, ArrowRight, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onSelectUserType: (userType: 'customer' | 'vendor') => void;
}

export function LandingPage({ onSelectUserType }: LandingPageProps) {
  const [currentBg, setCurrentBg] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

  const backgrounds = [
    'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #14b8a6 100%)',
    'linear-gradient(135deg, #fb923c 0%, #f43f5e 50%, #06b6d4 100%)',
    'linear-gradient(135deg, #fbbf24 0%, #db2777 50%, #0891b2 100%)',
    'linear-gradient(135deg, #fcd34d 0%, #be185d 50%, #0e7490 100%)',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {backgrounds.map((bg, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-2000"
            style={{
              background: bg,
              opacity: currentBg === index ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Particle Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo/Brand Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-12 h-12 text-white animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl text-white mb-4 tracking-tight">
            Plan My Event
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Your one-stop platform for seamless event planning
          </p>
          <p className="text-lg text-white/80 mt-2">
            Bringing joy, trust, and celebration to every moment
          </p>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl animate-slide-up">
          {/* Customer Login Card */}
          <div
            onClick={() => onSelectUserType('customer')}
            className="group relative bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-10 cursor-pointer transition-all duration-500 hover:scale-105 hover:bg-white hover:shadow-2xl"
          >
            {/* Decorative Element */}
            <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-amber-400 to-rose-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-rose-500 rounded-2xl mb-6 mx-auto group-hover:rotate-6 transition-transform duration-500">
                <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              
              <h2 className="text-2xl md:text-3xl text-center mb-4 text-gray-800">
                I'm Planning an Event
              </h2>
              
              <p className="text-center text-gray-600 mb-6 leading-relaxed">
                Find vendors, manage your event, get instant quotes, and bring your celebration to life
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-700">
                  <span className="text-amber-500 mr-2">✦</span>
                  <span>Browse verified vendors</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-rose-500 mr-2">✦</span>
                  <span>Get instant quotes & compare</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-teal-500 mr-2">✦</span>
                  <span>Manage timeline & guest list</span>
                </li>
              </ul>
              
              <div className="flex items-center justify-center text-amber-600 group-hover:text-rose-600 transition-colors">
                <span className="mr-2">Continue as Customer</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>

          {/* Vendor Login Card */}
          <div
            onClick={() => onSelectUserType('vendor')}
            className="group relative bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-10 cursor-pointer transition-all duration-500 hover:scale-105 hover:bg-white hover:shadow-2xl"
          >
            {/* Decorative Element */}
            <div className="absolute -top-3 -left-3 w-20 h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl mb-6 mx-auto group-hover:rotate-6 transition-transform duration-500">
                <Store className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              
              <h2 className="text-2xl md:text-3xl text-center mb-4 text-gray-800">
                I'm a Vendor
              </h2>
              
              <p className="text-center text-gray-600 mb-6 leading-relaxed">
                Join our trusted network, showcase your services, and connect with clients planning their special moments
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-700">
                  <span className="text-teal-500 mr-2">✦</span>
                  <span>Create your business profile</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-blue-500 mr-2">✦</span>
                  <span>Receive instant quote requests</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-purple-500 mr-2">✦</span>
                  <span>Manage bookings & payments</span>
                </li>
              </ul>
              
              <div className="flex items-center justify-center text-teal-600 group-hover:text-blue-600 transition-colors">
                <span className="mr-2">Join Vendor Network</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 text-center animate-fade-in-delayed">
          <p className="text-white/90 text-sm md:text-base">
            Trusted by thousands across India for Weddings, Birthdays, Corporate Events & Festivals
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(5px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s backwards;
        }

        .animate-fade-in-delayed {
          animation: fade-in 1s ease-out 0.6s backwards;
        }
      `}</style>
    </div>
  );
}
