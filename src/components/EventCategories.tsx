import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventCategory {
  title: string;
  image: string;
  vendors: VendorType[];
}

interface VendorType {
  name: string;
  image: string;
}

const EVENT_CATEGORIES: EventCategory[] = [
  {
    title: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
    vendors: [
      { name: 'Wedding Photographers', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92' },
      { name: 'Wedding Videographers', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4' },
      { name: 'Wedding DJs', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3' },
      { name: 'Wedding Bands & Musicians', image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c' },
      { name: 'Bridal Makeup Artists', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2' },
      { name: 'Wedding Decorators', image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330' },
      { name: 'Wedding Caterers', image: 'https://images.unsplash.com/photo-1555244162-803834f70033' },
      { name: 'Wedding Planners', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3' },
      { name: 'Mehendi Artists', image: 'https://images.unsplash.com/photo-1610312164945-cb58d0dbc1e6' },
      { name: 'Wedding Venues', image: 'https://images.unsplash.com/photo-1519167758481-83f29da8a4d0' },
      { name: 'Florists', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946' },
      { name: 'Wedding Choreographers', image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e' },
    ],
  },
  {
    title: 'Novelty Extras',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d',
    vendors: [
      { name: 'Magicians', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
      { name: 'Face Painters', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176' },
      { name: 'Balloon Artists', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d' },
      { name: 'Photo Booth Rentals', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865' },
      { name: 'Caricature Artists', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b' },
      { name: 'Clowns & Entertainers', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7' },
    ],
  },
  {
    title: 'Christmas Parties',
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be',
    vendors: [
      { name: 'Christmas DJs', image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be' },
      { name: 'Santa Claus Services', image: 'https://images.unsplash.com/photo-1512474932049-78ac69ede12c' },
      { name: 'Christmas Decorators', image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543' },
      { name: 'Holiday Caterers', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288' },
      { name: 'Christmas Photographers', image: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5' },
      { name: 'Carol Singers', image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be' },
    ],
  },
  {
    title: 'Bespoke Business Functions',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    vendors: [
      { name: 'Corporate Photographers', image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786' },
      { name: 'AV & Tech Support', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87' },
      { name: 'Corporate Caterers', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0' },
      { name: 'Event Coordinators', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2' },
      { name: 'Business Venues', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c' },
      { name: 'Live Musicians', image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f' },
    ],
  },
  {
    title: 'Awards Ceremonies',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3',
    vendors: [
      { name: 'Event Photographers', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4' },
      { name: 'Red Carpet Setup', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3' },
      { name: 'Stage & Lighting', image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec' },
      { name: 'Award Show Hosts', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2' },
      { name: 'Videographers', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4' },
      { name: 'Gala Caterers', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed' },
    ],
  },
  {
    title: 'Festivals',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    vendors: [
      { name: 'Festival DJs', image: 'https://images.unsplash.com/photo-1571266028243-d220c6b2c720' },
      { name: 'Live Bands', image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b' },
      { name: 'Food Trucks & Stalls', image: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb' },
      { name: 'Stage Setup & Sound', image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec' },
      { name: 'Festival Photographers', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3' },
      { name: 'Security Services', image: 'https://images.unsplash.com/photo-1549213783-8284d0336c4f' },
      { name: 'Lighting & Effects', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3' },
      { name: 'Event Coordinators', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2' },
    ],
  },
  {
    title: 'Conferences',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678',
    vendors: [
      { name: 'Conference Photographers', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678' },
      { name: 'AV Equipment Rental', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87' },
      { name: 'Conference Venues', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c' },
      { name: 'Keynote Speakers', image: 'https://images.unsplash.com/photo-1560439514-4e9645039924' },
      { name: 'Registration Services', image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40' },
      { name: 'Corporate Caterers', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0' },
    ],
  },
  {
    title: 'Fashion Shows',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1c73',
    vendors: [
      { name: 'Runway Photographers', image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1c73' },
      { name: 'Fashion Videographers', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4' },
      { name: 'Makeup Artists', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9' },
      { name: 'Hair Stylists', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df' },
      { name: 'Runway Setup', image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1c73' },
      { name: 'Fashion Show DJs', image: 'https://images.unsplash.com/photo-1571266028243-d220c6b2c720' },
    ],
  },
  {
    title: 'Product & Company Launches',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
    vendors: [
      { name: 'Event Photographers', image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786' },
      { name: 'Product Videographers', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4' },
      { name: 'Brand Activation', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30' },
      { name: 'PR & Media Services', image: 'https://images.unsplash.com/photo-1523908511403-7fc7b25592f4' },
      { name: 'Launch Event Venues', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c' },
      { name: 'Corporate Caterers', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0' },
    ],
  },
];

export function EventCategories() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null);

  return (
    <section className="bg-black">
      {/* Main Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {EVENT_CATEGORIES.map((category, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(category)}
            className="relative h-64 md:h-80 overflow-hidden group cursor-pointer"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className={`absolute inset-0 transition-all duration-300 ${
                selectedCategory?.title === category.title 
                  ? 'bg-amber-500/60' 
                  : 'bg-black/40 group-hover:bg-black/50'
              }`} />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center p-6">
              <h3 className="text-white text-2xl md:text-3xl text-center transition-transform duration-300 group-hover:scale-105">
                {category.title}
              </h3>
            </div>

            {/* Hover Border Effect */}
            <div className={`absolute inset-0 border-4 transition-all duration-300 pointer-events-none ${
              selectedCategory?.title === category.title
                ? 'border-amber-500'
                : 'border-transparent group-hover:border-amber-500/50'
            }`} />
          </div>
        ))}
      </div>

      {/* Vendor Types Grid - Shows when category is selected */}
      {selectedCategory && (
        <div className="bg-gradient-to-b from-black to-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="text-white text-3xl md:text-4xl mb-2">
                {selectedCategory.title} Vendors
              </h2>
              <p className="text-gray-400">
                Select the perfect vendor for your {selectedCategory.title.toLowerCase()}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {selectedCategory.vendors.map((vendor, index) => (
                <div
                  key={index}
                  className="relative h-48 overflow-hidden rounded-lg group cursor-pointer"
                >
                  <ImageWithFallback
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/20 transition-all duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white text-center transition-transform duration-300 group-hover:scale-105">
                      {vendor.name}
                    </h4>
                  </div>

                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/70 rounded-lg transition-all duration-300" />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors duration-300"
              >
                View All Categories
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}