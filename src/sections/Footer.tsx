import { Trophy, Facebook, Instagram } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Trophies & Awards', href: '#services' },
    { label: 'Engraving', href: '#services' },
    { label: 'Custom Apparel', href: '#services' },
    { label: 'Signs & Banners', href: '#services' },
    { label: 'Promotional Products', href: '#services' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Get a Quote', href: '#contact' },
    { label: 'Contact', href: '#contact' },
  ],
  support: [
    { label: 'FAQs', href: '#' },
    { label: 'Rush Orders', href: '#' },
    { label: 'Bulk Pricing', href: '#' },
    { label: 'Artwork Guidelines', href: '#' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/thetrophyman', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/thetrophyman', label: 'Instagram' },
];

const Footer = () => {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative w-full bg-black border-t border-white/5">
      {/* Main footer */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group mb-6"
            >
              <Trophy className="w-6 h-6 text-gold transition-transform duration-300 group-hover:scale-110" />
              <span className="font-display text-lg font-bold text-white tracking-wide">
                THE TROPHY MAN
              </span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-xs">
              Locally owned and operated in Oromocto, NB. Custom trophies, awards, 
              apparel, signage, and promotional products.
            </p>
            <p className="text-gold text-sm mb-6">
              4 Brizley Street, Oromocto, NB
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/5 flex items-center justify-center text-white/50 hover:bg-gold hover:text-black transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/50 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/50 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/50 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} The Trophy Man Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button className="text-white/40 text-sm hover:text-gold transition-colors duration-300">
                Privacy Policy
              </button>
              <button className="text-white/40 text-sm hover:text-gold transition-colors duration-300">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
