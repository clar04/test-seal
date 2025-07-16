import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Copyright */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center space-x-2 mb-4">
            <svg
              className="w-8 h-8 text-blue-400"
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
            <span className="text-xl font-bold">Berita Kini</span>
          </div>
          <p className="text-sm text-gray-400">
            © 2025 Berita Kini. All Rights Reserved.
          </p>
        </div>

        {/* Telusuri Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Telusuri</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-blue-400">Beranda</a></li>
            <li><a href="#" className="hover:text-blue-400">Kesehatan</a></li>
            <li><a href="#" className="hover:text-blue-400">Otomotif</a></li>
            <li><a href="#" className="hover:text-blue-400">Politik</a></li>
            <li><a href="#" className="hover:text-blue-400">Olahraga</a></li>
            <li><a href="#" className="hover:text-blue-400">Nasional</a></li>
            <li><a href="#" className="hover:text-blue-400">Internasional</a></li>
          </ul>
        </div>

        {/* Bantuan Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Bantuan</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-blue-400">Kontak Kami</a></li>
            <li><a href="#" className="hover:text-blue-400">Laporan Pembajakan</a></li>
            <li><a href="#" className="hover:text-blue-400">Kebijakan</a></li>
          </ul>
        </div>

        {/* Berlangganan & Ikuti Kami Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Berlangganan Berita Terbaru</h4>
          <div className="flex mb-4">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="px-4 py-2 rounded-l-md w-full text-gray-900 focus:outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700">
              <svg
                className="w-5 h-5 text-white"
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
          <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <img src="/youtube-icon.png" alt="YouTube" className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <img src="/instagram-icon.png" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <img src="/facebook-icon.png" alt="Facebook" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;