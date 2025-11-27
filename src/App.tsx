import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { UserLoginDashboard } from './components/UserLoginDashboard';
import { VendorLoginDashboard } from './components/VendorLoginDashboard';
import { VendorMainInterface } from './components/VendorMainInterface';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { EventCategories } from './components/EventCategories';
import { HowItWorks } from './components/HowItWorks';
import { UserSegmentation } from './components/UserSegmentation';
import { VendorBrowse } from './components/VendorBrowse';
import { EventManagement } from './components/EventManagement';
import { Footer } from './components/Footer';
import { AIAssistant } from './components/AIAssistant';
import { Toaster } from './components/ui/sonner';

type UserType = 'customer' | 'vendor' | null;
type AppState = 'landing' | 'login' | 'app';

export default function App() {
  const [userType, setUserType] = useState<UserType>(null);
  const [appState, setAppState] = useState<AppState>('landing');

  const handleSelectUserType = (type: 'customer' | 'vendor') => {
    setUserType(type);
    setAppState('login');
  };

  const handleLoginSuccess = () => {
    setAppState('app');
  };

  const handleBackToLanding = () => {
    setUserType(null);
    setAppState('landing');
  };

  const handleLogout = () => {
    setUserType(null);
    setAppState('login');
  };

  // Landing Page
  if (appState === 'landing') {
    return (
      <>
        <LandingPage onSelectUserType={handleSelectUserType} />
        <Toaster />
      </>
    );
  }

  // Login Dashboard
  if (appState === 'login') {
    if (userType === 'customer') {
      return (
        <>
          <UserLoginDashboard 
            onLoginSuccess={handleLoginSuccess}
            onBack={handleBackToLanding}
          />
          <Toaster />
        </>
      );
    }
    
    if (userType === 'vendor') {
      return (
        <>
          <VendorLoginDashboard 
            onLoginSuccess={handleLoginSuccess}
            onBack={handleBackToLanding}
          />
          <Toaster />
        </>
      );
    }
  }

  // Main Application - Different interfaces for vendor vs customer
  if (appState === 'app') {
    if (userType === 'vendor') {
      return (
        <>
          <VendorMainInterface onLogout={handleLogout} />
          <Toaster />
        </>
      );
    }

    // Customer Interface
    return (
      <div className="min-h-screen bg-white">
        <Header userType="customer" onLogout={handleLogout} />
        <HeroSection />
        <EventCategories />
        <HowItWorks />
        <UserSegmentation />
        <VendorBrowse />
        <EventManagement />
        <Footer />
        <AIAssistant />
        <Toaster />
      </div>
    );
  }

  return null;
}