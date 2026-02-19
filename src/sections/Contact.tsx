import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Check } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '(506) 357-8677',
      href: 'tel:+15063578677',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@thetrophyman.ca',
      href: 'mailto:info@thetrophyman.ca',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: '4 Brizley Street, Oromocto, NB',
      href: 'https://maps.google.com/?q=4+Brizley+Street+Oromocto+NB',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon–Fri 9AM–5PM, Sat 10AM–2PM',
      href: null,
    },
  ];

  return (
    <section
      id="contact"
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
          <h2 className="text-heading text-mono-black mb-3">CONTACT US</h2>
          <div className="w-12 h-0.5 bg-mono-black mb-4" />
          <p className="text-body text-mono-600 max-w-xl">
            Have a question or need a custom quote? Get in touch with us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Form */}
          <div
            className={`transition-all duration-500 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            {isSubmitted ? (
              <div className="bg-white p-8 md:p-12 text-center border border-mono-200">
                <div className="w-12 h-12 bg-mono-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-mono-black mb-2">
                  Message Sent
                </h3>
                <p className="text-mono-600">
                  Thanks for reaching out! We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-mono-black mb-2"
                  >
                    Name <span className="text-mono-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.name ? 'border-red-500' : 'border-mono-200'
                    } bg-white text-mono-black placeholder-mono-400 transition-colors duration-200 focus:outline-none focus:border-mono-black focus:ring-2 focus:ring-mono-black/10`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-mono-black mb-2"
                  >
                    Email <span className="text-mono-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.email ? 'border-red-500' : 'border-mono-200'
                    } bg-white text-mono-black placeholder-mono-400 transition-colors duration-200 focus:outline-none focus:border-mono-black focus:ring-2 focus:ring-mono-black/10`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-mono-black mb-2"
                  >
                    Phone <span className="text-mono-400">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-mono-200 bg-white text-mono-black placeholder-mono-400 transition-colors duration-200 focus:outline-none focus:border-mono-black focus:ring-2 focus:ring-mono-black/10"
                    placeholder="(506) 123-4567"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-mono-black mb-2"
                  >
                    Message <span className="text-mono-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 border ${
                      errors.message ? 'border-red-500' : 'border-mono-200'
                    } bg-white text-mono-black placeholder-mono-400 transition-colors duration-200 focus:outline-none focus:border-mono-black focus:ring-2 focus:ring-mono-black/10 resize-none`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-mono-black text-white px-8 py-4 text-sm font-semibold border-2 border-mono-black transition-all duration-200 hover:bg-transparent hover:text-mono-black focus-ring"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div
            className={`transition-all duration-500 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="bg-white p-8 md:p-10 border border-mono-200">
              <h3 className="text-lg font-semibold text-mono-black mb-6">
                GET IN TOUCH
              </h3>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-mono-off-white border border-mono-200 flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-mono-black" />
                    </div>
                    <div>
                      <p className="text-sm text-mono-500 mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-mono-black hover:underline focus-ring"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-mono-black">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
