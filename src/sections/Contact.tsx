import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    value: 'Mon-Fri: 9AM-5PM, Sat: 10AM-2PM',
    href: '#',
  },
];

const services = [
  'Trophies & Awards',
  'Engraving & Personalization',
  'Custom Apparel',
  'Signs & Banners',
  'Promotional Products',
  'Vinyl & Stickers',
  'Rush Order',
  'Other / Not Sure',
];

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-black-card"
    >
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
            Get In Touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Request a Quote
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto text-base lg:text-lg">
            Tell us about your project and we'll get back to you quickly with a 
            custom quote. Rush orders available!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/70">
                    Full Name <span className="text-gold">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your name"
                    required
                    className="bg-black border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20 rounded-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/70">
                    Email <span className="text-gold">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="bg-black border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20 rounded-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/70">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="(506) 357-8677"
                    className="bg-black border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20 rounded-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-white/70">
                    Service Needed <span className="text-gold">*</span>
                  </Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => handleChange('service', value)}
                  >
                    <SelectTrigger className="bg-black border-white/10 text-white focus:ring-gold/20 rounded-none">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-black-card border-white/10">
                      {services.map((service) => (
                        <SelectItem
                          key={service}
                          value={service}
                          className="text-white hover:bg-gold/20 focus:bg-gold/20"
                        >
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/70">
                  Project Details <span className="text-gold">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell us about your project: quantity needed, timeline, design ideas, team/school/organization name..."
                  required
                  rows={5}
                  className="bg-black border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold/20 rounded-none resize-none"
                />
              </div>

              {/* File upload placeholder */}
              <div className="space-y-2">
                <Label className="text-white/70">Attachments (Optional)</Label>
                <div className="border border-dashed border-white/20 p-6 text-center hover:border-gold/50 transition-colors duration-300 cursor-pointer">
                  <Upload className="w-6 h-6 text-white/40 mx-auto mb-2" />
                  <p className="text-sm text-white/50">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-xs text-white/30 mt-1">
                    Upload logos, artwork, or reference images (JPG, PNG, PDF)
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitted}
                className={`w-full py-6 text-sm font-semibold tracking-wide rounded-none transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-600 text-white'
                    : 'bg-gold text-black hover:bg-gold-light'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Message Sent! We'll Be in Touch Soon.
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    SEND REQUEST
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-black border border-white/5 p-6 lg:p-8">
              <h3 className="font-display text-xl font-bold text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-white/50 text-sm mb-1">{item.label}</p>
                        <p className="text-white group-hover:text-gold transition-colors duration-300">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Map */}
              <div className="mt-8 aspect-video bg-black-card border border-white/5 relative overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2756.7890123456789!2d-66.0890123456789!3d45.84890123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca7b5abcdef1234%3A0xabcdef1234567890!2s4%20Brizley%20St%2C%20Oromocto%2C%20NB!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(92%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Trophy Man Location"
                />
              </div>

              {/* Quick response badge */}
              <div className="mt-6 p-4 bg-gold/10 border border-gold/20">
                <p className="text-gold text-sm font-medium text-center">
                  We typically respond within 24 hours
                </p>
                <p className="text-white/50 text-xs text-center mt-1">
                  Rush orders available for tight deadlines
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
