import React from 'react';
import { Youtube, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-blue text-white py-6 mt-12 fixed bottom-0 z-50 w-full"> {/* Reduced vertical padding (py-6) */}
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> {/* Adjusted grid for compactness and smaller gap */}
        <div className="col-span-1">
          <div className="flex items-center space-x-1 mb-2"> {/* Reduced space-x and mb */}
            <svg
              className="w-6 h-6 text-light-grey" // Reduced logo size
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
            <span className="text-lg font-bold">Berita Kini</span> 
          </div>
          <p className="text-xs text-light-grey">
            © 2025 Berita Kini. All Rights Reserved.
          </p>
        </div>

        <div>
          <h4 className="text-base font-semibold mb-2">Telusuri</h4> 
          <ul className="space-y-1 text-xs text-light-grey"> 
            <li><a href="#" className="hover:text-brown-ish">Beranda</a></li>
            <li><a href="#" className="hover:text-brown-ish">Kesehatan</a></li>
            <li><a href="#" className="hover:text-brown-ish">Otomotif</a></li>
            <li><a href="#" className="hover:text-brown-ish">Politik</a></li>
            <li><a href="#" className="hover:text-brown-ish">Olahraga</a></li>
            <li><a href="#" className="hover:text-brown-ish">Nasional</a></li>
            <li><a href="#" className="hover:text-brown-ish">Internasional</a></li>
          </ul>
        </div>

        {/* Bantuan Section */}
        <div>
          <h4 className="text-base font-semibold mb-2">Bantuan</h4> 
          <ul className="space-y-1 text-xs text-light-grey"> 
            <li><a href="#" className="hover:text-brown-ish">Kontak Kami</a></li>
            <li><a href="#" className="hover:text-brown-ish">Laporan Pembajakan</a></li>
            <li><a href="#" className="hover:text-brown-ish">Kebijakan</a></li>
          </ul>
        </div>

        {/* Berlangganan & Ikuti Kami Section */}
        <div>
          <h4 className="text-base font-semibold mb-2">Berlangganan Berita Terbaru</h4> 
          <div className="flex mb-2"> 
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="px-3 py-1 rounded-l-md w-full text-gray-900 focus:outline-none text-xs" 
            />
            <button className="bg-brown-ish px-3 py-1 rounded-r-md hover:bg-brown-ish-lighter"> 
              <svg
                className="w-4 h-4 text-white" 
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </button>
          </div>
          <h4 className="text-base font-semibold mb-2">Ikuti Kami</h4> 
          <div className="flex space-x-2"> 
            <a href="#" className="text-white hover:text-brown-ish">
              <Youtube className="w-6 h-6" /> 
            </a>
            <a href="#" className="text-white hover:text-brown-ish">
              <Instagram className="w-6 h-6" /> </a>
            <a href="#" className="text-white hover:text-brown-ish">
              <Facebook className="w-6 h-6" /> 
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;