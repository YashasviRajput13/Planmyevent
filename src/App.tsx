import { useState, useEffect } from 'react';
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

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
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