import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { EventCategories } from './EventCategories';
import { Footer } from './Footer';

interface VendorMainInterfaceProps {
  onLogout: () => void;
}

export function VendorMainInterface({ onLogout }: VendorMainInterfaceProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header userType="vendor" onLogout={onLogout} />
      <HeroSection />
      
      {/* Vendor Stats Section */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Your Business Dashboard</h2>
            <p className="text-gray-600 text-lg">Manage your services, view requests, and grow your business</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-2">📊</div>
              <h3 className="text-2xl text-teal-600 mb-2">₹2.45L</h3>
              <p className="text-gray-600">Total Revenue</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-2">📅</div>
              <h3 className="text-2xl text-blue-600 mb-2">8</h3>
              <p className="text-gray-600">Active Bookings</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-2">🔔</div>
              <h3 className="text-2xl text-orange-600 mb-2">3</h3>
              <p className="text-gray-600">New Requests</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-2">⭐</div>
              <h3 className="text-2xl text-purple-600 mb-2">4.8</h3>
              <p className="text-gray-600">Rating (45 reviews)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl text-center mb-12">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl p-8 text-white cursor-pointer hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl mb-2">View Requests</h3>
              <p className="text-white/90">3 new quote requests waiting</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white cursor-pointer hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl mb-2">Manage Services</h3>
              <p className="text-white/90">Update your service catalog</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white cursor-pointer hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl mb-2">View Payments</h3>
              <p className="text-white/90">₹45,000 next payout</p>
            </div>
          </div>
        </div>
      </section>

      <EventCategories />
      <Footer />
    </div>
  );
}
