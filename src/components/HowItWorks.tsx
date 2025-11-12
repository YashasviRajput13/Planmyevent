import { Search, Users, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const STEPS = [
  {
    icon: Search,
    title: 'Search & Compare',
    description: 'Browse verified vendors, compare quotes, and read genuine reviews from real customers.',
    color: 'from-teal-500 to-indigo-500',
  },
  {
    icon: Users,
    title: 'Connect & Discuss',
    description: 'Chat directly with vendors, share your requirements, and get personalized quotes instantly.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Calendar,
    title: 'Book & Plan',
    description: 'Confirm bookings, manage timelines, track budgets, and organize every detail in one place.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: CheckCircle,
    title: 'Celebrate',
    description: 'Relax and enjoy your perfectly planned event while we handle all the coordination.',
    color: 'from-emerald-500 to-teal-500',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to your dream event
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="relative border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 mt-2`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-4">
            Ready to start planning your event?
          </p>
          <a
            href="#vendors"
            className="inline-block bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-8 py-3 rounded-lg transition-all"
          >
            Browse Vendors Now
          </a>
        </div>
      </div>
    </section>
  );
}
