import { Users, TrendingUp, Shield, DollarSign, Calendar, Network } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function UserSegmentation() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
            Why Choose Plan My Event?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you're planning an event or growing your business, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Customer Box */}
          <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl">For Customers</CardTitle>
              <CardDescription className="text-lg">
                Plan your dream event with confidence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="mb-1">Trusted Vendors Only</h4>
                  <p className="text-gray-600">
                    Every vendor is verified and rated by real customers
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="mb-1">Compare & Save</h4>
                  <p className="text-gray-600">
                    Get multiple quotes instantly and choose the best fit
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="mb-1">All-in-One Management</h4>
                  <p className="text-gray-600">
                    Timeline, budget, guest list, and vendor chat in one place
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Box */}
          <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-rose-500 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl">For Vendors</CardTitle>
              <CardDescription className="text-lg">
                Grow your business and reach more clients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Network className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="mb-1">Qualified Leads Daily</h4>
                  <p className="text-gray-600">
                    Connect with customers actively planning events
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="mb-1">Digital Organization</h4>
                  <p className="text-gray-600">
                    Manage bookings, contracts, and payments seamlessly
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="mb-1">Premium Visibility</h4>
                  <p className="text-gray-600">
                    Stand out with featured listings and verified badges
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
