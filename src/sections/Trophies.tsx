import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Catalog {
  name: string;
  url: string;
}

const catalogs: Catalog[] = [
  { name: 'Bullet by PCNA', url: 'https://www.pcna.com/en-ca/brand/bullet' },
  { name: 'Barhill Catalog', url: 'https://catalog.barhill.com/' },
  { name: 'Stars Awards', url: 'https://stars.awardscat.com/#p=1' },
  { name: 'Tromart Awards', url: 'https://tromartawards.com/nc2024/#p=1' },
  { name: 'Awards of Distinction', url: 'https://www.awardsofdistinction.ca/' },
  { name: 'Caldwell Recognition', url: 'https://caldwellrecognition.com/catalogs/awards_and_recognition/Index.html#p=1' },
];

const Trophies = () => {
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
      id="trophies"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container-max">
        {/* Header with Image */}
        <div
          className={`mb-12 md:mb-16 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-8">
            <img
              src="/cat-trophies.jpg"
              alt="Trophies, Awards & Swag"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-heading text-mono-black mb-3">TROPHIES / AWARDS / SWAG</h2>
          <div className="w-12 h-0.5 bg-mono-black mb-4" />
          <p className="text-body text-mono-600 max-w-xl mb-4">
            Browse our award and recognition catalogs. Custom engraving available on almost any personal item.
          </p>
          <p className="text-small text-mono-500">
            Please <a href="#contact" className="underline hover:text-mono-black">contact us</a> to find out more information about custom engraving.
          </p>
        </div>

        {/* Catalog List */}
        <div className="max-w-md mx-auto">
          {catalogs.map((catalog, index) => (
            <a
              key={catalog.name}
              href={catalog.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between bg-mono-black text-white px-6 py-5 mb-3 text-base font-medium transition-all duration-300 hover:bg-mono-700 focus-ring ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <span>{catalog.name}</span>
              <ExternalLink size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trophies;
