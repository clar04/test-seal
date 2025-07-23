import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import CategoryMenu from '../components/CategoryMenu';

const API_BASE_URL = 'https://api-berita-indonesia.vercel.app';

// Data structure mapping sources to their available categories
const sourceCategories = {
  cnn: [
    { name: 'Latest', path: 'terbaru' },
    { name: 'National', path: 'nasional' },
    { name: 'International', path: 'internasional' },
    { name: 'Economy', path: 'ekonomi' },
    { name: 'Sports', path: 'olahraga' },
    { name: 'Technology', path: 'teknologi' },
    { name: 'Entertainment', path: 'hiburan' },
  ],
  cnbc: [
    { name: 'Latest', path: 'terbaru' },
    { name: 'News', path: 'news' },
    { name: 'Market', path: 'market' },
    { name: 'Entrepreneur', path: 'entrepreneur' },
    { name: 'Syariah', path: 'syariah' },
    { name: 'Tech', path: 'tech' },
    { name: 'Lifestyle', path: 'lifestyle' },
  ],
  antara: [
      { name: 'Latest', path: 'terbaru' },
      { name: 'Politics', path: 'politik' },
      { name: 'Law', path: 'hukum' },
      { name: 'Economy', path: 'ekonomi' },
      { name: 'Soccer', path: 'bola' },
      { name: 'Sports', path: 'olahraga' },
      { name: 'Humaniora', path: 'humaniora' },
      { name: 'Lifestyle', path: 'lifestyle' },
      { name: 'Entertainment', path: 'hiburan' },
      { name: 'World', path: 'dunia' },
      { name: 'Tekno', path: 'tekno' },
      { name: 'Otomotif', path: 'otomotif' },
  ],
  merdeka: [
      { name: 'Latest', path: 'terbaru' },
      { name: 'Jakarta', path: 'jakarta' },
      { name: 'World', path: 'dunia' },
      { name: 'Style', path: 'gaya' },
      { name: 'Sports', path: 'olahraga' },
      { name: 'Technology', path: 'teknologi' },
      { name: 'Otomotif', path: 'otomotif' },
      { name: 'Health', path: 'sehat' },
  ],
  okezone: [
      { name: 'Latest', path: 'terbaru' },
      { name: 'Celebrity', path: 'celebrity' },
      { name: 'Sports', path: 'sports' },
      { name: 'Otomotif', path: 'otomotif' },
      { name: 'Economy', path: 'economy' },
      { name: 'Techno', path: 'techno' },
      { name: 'Lifestyle', path: 'lifestyle' },
      { name: 'Soccer', path: 'bola' },
  ],
  republika: [
      { name: 'Latest', path: 'terbaru' },
      { name: 'News', path: 'news' },
      { name: 'Daerah', path: 'daerah' },
      { name: 'Khazanah', path: 'khazanah' },
      { name: 'Islam', path: 'islam' },
      { name: 'International', path: 'internasional' },
      { name: 'Soccer', path: 'bola' },
      { name: 'Leisure', path: 'leisure' },
  ],
  sindonews: [
      { name: 'Latest', path: 'terbaru' },
      { name: 'National', path: 'nasional' },
      { name: 'Ekbis', path: 'ekbis' },
      { name: 'International', path: 'international' },
      { name: 'Daerah', path: 'daerah' },
      { name: 'Sports', path: 'sports' },
      { name: 'Otomotif', path: 'otomotif' },
      { name: 'Tekno', path: 'tekno' },
      { name: 'Edukasi', path: 'edukasi' },
      { name: 'Lifestyle', path: 'lifestyle' },
      { name: 'Kalam', path: 'kalam' },
  ],
  tempo: [
      { name: 'National', path: 'nasional' },
      { name: 'Bisnis', path: 'bisnis' },
      { name: 'Metro', path: 'metro' },
      { name: 'World', path: 'dunia' },
      { name: 'Soccer', path: 'bola' },
      { name: 'Cantik', path: 'cantik' },
      { name: 'Tekno', path: 'tekno' },
      { name: 'Otomotif', path: 'otomotif' },
      { name: 'Seleb', path: 'seleb' },
      { name: 'Gaya', path: 'gaya' },
      { name: 'Travel', path: 'travel' },
  ],
  jpnn: [{ name: 'Latest', path: 'terbaru' }],
  kumparan: [{ name: 'Latest', path: 'terbaru' }],
};


const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const initialCategory = params.get('category') || 'terbaru';
  const initialSource = params.get('source') || 'cnn';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSource, setSelectedSource] = useState(initialSource);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 9;

  const newsSources = [
    { name: 'CNN', id: 'cnn' },
    { name: 'CNBC', id: 'cnbc' },
    { name: 'Antara', id: 'antara' },
    { name: 'Merdeka', id: 'merdeka' },
    { name: 'Okezone', id: 'okezone' },
    { name: 'Republika', id: 'republika' },
    { name: 'Sindo News', id: 'sindonews' },
    { name: 'Tempo', id: 'tempo' },
    { name: 'JPNN', id: 'jpnn' },
    { name: 'Kumparan', id: 'kumparan' },
  ];

  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const categoryFromUrl = currentParams.get('category') || 'terbaru';
    const sourceFromUrl = currentParams.get('source') || 'cnn';

    setSelectedCategory(categoryFromUrl);
    setSelectedSource(sourceFromUrl);
    setCurrentPage(1);
  }, [location.search]);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    const availableCategories = sourceCategories[selectedSource]?.map(c => c.path) || [];
    let categoryToFetch = selectedCategory;

    if (!availableCategories.includes(selectedCategory)) {
      console.warn(`Category '${selectedCategory}' not available for ${selectedSource}. Defaulting to 'terbaru'.`);
      categoryToFetch = 'terbaru';
      navigate(`/?category=terbaru&source=${selectedSource}`, { replace: true });
      return; 
    }

    try {
      const apiUrl = `${API_BASE_URL}/${selectedSource}/${categoryToFetch}`;
      const response = await axios.get(apiUrl);
      if (response.data && response.data.data && response.data.data.posts) {
        setNews(response.data.data.posts);
      } else {
        setNews([]);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to fetch news. The selected category may not be available for this source.");
      setNews([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedSource, navigate]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleSelectCategory = (categoryPath) => {
    navigate(`/?category=${categoryPath}&source=${selectedSource}`);
  };

  const handleSelectSource = (sourceId) => {
    const newSourceCategories = sourceCategories[sourceId].map(c => c.path);
    const categoryToSet = newSourceCategories.includes(selectedCategory) ? selectedCategory : 'terbaru';
    navigate(`/?category=${categoryToSet}&source=${sourceId}`);
  };

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(news.length / newsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const renderPaginationButtons = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;

    pageNumbers.push(1);

    let startPage = Math.max(2, currentPage - Math.floor(maxPageButtons / 2) + 1);
    let endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPageButtons / 2) - 1);

    if (startPage > 2) {
      pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }

    if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }

    const uniquePageNumbers = [...new Set(pageNumbers)].sort((a, b) => {
        if (a === '...') return 1;
        if (b === '...') return -1;
        return a - b;
    });


    return (
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        {uniquePageNumbers.map((number, index) => (
          <button
            key={index}
            onClick={() => number !== '...' && paginate(number)}
            className={`px-3 py-1 rounded-md ${
              currentPage === number
                ? 'bg-dark-blue text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${number === '...' ? 'cursor-default' : ''}`}
            disabled={number === '...'}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };


  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-4xl font-bold text-dark-blue mb-8 text-center">Berita Kini</h1>

      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Select News Source</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {newsSources.map((source) => (
            <button
              key={source.id}
              className={`category-button ${selectedSource === source.id ? 'active' : ''}`}
              onClick={() => handleSelectSource(source.id)}
            >
              {source.name}
            </button>
          ))}
        </div>
      </div>


      <CategoryMenu
        categories={sourceCategories[selectedSource] || []}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {loading && <p className="text-center text-lg text-dark-blue mt-8">Loading news...</p>}
      {error && <p className="text-center text-lg text-red-600 mt-8">{error}</p>}
      {!loading && news.length === 0 && !error && (
        <p className="text-center text-lg text-gray-600 mt-8">No news found for the selected category and source.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {currentNews.map((item, index) => (
          <NewsCard
            key={index}
            title={item.title}
            image={item.image}
            description={item.description}
            link={item.link}
            source={selectedSource}
            pubDate={item.pubDate}
            category={selectedCategory}
          />
        ))}
      </div>

      {!loading && news.length > 0 && renderPaginationButtons()}
    </div>
  );
};

export default Home;