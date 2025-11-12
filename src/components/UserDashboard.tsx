import { useState } from 'react';
import { X, Calendar, Heart, User, CreditCard, Settings, LogOut, CheckCircle, Clock, XCircle, MapPin, Phone, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';

interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Booking {
  id: string;
  vendorName: string;
  eventType: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: string;
  location: string;
}

interface FavoriteVendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  price: string;
  image: string;
}

const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: '1',
    vendorName: 'Grand Palace Banquet',
    eventType: 'Wedding Venue',
    date: 'Dec 15, 2025',
    status: 'confirmed',
    amount: '₹1,50,000',
    location: 'Mumbai, Andheri',
  },
  {
    id: '2',
    vendorName: 'Flavors Catering Co.',
    eventType: 'Wedding Catering',
    date: 'Dec 15, 2025',
    status: 'confirmed',
    amount: '₹80,000',
    location: 'Mumbai, Bandra',
  },
  {
    id: '3',
    vendorName: 'Lens Magic Photography',
    eventType: 'Wedding Photography',
    date: 'Dec 15, 2025',
    status: 'pending',
    amount: '₹45,000',
    location: 'Mumbai, Powai',
  },
];

const SAMPLE_FAVORITES: FavoriteVendor[] = [
  {
    id: '4',
    name: 'Blooms & Petals Decor',
    category: 'Decoration',
    rating: 4.6,
    price: '₹75,000',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
  },
  {
    id: '5',
    name: 'Beat Box Entertainment',
    category: 'Entertainment',
    rating: 4.5,
    price: '₹35,000',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
  },
];

export function UserDashboard({ isOpen, onClose }: UserDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>(SAMPLE_BOOKINGS);
  const [favorites, setFavorites] = useState<FavoriteVendor[]>(SAMPLE_FAVORITES);
  const [profileData, setProfileData] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
  });

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
      )
    );
    toast.success('Booking cancelled successfully');
  };

  const removeFavorite = (vendorId: string) => {
    setFavorites((prev) => prev.filter((vendor) => vendor.id !== vendorId));
    toast.success('Removed from favorites');
  };

  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl">My Dashboard</DialogTitle>
                <p className="text-gray-500">Manage your events and bookings</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6">
          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                My Bookings
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Favorites
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
            </TabsList>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl">Your Bookings</h3>
                  <Badge variant="outline">{bookings.length} Total</Badge>
                </div>

                {bookings.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No bookings yet</p>
                      <Button
                        className="mt-4 bg-gradient-to-r from-amber-500 to-rose-500"
                        onClick={onClose}
                      >
                        Browse Vendors
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  bookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {getStatusIcon(booking.status)}
                              <h4 className="text-lg">{booking.vendorName}</h4>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{booking.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{booking.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                              <span className="text-sm text-gray-500">{booking.eventType}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl text-amber-600 mb-4">{booking.amount}</p>
                            {booking.status === 'pending' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                Cancel Booking
                              </Button>
                            )}
                            {booking.status === 'confirmed' && (
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-amber-500 to-rose-500"
                              >
                                View Details
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              {/* Summary */}
              {bookings.length > 0 && (
                <Card className="bg-gradient-to-r from-amber-50 to-rose-50">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                        <p className="text-3xl">{bookings.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Confirmed</p>
                        <p className="text-3xl text-green-600">
                          {bookings.filter((b) => b.status === 'confirmed').length}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                        <p className="text-3xl text-amber-600">₹2,75,000</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl">Saved Vendors</h3>
                <Badge variant="outline">{favorites.length} Saved</Badge>
              </div>

              {favorites.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No favorites yet</p>
                    <Button
                      className="mt-4 bg-gradient-to-r from-amber-500 to-rose-500"
                      onClick={onClose}
                    >
                      Explore Vendors
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {favorites.map((vendor) => (
                    <Card key={vendor.id} className="overflow-hidden">
                      <div className="h-40 bg-gray-200 relative">
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-lg mb-1">{vendor.name}</h4>
                            <p className="text-sm text-gray-500">{vendor.category}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFavorite(vendor.id)}
                          >
                            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t">
                          <div>
                            <p className="text-sm text-gray-500">Starting from</p>
                            <p className="text-lg text-amber-600">{vendor.price}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({ ...profileData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({ ...profileData, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({ ...profileData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) =>
                          setProfileData({ ...profileData, city: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-amber-500 to-rose-500">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment Methods
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Preferences
                  </Button>
                  <Separator />
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}