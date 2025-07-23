import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const Navbar = () => {
  const navItems = [
    { name: 'Beranda', to: '/' },
    { name: 'Kesehatan', to: '/?category=kesehatan' },
    { name: 'Otomotif', to: '/?category=otomotif' },
    { name: 'Politik', to: '/?category=politik' },
    { name: 'Olahraga', to: '/?category=olahraga' },
    { name: 'Nasional', to: '/?category=nasional' },
    { name: 'Internasional', to: '/?category=internasional' },
  ];

  return (
    <nav className="bg-dark-blue shadow-lg py-4 fixed top-0 z-50 w-full">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Logo */}
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19.428 15.428a2 2 0 00-2.828-2.828L6.428 17.572A2 2 0 0017.572 6.428l-2.828 2.828a2 2 0 002.828 2.828z"
            ></path>
          </svg>
          <Link to="/" className="text-xl font-bold text-white">
            Berita Kini
          </Link>
        </div>
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.to}
                className="text-white hover:text-light-grey transition-colors duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="md:hidden">
          <button className="text-white hover:text-light-grey focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;