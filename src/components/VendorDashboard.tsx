import { useState } from 'react';
import { X, Package, BarChart3, DollarSign, Settings, Bell, LogOut, TrendingUp, Users, Calendar, CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react';

interface VendorDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function VendorDashboard({ isOpen, onClose, onLogout }: VendorDashboardProps) {
  const [activeTab, setActiveTab] = useState<'requests' | 'overview' | 'pricing' | 'services' | 'payment'>('overview');

  if (!isOpen) return null;

  const handleLogout = () => {
    onClose();
    onLogout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 w-full max-w-6xl bg-white shadow-2xl flex">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-teal-600 to-blue-700 p-6 flex flex-col">
          <div className="mb-8">
            <h2 className="text-white text-2xl mb-2">Vendor Portal</h2>
            <p className="text-teal-100 text-sm">Manage your business</p>
          </div>

          <nav className="flex-1 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'overview'
                  ? 'bg-white text-teal-700'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('requests')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'requests'
                  ? 'bg-white text-teal-700'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span>Requests</span>
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'pricing'
                  ? 'bg-white text-teal-700'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Pricing Analysis</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'services'
                  ? 'bg-white text-teal-700'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Services</span>
            </button>

            <button
              onClick={() => setActiveTab('payment')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === 'payment'
                  ? 'bg-white text-teal-700'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Payment</span>
            </button>
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-all mt-auto"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b px-8 py-6 flex items-center justify-between">
            <h1 className="text-2xl text-gray-900">
              {activeTab === 'overview' && 'Business Overview'}
              {activeTab === 'requests' && 'Quote Requests'}
              {activeTab === 'pricing' && 'Pricing Analysis'}
              {activeTab === 'services' && 'My Services'}
              {activeTab === 'payment' && 'Payment Management'}
            </h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-8 bg-gray-50">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-600 text-sm">Total Revenue</h3>
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl text-gray-900">₹2,45,000</p>
                    <p className="text-green-600 text-sm mt-1">+12% this month</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-600 text-sm">Active Bookings</h3>
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-3xl text-gray-900">8</p>
                    <p className="text-blue-600 text-sm mt-1">3 this week</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-600 text-sm">Pending Requests</h3>
                      <Bell className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-3xl text-gray-900">3</p>
                    <p className="text-orange-600 text-sm mt-1">Requires attention</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-600 text-sm">Client Rating</h3>
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-3xl text-gray-900">4.8</p>
                    <p className="text-purple-600 text-sm mt-1">From 45 reviews</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { text: 'New booking request from Priya & Raj Wedding', time: '2 hours ago', type: 'new' },
                      { text: 'Payment received for Corporate Event - TechCorp', time: '5 hours ago', type: 'payment' },
                      { text: 'Quote sent to Birthday Party - Aarav', time: '1 day ago', type: 'quote' },
                      { text: 'Review received (5 stars) from Meera Wedding', time: '2 days ago', type: 'review' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                        <div className={`w-2 h-2 mt-2 rounded-full ${
                          activity.type === 'new' ? 'bg-blue-500' :
                          activity.type === 'payment' ? 'bg-green-500' :
                          activity.type === 'quote' ? 'bg-orange-500' :
                          'bg-purple-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-gray-900">{activity.text}</p>
                          <p className="text-gray-500 text-sm">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Requests Tab */}
            {activeTab === 'requests' && (
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    client: 'Priya & Raj',
                    event: 'Wedding',
                    date: 'Dec 15, 2024',
                    budget: '₹50,000 - ₹75,000',
                    status: 'new',
                    details: 'Need photography and videography for 2-day wedding ceremony'
                  },
                  {
                    id: 2,
                    client: 'Aarav Kumar',
                    event: 'Birthday Party',
                    date: 'Dec 5, 2024',
                    budget: '₹15,000 - ₹20,000',
                    status: 'new',
                    details: '18th birthday party, need DJ and decoration'
                  },
                  {
                    id: 3,
                    client: 'TechCorp India',
                    event: 'Corporate Event',
                    date: 'Jan 20, 2025',
                    budget: '₹1,00,000+',
                    status: 'pending',
                    details: 'Annual day celebration for 500 employees'
                  },
                ].map((request) => (
                  <div key={request.id} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl text-gray-900">{request.client}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            request.status === 'new' 
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {request.status === 'new' ? 'New Request' : 'Quote Sent'}
                          </span>
                        </div>
                        <p className="text-gray-600">{request.event} • {request.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600 text-sm">Budget Range</p>
                        <p className="text-lg text-teal-600">{request.budget}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{request.details}</p>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                        Send Quote
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pricing Analysis Tab */}
            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg mb-4">Your Pricing vs Market Average</h3>
                  <div className="space-y-4">
                    {[
                      { service: 'Wedding Photography', yourPrice: '₹45,000', marketAvg: '₹42,000', status: 'above' },
                      { service: 'Birthday Decoration', yourPrice: '₹12,000', marketAvg: '₹15,000', status: 'below' },
                      { service: 'Corporate Catering', yourPrice: '₹800/plate', marketAvg: '₹850/plate', status: 'below' },
                      { service: 'DJ Services', yourPrice: '₹18,000', marketAvg: '₹16,000', status: 'above' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="text-gray-900">{item.service}</h4>
                          <p className="text-sm text-gray-600">Your Price: {item.yourPrice}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Market Avg: {item.marketAvg}</p>
                          <p className={`text-sm ${
                            item.status === 'above' ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            {item.status === 'above' ? '↑ Above market' : '↓ Below market'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg mb-4">Revenue Analytics</h3>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-teal-600 mx-auto mb-2" />
                      <p className="text-gray-600">Revenue chart visualization would appear here</p>
                      <p className="text-sm text-gray-500 mt-1">Showing monthly trends and projections</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg">Your Services</h3>
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    Add New Service
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      name: 'Premium Wedding Photography',
                      price: '₹45,000',
                      duration: 'Full Day',
                      status: 'active',
                      bookings: 12
                    },
                    {
                      name: 'Candid Photography',
                      price: '₹35,000',
                      duration: 'Half Day',
                      status: 'active',
                      bookings: 8
                    },
                    {
                      name: 'Pre-Wedding Shoot',
                      price: '₹25,000',
                      duration: '4-6 Hours',
                      status: 'active',
                      bookings: 15
                    },
                    {
                      name: 'Event Videography',
                      price: '₹30,000',
                      duration: 'Full Day',
                      status: 'paused',
                      bookings: 5
                    },
                  ].map((service, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg text-gray-900 mb-1">{service.name}</h4>
                          <p className="text-gray-600 text-sm">{service.duration}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          service.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {service.status === 'active' ? 'Active' : 'Paused'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl text-teal-600">{service.price}</p>
                          <p className="text-sm text-gray-500">{service.bookings} bookings</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                          Edit
                        </button>
                        <button className="flex-1 px-3 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-sm">
                          {service.status === 'active' ? 'Pause' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h3 className="text-gray-600 text-sm">Completed Payments</h3>
                    </div>
                    <p className="text-3xl text-gray-900">₹1,85,000</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <h3 className="text-gray-600 text-sm">Pending Payments</h3>
                    </div>
                    <p className="text-3xl text-gray-900">₹60,000</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <h3 className="text-gray-600 text-sm">Next Payout</h3>
                    </div>
                    <p className="text-3xl text-gray-900">₹45,000</p>
                    <p className="text-sm text-gray-500 mt-1">Dec 1, 2024</p>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg mb-4">Recent Transactions</h3>
                  <div className="space-y-3">
                    {[
                      { client: 'Meera Wedding', amount: '₹45,000', date: 'Nov 25, 2024', status: 'completed' },
                      { client: 'TechCorp Event', amount: '₹75,000', date: 'Nov 23, 2024', status: 'completed' },
                      { client: 'Aarav Birthday', amount: '₹15,000', date: 'Nov 20, 2024', status: 'pending' },
                      { client: 'Priya Pre-Wedding', amount: '₹25,000', date: 'Nov 18, 2024', status: 'completed' },
                      { client: 'Corporate Shoot', amount: '₹20,000', date: 'Nov 15, 2024', status: 'pending' },
                    ].map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.status === 'completed'
                              ? 'bg-green-100'
                              : 'bg-orange-100'
                          }`}>
                            {transaction.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Clock className="w-5 h-5 text-orange-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-gray-900">{transaction.client}</h4>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg text-gray-900">{transaction.amount}</p>
                          <p className={`text-sm ${
                            transaction.status === 'completed'
                              ? 'text-green-600'
                              : 'text-orange-600'
                          }`}>
                            {transaction.status === 'completed' ? 'Paid' : 'Pending'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bank Details */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg mb-4">Bank Account Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Account Holder</p>
                      <p className="text-gray-900">Your Business Name</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Account Number</p>
                      <p className="text-gray-900">XXXX XXXX 1234</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">IFSC Code</p>
                      <p className="text-gray-900">HDFC0001234</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Bank Name</p>
                      <p className="text-gray-900">HDFC Bank</p>
                    </div>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    Update Bank Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
