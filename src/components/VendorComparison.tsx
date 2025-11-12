import { X, Star, MapPin, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
  capacity: string;
  specialties: string[];
}

interface VendorComparisonProps {
  vendors: Vendor[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveVendor: (vendorId: string) => void;
}

const COMPARISON_FEATURES = [
  'Verified Vendor',
  'AC Halls',
  'Parking Available',
  'In-house Catering',
  'Decoration Services',
  'Alcohol Permitted',
  'DJ/Music System',
  'Valet Parking',
  'Power Backup',
  'Changing Rooms',
];

export function VendorComparison({ vendors, isOpen, onClose, onRemoveVendor }: VendorComparisonProps) {
  // Generate random features for comparison (in real app, this would come from vendor data)
  const getFeatureAvailability = (vendorId: string, feature: string) => {
    const hash = (vendorId + feature).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return hash % 3 !== 0; // Randomly returns true/false for demo
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Compare Vendors</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <DialogDescription className="text-gray-500">Side-by-side comparison to help you choose</DialogDescription>
        </DialogHeader>

        <div className="p-6">
          {vendors.length < 2 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500 mb-4">Add at least 2 vendors to compare</p>
                <Button onClick={onClose} className="bg-gradient-to-r from-amber-500 to-rose-500">
                  Browse Vendors
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 text-left bg-gray-50 sticky left-0 z-10 min-w-[200px]">
                      Features
                    </th>
                    {vendors.map((vendor) => (
                      <th key={vendor.id} className="p-4 bg-gray-50 min-w-[280px]">
                        <Card className="overflow-hidden">
                          <div className="relative h-32">
                            <ImageWithFallback
                              src={vendor.image}
                              alt={vendor.name}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onRemoveVendor(vendor.id)}
                              className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="text-lg mb-1">{vendor.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <MapPin className="w-3 h-3" />
                              <span>{vendor.location}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span className="font-semibold">{vendor.rating}</span>
                              <span className="text-sm text-gray-500">({vendor.reviews})</span>
                            </div>
                            {vendor.verified && (
                              <Badge className="bg-teal-600">Verified</Badge>
                            )}
                          </CardContent>
                        </Card>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {/* Price */}
                  <tr className="border-b">
                    <td className="p-4 bg-gray-50 sticky left-0 font-semibold">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-amber-600" />
                        Price
                      </div>
                    </td>
                    {vendors.map((vendor) => (
                      <td key={vendor.id} className="p-4 text-center">
                        <p className="text-2xl text-amber-600 mb-1">{vendor.price}</p>
                        <p className="text-xs text-gray-500">{vendor.priceRange}</p>
                      </td>
                    ))}
                  </tr>

                  {/* Capacity */}
                  <tr className="border-b">
                    <td className="p-4 bg-gray-50 sticky left-0 font-semibold">Capacity</td>
                    {vendors.map((vendor) => (
                      <td key={vendor.id} className="p-4 text-center">
                        {vendor.capacity}
                      </td>
                    ))}
                  </tr>

                  {/* Specialties */}
                  <tr className="border-b">
                    <td className="p-4 bg-gray-50 sticky left-0 font-semibold">Specialties</td>
                    {vendors.map((vendor) => (
                      <td key={vendor.id} className="p-4">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {vendor.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td colSpan={vendors.length + 1} className="p-4 bg-gray-100">
                      <h4 className="font-semibold">Amenities & Services</h4>
                    </td>
                  </tr>

                  {/* Feature Comparison */}
                  {COMPARISON_FEATURES.map((feature, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="p-4 bg-gray-50 sticky left-0">{feature}</td>
                      {vendors.map((vendor) => {
                        const isAvailable = getFeatureAvailability(vendor.id, feature);
                        return (
                          <td key={vendor.id} className="p-4 text-center">
                            {isAvailable ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="w-5 h-5 text-gray-300 mx-auto" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* Action Buttons */}
                  <tr className="border-t-2">
                    <td className="p-4 bg-gray-50 sticky left-0"></td>
                    {vendors.map((vendor) => (
                      <td key={vendor.id} className="p-4">
                        <div className="space-y-2">
                          <Button className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600">
                            Book Now
                          </Button>
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Comparison Summary */}
          {vendors.length >= 2 && (
            <Card className="mt-6 bg-gradient-to-r from-amber-50 to-rose-50">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Quick Comparison Summary</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Lowest Price</p>
                    <p className="text-lg font-semibold text-green-600">
                      {vendors.reduce((min, v) => {
                        const price = parseInt(v.price.replace(/[^0-9]/g, ''));
                        const minPrice = parseInt(min.price.replace(/[^0-9]/g, ''));
                        return price < minPrice ? v : min;
                      }).name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Highest Rated</p>
                    <p className="text-lg font-semibold text-amber-600">
                      {vendors.reduce((max, v) => (v.rating > max.rating ? v : max)).name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Most Reviews</p>
                    <p className="text-lg font-semibold text-indigo-600">
                      {vendors.reduce((max, v) => (v.reviews > max.reviews ? v : max)).name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}