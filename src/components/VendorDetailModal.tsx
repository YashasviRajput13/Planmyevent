import { useState } from 'react';
import { X, Star, MapPin, Users, DollarSign, Heart, Share2, Calendar, MessageSquare, CheckCircle, Phone, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Calendar as CalendarComponent } from './ui/calendar';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PaymentModal } from './PaymentModal';

interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  price: string;
  priceRange: string;
  image: string;
  verified: boolean;
  featured: boolean;
  capacity: string;
  description: string;
  specialties: string[];
}

interface VendorDetailModalProps {
  vendor: Vendor;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const SAMPLE_REVIEWS = [
  {
    id: '1',
    name: 'Priya Sharma',
    rating: 5,
    date: 'Oct 2024',
    comment: 'Absolutely amazing service! They made our wedding day perfect. Highly recommend to everyone.',
    event: 'Wedding',
  },
  {
    id: '2',
    name: 'Rahul Mehta',
    rating: 4,
    date: 'Sep 2024',
    comment: 'Great experience overall. Professional team and timely delivery. Would book again.',
    event: 'Corporate Event',
  },
  {
    id: '3',
    name: 'Anjali Patel',
    rating: 5,
    date: 'Aug 2024',
    comment: 'Exceeded all expectations! The attention to detail was remarkable. Worth every penny.',
    event: 'Birthday Party',
  },
];

const SAMPLE_GALLERY = [
  'https://images.unsplash.com/photo-1519167758481-83f29da8fd37',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
  'https://images.unsplash.com/photo-1478146896981-b80fe463b330',
];

export function VendorDetailModal({ vendor, isOpen, onClose, isFavorite, onToggleFavorite }: VendorDetailModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [guestCount, setGuestCount] = useState('');
  const [message, setMessage] = useState('');

  const handleBooking = () => {
    if (!selectedDate || !guestCount) {
      toast.error('Please select date and guest count');
      return;
    }
    toast.success('Booking request sent! Vendor will contact you soon.');
    onClose();
  };

  const handleQuoteRequest = () => {
    toast.success('Quote request sent! You will receive a response within 24 hours.');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header Image */}
        <div className="relative h-64 w-full">
          <ImageWithFallback
            src={vendor.image}
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white"
          >
            <X className="w-5 h-5" />
          </Button>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl mb-2">{vendor.name}</h2>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{vendor.location}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleFavorite}
                className="bg-white/90 hover:bg-white"
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}`}
                />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Quick Info */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-amber-400 mx-auto mb-1" />
                <p className="text-2xl">{vendor.rating}</p>
                <p className="text-xs text-gray-500">Rating</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MessageSquare className="w-6 h-6 text-teal-600 mx-auto mb-1" />
                <p className="text-2xl">{vendor.reviews}</p>
                <p className="text-xs text-gray-500">Reviews</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
                <p className="text-sm">{vendor.capacity}</p>
                <p className="text-xs text-gray-500">Capacity</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                <p className="text-sm">{vendor.priceRange}</p>
                <p className="text-xs text-gray-500">Price Range</p>
              </CardContent>
            </Card>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {vendor.verified && (
              <Badge className="bg-teal-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
            {vendor.featured && (
              <Badge className="bg-gradient-to-r from-amber-500 to-rose-500">
                Featured Vendor
              </Badge>
            )}
            {vendor.specialties.map((specialty, idx) => (
              <Badge key={idx} variant="outline">
                {specialty}
              </Badge>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="booking">Book Now</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div>
                <h3 className="text-xl mb-2">About</h3>
                <p className="text-gray-600">{vendor.description}</p>
              </div>

              <div>
                <h3 className="text-xl mb-2">Specialties</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {vendor.specialties.map((specialty, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-600" />
                      <span>{specialty}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{vendor.name.toLowerCase().replace(/\s+/g, '')}@example.com</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gallery">
              <div className="grid grid-cols-2 gap-4">
                {SAMPLE_GALLERY.map((image, idx) => (
                  <div key={idx} className="aspect-video rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={image}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              {SAMPLE_REVIEWS.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.event} • {review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="booking" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="mb-3">Select Event Date</h3>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Number of Guests</label>
                    <Input
                      type="number"
                      placeholder="Enter guest count"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Additional Requirements</label>
                    <Textarea
                      placeholder="Tell us about your event..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm mb-2">Estimated Price</p>
                    <p className="text-3xl text-amber-600">{vendor.price}</p>
                    <p className="text-xs text-gray-500 mt-1">Final price may vary based on requirements</p>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600"
                      onClick={handleBooking}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Request Booking
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleQuoteRequest}
                    >
                      Get Custom Quote
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}