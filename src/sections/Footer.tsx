const Footer = () => {
  const scrollToSection = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Clothing', href: '#clothing' },
    { label: 'Trophies', href: '#trophies' },
    { label: 'Signs & Stickers', href: '#signs' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-mono-black text-white">
      <div className="container-max py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#');
              }}
              className="flex items-center gap-3 mb-4 focus-ring"
            >
              <img
                src="/logo.jpg"
                alt="The Trophy Man"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-semibold tracking-tight text-white">
                THE TROPHY MAN LTD
              </span>
            </a>
            <p className="text-white/70 text-sm leading-relaxed">
              Custom awards and promotional products.<br />
              Serving Oromocto for over 25 years.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-white/70">
              <p>4 Brizley Street, Oromocto, NB</p>
              <p>
                <a href="tel:+15063578677" className="hover:text-white transition-colors focus-ring">
                  (506) 357-8677
                </a>
              </p>
              <p>
                <a href="mailto:info@thetrophyman.ca" className="hover:text-white transition-colors focus-ring">
                  info@thetrophyman.ca
                </a>
              </p>
              <p className="text-white/50">Mon–Fri 9AM–5PM, Sat 10AM–2PM</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-sm text-white/70 hover:text-white transition-colors focus-ring"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <p className="text-sm text-white/50 text-center">
            © {new Date().getFullYear()} The Trophy Man Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
