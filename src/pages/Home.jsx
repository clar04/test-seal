import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import CategoryMenu from '../components/CategoryMenu';

const API_BASE_URL = 'https://api-berita-indonesia.vercel.app';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize states from URL or default values
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
  const categories = [
    { name: 'Latest', path: 'terbaru' },
    { name: 'National', path: 'nasional' },
    { name: 'International', path: 'internasional' },
    { name: 'Economy', path: 'ekonomi' },
    { name: 'Sports', path: 'olahraga' },
    { name: 'Technology', path: 'teknologi' },
    { name: 'Entertainment', path: 'hiburan' },
    { name: 'Lifestyle', path: 'gayahidup' },
  ];

  const newsSources = [
    { name: 'CNN', id: 'cnn' },
    { name: 'CNBC', id: 'cnbc' },
    { name: 'Antara', id: 'antara' },
    { name: 'Merdeka', id: 'merdeka' },
    { name: 'Okezone', id: 'okezone' },
    { name: 'Republika', id: 'republika' },
    { name: 'Sindo News', id: 'sindonews' },
    { name: 'Suara', id: 'suara' },
    { name: 'Tempo', id: 'tempo' },
    { name: 'Tribun', id: 'tribun' },
  ];

  // Effect to update states when URL search params change
  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const categoryFromUrl = currentParams.get('category') || 'terbaru';
    const sourceFromUrl = currentParams.get('source') || 'cnn';

    // Only update state if it's different from the URL param to avoid unnecessary re-renders
    if (selectedCategory !== categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
    if (selectedSource !== sourceFromUrl) {
      setSelectedSource(sourceFromUrl);
    }
    // Reset page to 1 when category or source changes
    setCurrentPage(1);
  }, [location.search]);

  // Effect to fetch news when selectedCategory or selectedSource changes
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        let apiUrl = `${API_BASE_URL}/${selectedSource}/${selectedCategory}`;

        // Special handling for JPNN and Kumparan as they only have 'terbaru' category
        if (['jpnn', 'kumparan'].includes(selectedSource) && selectedCategory !== 'terbaru') {
            apiUrl = `${API_BASE_URL}/${selectedSource}/terbaru`;
            console.warn(`Category '${selectedCategory}' not available for ${selectedSource}. Displaying 'terbaru' news.`);
        }

        const response = await axios.get(apiUrl);
        if (response.data && response.data.data && response.data.data.posts) {
          setNews(response.data.data.posts);
        } else {
          setNews([]);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news. Please try again later.");
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory, selectedSource]); // Added selectedCategory and selectedSource to dependencies

  const handleSelectCategory = (categoryPath) => {
    navigate(`/?category=${categoryPath}&source=${selectedSource}`);
  };

  const handleSelectSource = (sourceId) => {
    navigate(`/?category=${selectedCategory}&source=${sourceId}`);
  };

  // Pagination logic
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

      {/* News Source Selection */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Select News Source</h2>
        <div className="flex flex-wrap gap-3">
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
        categories={categories}
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
            category={selectedCategory} // Pass selectedCategory to NewsCard
          />
        ))}
      </div>

      {!loading && news.length > 0 && renderPaginationButtons()}
    </div>
  );
};

export default Home;