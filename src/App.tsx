import { CartProvider } from './context/CartContext';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Shop from './sections/Shop';
import Services from './sections/Services';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import CartDrawer from './sections/CartDrawer';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-black">
        <Navigation />
        <main>
          <Hero />
          <Shop />
          <Services />
          <Gallery />
          <Testimonials />
          <About />
          <Contact />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
