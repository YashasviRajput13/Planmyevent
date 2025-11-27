import { User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { UserDashboard } from './UserDashboard';
import { VendorDashboard } from './VendorDashboard';

interface HeaderProps {
  userType?: 'customer' | 'vendor';
  onLogout?: () => void;
}

export function Header({ userType = 'customer', onLogout }: HeaderProps) {
  const [showDashboard, setShowDashboard] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-black">PME</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-gray-300 transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('event-hire')}
                className="text-white hover:text-gray-300 transition-colors"
              >
                Event Hire
              </button>
              <button
                onClick={() => scrollToSection('what-we-do')}
                className="text-white hover:text-gray-300 transition-colors"
              >
                What We Do
              </button>
              <button
                onClick={() => scrollToSection('vendors')}
                className="text-white hover:text-gray-300 transition-colors"
              >
                Browse Vendors
              </button>
              <button
                onClick={() => setShowDashboard(true)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                My Account
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      {userType === 'customer' ? (
        <UserDashboard isOpen={showDashboard} onClose={() => setShowDashboard(false)} />
      ) : (
        <VendorDashboard 
          isOpen={showDashboard} 
          onClose={() => setShowDashboard(false)}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}