import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Catalog {
  name: string;
  url: string;
  logo?: string;
  scale?: number;
}

const catalogs: Catalog[] = [
  { name: 'Bullet by PCNA', url: 'https://www.pcna.com/en-ca/brand/bullet', logo: '/Bullet.webp', scale: 0.9 },
  { name: 'Barhill Catalog', url: 'https://catalog.barhill.com/', logo: 'https://barhill.com/images/barhill.png', scale: 0.9 },
  { name: 'Rising Stars', url: 'https://stars.awardscat.com/#p=1', logo: '/RisingStars.png', scale: 1.1 },
  { name: 'Tromart Awards', url: 'https://tromartawards.com/nc2024/#p=1', logo: '/TroMart.png', scale: 1.2 },
  { name: 'Awards of Distinction', url: 'https://www.awardsofdistinction.ca/', logo: '/AwardsOfDistinction.png', scale: 1.1 },
  { name: 'Caldwell Recognition', url: 'https://caldwellrecognition.com/catalogs/awards_and_recognition/Index.html#p=1', logo: '/CaldwellRecognition.png', scale: 1.2 },
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
      className="bg-white flex flex-col"
    >
      <div className="bg-mono-off-white w-full pt-[clamp(4rem,10vh,7.5rem)] pb-12 md:pb-16">
        <div className="container-max">
          {/* Header with Image */}
          <div
            className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-5'
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
            <div className="max-w-4xl mx-auto">
              <p className="text-body text-mono-600 mb-4">
                Browse our award and recognition catalogs. Custom engraving available on almost any personal item.
              </p>
              <p className="text-small text-mono-500">
                Please <a href="#contact" className="underline hover:text-mono-black">contact us</a> to find out more information about custom engraving.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-12 md:py-16 pb-[clamp(4rem,10vh,7.5rem)]">
        <div className="container-max">
          {/* Catalog List */}
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 md:gap-6">
            {catalogs.map((catalog, index) => (
              <a
                key={catalog.name}
                href={catalog.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center justify-center bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1 focus-ring border border-mono-100/50 hover:border-mono-200 ${isVisible
                  ? 'opacity-100'
                  : 'opacity-0 translate-y-5'
                  }`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                {/* Logo Section */}
                <div className="w-full h-24 sm:h-32 flex items-center justify-center mb-4">
                  {catalog.logo ? (
                    <img
                      src={catalog.logo}
                      alt={`${catalog.name} logo`}
                      className="max-w-full max-h-full object-contain grayscale opacity-60 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                      style={{ transform: `scale(${catalog.scale || 1})` }}
                    />
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center bg-mono-50 text-mono-400 font-bold text-2xl rounded-xl transition-colors duration-300 group-hover:bg-mono-100 group-hover:text-mono-800">
                      {catalog.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex items-center gap-2 w-full justify-center">
                  <span className="text-sm sm:text-base font-sans font-medium text-mono-600 group-hover:text-mono-black transition-colors text-center">
                    {catalog.name}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-mono-300 opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-mono-black"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trophies;
