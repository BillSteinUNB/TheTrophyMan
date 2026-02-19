import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Clothing from './sections/Clothing';
import Trophies from './sections/Trophies';
import Signs from './sections/Signs';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Clothing />
        <Trophies />
        <Signs />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
