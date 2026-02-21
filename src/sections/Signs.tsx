import { useEffect, useRef, useState } from 'react';
import { X, Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  details: string[];
  image: string;
}

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  quantity: string;
  size: string;
  material?: string;
  design?: string;
  notes: string;
}

const products: Product[] = [
  {
    id: 'stickers',
    name: 'Stickers',
    description: 'Custom vinyl stickers for any purpose.',
    details: ['Any Shape', 'Any Size', 'Any Colour'],
    image: '/product-stickers.jpg',
  },
  {
    id: 'signs',
    name: 'Signs',
    description: 'Durable outdoor and indoor signage.',
    details: ['Any Shape', 'Any Size', 'Corex or Alupanel'],
    image: '/TMSignNEw.png',
  },
  {
    id: 'vinyl',
    name: 'Vinyl Car Stickers/Wraps',
    description: 'Vehicle graphics and window decals.',
    details: ['Any Shape', 'Any Size', 'Full or Partial Wraps'],
    image: '/TMVanPhotoNew.png',
  },
  {
    id: 'banners',
    name: 'Banners',
    description: 'Large format banners for events and displays.',
    details: ['Any Shape', 'Any Size', 'Any Design'],
    image: '/Gemini_Generated_Image_vxahmcvxahmcvxah.png',
  },
];

const Signs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    quantity: '',
    size: '',
    material: '',
    design: '',
    notes: '',
  });

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

  const openModal = (productId: string) => {
    setActiveModal(productId);
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      quantity: '',
      size: '',
      material: '',
      design: '',
      notes: '',
    });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const activeProduct = products.find((p) => p.id === activeModal);

  const renderFormFields = () => {
    if (!activeProduct) return null;

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-mono-black mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-mono-200 bg-white text-mono-black focus:outline-none focus:border-mono-black focus:ring-2 focus:ring-mono-black/10"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-mono-black mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-mono-200 bg-white text-mono-black focus:outline-none focus:border-mono-black focus:ring-2 focus:ring-mono-black/10"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-mono-black mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-mono-200 bg-white text-mono-black focus:outline-none focus:border-mono-black focus:ring-2 focus:ring-mono-black/10"
              placeholder="(506) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-mono-black mb-2">
              Quantity *
            </label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-mono-200 bg-white text-mono-black focus:outline-none focus:border-mono-black focus:ring-2 focus:ring-mono-black/10"
              placeholder="e.g., 100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-mono-black mb-2">
            Size *
          </label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-mono-200 bg-white text-mono-black focus:outline-none focus:border-mono-black focus:ring-2 focus:ring-mono-black/10"
            placeholder="e.g., 12x18 inches"
          />
        </div>

        {activeProduct.id === 'signs' && (
          <div>
            <label className="block text-sm font-medium text-mono-black mb-2">
              Material *
            </label>
            <select
              name="material"
              value={formData.material}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-mono-200 bg-white text-mono-black focus:outline-none focus:border-mono-black focus:ring-2 focus:ring-mono-black/10"
            >
              <option value="">Select material</option>
              <option value="corex">Corex</option>
              <option value="alupanel">Alupanel</option>
            </select>
          </div>
        )}

        {(activeProduct.id === 'stickers' || activeProduct.id === 'vinyl') && (
          <div>
            <label className="block text-sm font-medium text-mono-black mb-2">
              Design/Colour *
            </label>
            <input
              type="text"
              name="design"
              value={formData.design}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-mono-200 bg-white text-mono-black focus:outline-none focus:border-mono-black focus:ring-2 focus:ring-mono-black/10"
              placeholder="e.g., Full colour, Black & white, etc."
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-mono-black mb-2">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-mono-200 bg-white text-mono-black focus:outline-none focus:border-mono-black focus:ring-2 focus:ring-mono-black/10 resize-none"
            placeholder="Any special requirements or questions..."
          />
        </div>
      </>
    );
  };

  return (
    <section
      id="signs"
      ref={sectionRef}
      className="section-padding bg-mono-off-white"
    >
      <div className="container-max">
        {/* Header with Image */}
        <div
          className={`mb-12 md:mb-16 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-5'
            }`}
        >
          <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-8 flex items-center justify-center">
            <video
              ref={(el) => {
                if (el) el.playbackRate = 0.85;
              }}
              src="/0220.mp4"
              className="w-full h-full object-cover scale-[0.9] saturate-[0.6] sepia-[10%] opacity-90 transition-all duration-700 hover:saturate-100 hover:sepia-0 hover:opacity-100"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <h2 className="text-heading text-mono-black mb-3">SIGNS & STICKERS</h2>
          <div className="w-12 h-0.5 bg-mono-black mb-4" />
          <p className="text-body text-mono-600 max-w-xl">
            Custom signs, stickers, and vinyl graphics. Request a quote for your project.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`bg-white overflow-hidden transition-all duration-500 ${isVisible
                ? 'opacity-100'
                : 'opacity-0 translate-y-5'
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-mono-black mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-mono-600 mb-3">{product.description}</p>
                <ul className="text-sm text-mono-500 mb-4 space-y-1">
                  {product.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
                <button
                  onClick={() => openModal(product.id)}
                  className="w-full bg-mono-black text-white py-3 text-sm font-semibold transition-all duration-200 hover:bg-mono-700 focus-ring"
                >
                  Price Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Modal */}
      {activeModal && activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeModal}
          />
          <div className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-up">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-mono-black">
                  Quote Request: {activeProduct.name}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 text-mono-500 hover:text-mono-black transition-colors focus-ring"
                >
                  <X size={24} />
                </button>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-mono-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-white" size={24} />
                  </div>
                  <h4 className="text-lg font-semibold text-mono-black mb-2">
                    Quote Request Sent
                  </h4>
                  <p className="text-mono-600">
                    Thanks! We'll get back to you within 24 hours with your quote.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {renderFormFields()}
                  <button
                    type="submit"
                    className="w-full bg-mono-black text-white py-4 text-sm font-semibold transition-all duration-200 hover:bg-mono-700 focus-ring"
                  >
                    Submit Quote Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Signs;
