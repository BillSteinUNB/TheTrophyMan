import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "The Trophy Man has been our go-to for baseball team awards for years. Nick always delivers quality trophies at great prices, and the turnaround is amazing. Highly recommend!",
    author: 'Mike Richardson',
    role: 'Coach',
    company: 'Oromocto Minor Baseball',
    rating: 5,
  },
  {
    id: 2,
    quote: "We ordered custom shirts for our unit and they turned out perfect. Professional service, fair pricing, and local—what more could you ask for?",
    author: 'Sgt. James Wilson',
    role: 'CFB Gagetown',
    company: 'Canadian Armed Forces',
    rating: 5,
  },
  {
    id: 3,
    quote: "Nick and his team helped us with everything from engraved plaques to promotional items for our grand opening. The quality exceeded our expectations.",
    author: 'Jennifer MacDonald',
    role: 'Owner',
    company: 'Fredericton Small Business',
    rating: 5,
  },
  {
    id: 4,
    quote: "Fast, friendly, and fantastic work. We needed rush engraving for a retirement gift and they had it done same-day. That's service you can't beat!",
    author: 'David Chen',
    role: 'Office Manager',
    company: 'Local Business',
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-black-card overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Subtle grain texture */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-gold text-sm font-mono uppercase tracking-widest mb-4">
            What Our Customers Say
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Local Reviews
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        {/* Testimonial Card */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative bg-black border border-white/5 p-8 lg:p-12">
            {/* Quote icon */}
            <div className="absolute -top-6 left-8 lg:left-12 w-12 h-12 bg-gold flex items-center justify-center">
              <Quote className="w-6 h-6 text-black" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-gold text-gold"
                  style={{
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating ? 'scale(0.8)' : 'scale(1)',
                    transition: `all 0.3s ease ${i * 50}ms`,
                  }}
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote
              className="font-display text-xl lg:text-2xl xl:text-3xl text-white italic leading-relaxed mb-8"
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              "{currentTestimonial.quote}"
            </blockquote>

            {/* Author */}
            <div
              className="flex items-center gap-4"
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 100ms',
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <span className="font-display text-lg font-bold text-black">
                  {currentTestimonial.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-white">
                  {currentTestimonial.author}
                </p>
                <p className="text-sm text-white/50">
                  {currentTestimonial.role}, {currentTestimonial.company}
                </p>
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-gold/20" />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`h-1 transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-gold'
                      : 'w-4 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-2">
              <button
                onClick={prevTestimonial}
                className="p-3 border border-white/20 text-white/70 hover:border-gold hover:text-gold transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 border border-white/20 text-white/70 hover:border-gold hover:text-gold transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
