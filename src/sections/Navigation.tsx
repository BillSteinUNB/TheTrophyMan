import { useState, useEffect } from 'react';
import { Menu, X, Trophy, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', href: '#shop' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <Trophy className="w-6 h-6 text-gold" />
              <span className="font-display text-lg lg:text-xl font-bold text-white tracking-wide">
                THE TROPHY MAN
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-white/70 hover:text-gold transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-xs font-bold flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* CTA Button - Desktop */}
              <Button
                onClick={() => scrollToSection('#contact')}
                variant="outline"
                className="hidden lg:flex border-gold text-gold hover:bg-gold hover:text-black transition-all duration-200 rounded-none px-5 text-sm"
              >
                GET QUOTE
              </Button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 p-6 bg-black border-b border-white/10">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-lg font-display text-white/80 hover:text-gold transition-colors text-left py-3 border-b border-white/5"
                >
                  {link.label}
                </button>
              ))}
              
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between text-lg font-display text-white/80 hover:text-gold transition-colors py-3 border-b border-white/5"
              >
                <span>Cart ({totalItems})</span>
                <ShoppingCart className="w-5 h-5" />
              </button>

              <Button
                onClick={() => scrollToSection('#contact')}
                className="mt-4 bg-gold text-black hover:bg-gold-light rounded-none py-5"
              >
                GET QUOTE
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
