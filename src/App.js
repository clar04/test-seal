import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import NewsDetail from './pages/NewsDetail';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import './App.css'; 
function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/news/:source/:category/:title" element={<NewsDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;