import { useEffect, useRef, useState } from 'react';
import { Award, Users, Clock, MapPin, Heart } from 'lucide-react';

const stats = [
  { icon: Award, value: '25+', label: 'Years in Business' },
  { icon: Users, value: '10K+', label: 'Happy Customers' },
  { icon: Clock, value: '48h', label: 'Rush Orders Available' },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-black"
    >
      {/* Subtle grain texture */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <div
            className={`relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="/images/service-engraving.jpg"
                  alt="The Trophy Man at work in Oromocto"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-gold" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-gold" />

              {/* Stats overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/90 backdrop-blur-sm p-4">
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center">
                        <Icon className="w-5 h-5 text-gold mx-auto mb-2" />
                        <p className="font-display text-xl lg:text-2xl font-bold text-white">
                          {stat.value}
                        </p>
                        <p className="text-xs text-white/50">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <span className="inline-block text-gold text-sm font-mono uppercase tracking-widest mb-4">
              About Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Family-Run, <br />
              <span className="text-gold">Community Rooted</span>
            </h2>
            <div className="w-16 h-px bg-gold mb-6" />

            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                The Trophy Man Ltd. is a locally owned and operated promotional products 
                and awards shop in Oromocto, New Brunswick—just minutes from Fredericton 
                and CFB Gagetown. Owner and operator <strong className="text-white">Nick Andrews</strong> has built 
                the business on a simple promise: quality craftsmanship, fast service, 
                and personalized attention for every order.
              </p>
              <p>
                For over 25 years, we've been the go-to shop for sports teams, military 
                units, schools, businesses, and families celebrating personal milestones. 
                From gleaming trophies and custom plaques to screen-printed team jerseys 
                and branded promotional products, we deliver personalized solutions that 
                make your message stand out.
              </p>
              <p>
                Our deep roots in the community mean we understand what local organizations 
                need—whether it's rush orders for an upcoming tournament, bulk pricing for 
                corporate events, or that perfect custom gift. We're not just a shop; we're 
                your neighbors, and your success is our success.
              </p>
            </div>

            {/* Mission statement */}
            <div className="mt-8 p-6 bg-black-card border-l-2 border-gold">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                <p className="font-display text-lg text-white italic">
                  "Quality craftsmanship, fast service, and personalized attention 
                  for every order—that's The Trophy Man promise."
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="mt-8 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold mt-0.5" />
              <div>
                <p className="text-white font-medium">Visit Our Shop</p>
                <p className="text-white/50 text-sm">
                  4 Brizley Street<br />
                  Oromocto, New Brunswick<br />
                  (Just minutes from Fredericton & CFB Gagetown)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
