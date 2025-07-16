import React from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import './App.css'; 
function App() {
  return (
    <div className="App flex flex-col min-h-screen"> 
      <Navbar /> 
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;