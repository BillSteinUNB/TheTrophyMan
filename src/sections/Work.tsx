import { useEffect, useRef, useState } from 'react';

interface WorkItem {
  image: string;
  title: string;
}

const workItems: WorkItem[] = [
  { image: '/work-apparel.jpg', title: 'Branded Apparel' },
  { image: '/work-trophy.jpg', title: 'Trophies & Awards' },
  { image: '/work-plaque.jpg', title: 'Engraved Plaques' },
  { image: '/work-signage.jpg', title: 'Signage' },
  { image: '/work-promo.jpg', title: 'Promotional Items' },
  { image: '/work-gifts.jpg', title: 'Corporate Gifts' },
  { image: '/work-crystal.jpg', title: 'Crystal Awards' },
  { image: '/work-embroidery.jpg', title: 'Custom Embroidery' },
];

const Work = () => {
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
      id="work"
      ref={sectionRef}
      className="section-padding bg-mono-off-white"
    >
      <div className="container-max">
        {/* Header */}
        <div
          className={`mb-12 md:mb-16 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="text-heading text-mono-black mb-3">OUR WORK</h2>
          <div className="w-12 h-0.5 bg-mono-black mb-4" />
          <p className="text-body text-mono-600 max-w-xl">
            A sample of what we create for our clients.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {workItems.map((item, index) => (
            <div
              key={item.title}
              className={`group bg-white overflow-hidden transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-400 ease-smooth group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="p-4 border-t border-mono-200">
                <h3 className="text-sm font-medium text-mono-black">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
