import { useState } from 'react';
import { Star, MapPin, Heart, TrendingUp, GitCompare } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { VendorDetailModal } from './VendorDetailModal';
import { VendorComparison } from './VendorComparison';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner@2.0.3';

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

const VENDORS: Vendor[] = [
  {
    id: '1',
    name: 'Grand Palace Banquet',
    category: 'venue',
    rating: 4.8,
    reviews: 256,
    location: 'Mumbai, Andheri',
    price: '₹1,50,000',
    priceRange: '₹1L - ₹3L',
    image: 'https://images.unsplash.com/photo-1519167758481-83f29da8fd37',
    verified: true,
    featured: true,
    capacity: '500-1000 guests',
    description: 'Luxurious banquet hall with modern amenities and stunning decor',
    specialties: ['AC Halls', 'Parking', 'In-house Catering'],
  },
  {
    id: '2',
    name: 'Flavors Catering Co.',
    category: 'catering',
    rating: 4.9,
    reviews: 189,
    location: 'Mumbai, Bandra',
    price: '₹800/plate',
    priceRange: '₹500 - ₹1500/plate',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033',
    verified: true,
    featured: true,
    capacity: 'Any size event',
    description: 'Award-winning caterers specializing in Indian and fusion cuisine',
    specialties: ['Multi-cuisine', 'Live Counters', 'Custom Menus'],
  },
  {
    id: '3',
    name: 'Lens Magic Photography',
    category: 'photography',
    rating: 4.7,
    reviews: 312,
    location: 'Mumbai, Powai',
    price: '₹45,000',
    priceRange: '₹30K - ₹80K',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92',
    verified: true,
    featured: false,
    capacity: 'Full day coverage',
    description: 'Professional wedding and event photography with cinematic videography',
    specialties: ['Candid', 'Drone Shots', 'Pre-wedding'],
  },
  {
    id: '4',
    name: 'Blooms & Petals Decor',
    category: 'decoration',
    rating: 4.6,
    reviews: 178,
    location: 'Mumbai, Juhu',
    price: '₹75,000',
    priceRange: '₹50K - ₹2L',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
    verified: true,
    featured: true,
    capacity: 'All event types',
    description: 'Creative event decoration with floral arrangements and lighting',
    specialties: ['Floral Decor', 'Stage Design', 'Lighting'],
  },
  {
    id: '5',
    name: 'Beat Box Entertainment',
    category: 'entertainment',
    rating: 4.5,
    reviews: 145,
    location: 'Mumbai, Malad',
    price: '₹35,000',
    priceRange: '₹25K - ₹60K',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    verified: true,
    featured: false,
    capacity: 'DJ + Live Band',
    description: 'Professional DJs and live bands for weddings and corporate events',
    specialties: ['DJ Services', 'Live Band', 'Emcee'],
  },
  {
    id: '6',
    name: 'Cake Studio Delights',
    category: 'catering',
    rating: 4.9,
    reviews: 267,
    location: 'Mumbai, Colaba',
    price: '₹2,500/kg',
    priceRange: '₹1500 - ₹5000/kg',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3',
    verified: true,
    featured: false,
    capacity: 'Custom cakes',
    description: 'Premium designer cakes for all occasions',
    specialties: ['Custom Design', 'Multi-tier', 'Themed Cakes'],
  },
];

const CATEGORIES = [
  { value: 'all', label: 'All Vendors', icon: TrendingUp },
  { value: 'venue', label: 'Venues' },
  { value: 'catering', label: 'Catering' },
  { value: 'photography', label: 'Photography' },
  { value: 'decoration', label: 'Decoration' },
  { value: 'entertainment', label: 'Entertainment' },
];

export function VendorBrowse() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [comparisonVendors, setComparisonVendors] = useState<Set<string>>(new Set());
  const [showComparison, setShowComparison] = useState(false);

  const filteredVendors = VENDORS.filter((vendor) => {
    const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory;
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviews - a.reviews;
    return 0;
  });

  const toggleFavorite = (vendorId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(vendorId)) {
        newFavorites.delete(vendorId);
        toast.success('Removed from favorites');
      } else {
        newFavorites.add(vendorId);
        toast.success('Added to favorites');
      }
      return newFavorites;
    });
  };

  const toggleComparison = (vendorId: string, checked: boolean) => {
    if (checked) {
      if (comparisonVendors.size >= 4) {
        toast.error('You can compare up to 4 vendors at a time');
        return;
      }
      setComparisonVendors((prev) => new Set([...prev, vendorId]));
      toast.success('Added to comparison');
    } else {
      setComparisonVendors((prev) => {
        const newSet = new Set(prev);
        newSet.delete(vendorId);
        return newSet;
      });
      toast.success('Removed from comparison');
    }
  };

  const openComparison = () => {
    if (comparisonVendors.size < 2) {
      toast.error('Select at least 2 vendors to compare');
      return;
    }
    setShowComparison(true);
  };

  const comparisonVendorList = VENDORS.filter((v) => comparisonVendors.has(v.id));

  return (
    <section id="vendors" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
            Browse Trusted Vendors
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare, connect, and book verified vendors for your special event
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:col-span-2"
            />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="featured">Featured First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Comparison Bar */}
          {comparisonVendors.size > 0 && (
            <div className="mt-4 p-4 bg-amber-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-amber-600" />
                <span className="font-semibold">{comparisonVendors.size} vendors selected for comparison</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setComparisonVendors(new Set())}
                >
                  Clear All
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-amber-500 to-rose-500"
                  onClick={openComparison}
                >
                  Compare Now
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full h-auto gap-2">
            {CATEGORIES.map((category) => (
              <TabsTrigger key={category.value} value={category.value} className="py-3">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Vendor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <Card
              key={vendor.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              onClick={() => setSelectedVendor(vendor)}
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {vendor.featured && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-rose-500">
                    Featured
                  </Badge>
                )}
                {vendor.verified && (
                  <Badge className="absolute top-12 left-3 bg-teal-600">
                    Verified
                  </Badge>
                )}
                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center gap-2 bg-white/90 rounded-lg px-3 py-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={comparisonVendors.has(vendor.id)}
                      onCheckedChange={(checked) => toggleComparison(vendor.id, checked as boolean)}
                    />
                    <span className="text-xs">Compare</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(vendor.id);
                  }}
                >
                  <Heart
                    className={`w-5 h-5 ${favorites.has(vendor.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}`}
                  />
                </Button>
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl mb-1">{vendor.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{vendor.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{vendor.rating}</span>
                  <span className="text-gray-500 text-sm">({vendor.reviews} reviews)</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {vendor.specialties.slice(0, 2).map((specialty, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-lg text-amber-600">{vendor.price}</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVendor(vendor);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No vendors found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Vendor Detail Modal */}
      {selectedVendor && !showComparison && (
        <VendorDetailModal
          vendor={selectedVendor}
          isOpen={!!selectedVendor}
          onClose={() => setSelectedVendor(null)}
          isFavorite={favorites.has(selectedVendor.id)}
          onToggleFavorite={() => toggleFavorite(selectedVendor.id)}
        />
      )}

      {/* Vendor Comparison Modal */}
      {showComparison && (
        <VendorComparison
          vendors={comparisonVendorList}
          isOpen={showComparison}
          onClose={() => {
            setShowComparison(false);
            setComparisonVendors(new Set());
          }}
          onRemoveVendor={(id) => {
            setComparisonVendors((prev) => {
              const newSet = new Set(prev);
              newSet.delete(id);
              return newSet;
            });
          }}
        />
      )}
    </section>
  );
}
