import { DollarSign, Clock, Users, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const features = [
  {
    icon: DollarSign,
    title: 'Instant Quoting',
    description: 'Real-time budget tracking with automatic calculations. Know exactly where your money goes.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Clock,
    title: 'Timeline Manager',
    description: 'Never miss a deadline. Get smart reminders and stay on track with milestone tracking.',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Users,
    title: 'Guest List Sync',
    description: 'Integrated guest and RSVP tracking. Send invites and manage responses effortlessly.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: MessageSquare,
    title: 'Vendor Chat',
    description: 'Direct communication with all booked services. Share files, negotiate, and finalize details.',
    gradient: 'from-amber-500 to-orange-500',
  },
];

export function EventManagement() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-rose-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span className="text-amber-800">Event Management Tools</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">
            Manage Every Detail,{' '}
            <span className="bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
              Effortlessly
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Beyond vendor booking - we provide all the digital tools you need to plan and execute flawlessly.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
              >
                <CardContent className="p-8">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto border-2 border-teal-200 bg-gradient-to-r from-teal-50 via-white to-indigo-50">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-teal-600" />
                <CheckCircle className="w-6 h-6 text-teal-600" />
                <CheckCircle className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-3xl mb-4">
                Everything You Need in One Platform
              </h3>
              <p className="text-xl text-gray-600 mb-6">
                From vendor discovery to event execution, we handle the complexity so you can enjoy the journey.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  <span>24/7 support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
