import React from 'react';
import Chat from './Components/Chat';
import Nav from './Components/Nav';
import Team from './Components/Team';
import Footer from './Components/Footer';
import About from './Components/About';
import grey from './assets/Background/grey.jpg';
import moving from './assets/Background/moving.mp4';
function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        className="fixed w-full h-full object-cover"
        style={{ objectFit: 'cover' }}
      >
        <source src={moving} type="video/mp4" />
      </video>
      <div className="relative z-10 bg-opacity-50 bg-gray-900 min-h-screen flex flex-col overflow-y-auto">
        <Nav />
        <Chat />
        <About />
        <Team />
        <Footer />
      </div>
    </div>
  );
}

export default App;