import React from 'react';

const Navbar = () => {
  const navItems = [
    { name: 'Beranda', href: '#' },
    { name: 'Kesehatan', href: '#' },
    { name: 'Otomotif', href: '#' },
    { name: 'Politik', href: '#' },
    { name: 'Olahraga', href: '#' },
    { name: 'Nasional', href: '#' },
    { name: 'Internasional', href: '#' },
  ];

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Logo */}
          <svg
            className="w-8 h-8 text-blue-600"
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
          <a href="#" className="text-xl font-bold text-gray-900">
            Berita Kini
          </a>
        </div>
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        {/* Mobile menu button (optional, for full responsiveness) */}
        <div className="md:hidden">
          <button className="text-gray-600 hover:text-blue-600 focus:outline-none">
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