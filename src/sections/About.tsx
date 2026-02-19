import { useEffect, useRef, useState } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
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
      className="section-padding bg-white"
    >
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div
            className={`transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/about-shop.jpg"
                alt="The Trophy Man shop"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-500 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h2 className="text-heading text-mono-black mb-3">ABOUT US</h2>
            <div className="w-12 h-0.5 bg-mono-black mb-6" />
            
            <p className="text-lg font-medium text-mono-black mb-4">
              Family-owned. Locally trusted.
            </p>
            
            <div className="space-y-4 text-body text-mono-600">
              <p>
                The Trophy Man has been serving Oromocto and the surrounding communities 
                for over 25 years. From custom trophies and awards to branded apparel 
                and promotional products, we take pride in quality craftsmanship and 
                fast, reliable service.
              </p>
              <p>
                Need it in a rush? We specialize in quick turnarounds for last-minute orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
