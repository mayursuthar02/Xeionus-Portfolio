import React from 'react';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <CustomCursor />
      <Header />
      <Hero />
      <Gallery />
      <Contact />
    </div>
  );
}

export default App;