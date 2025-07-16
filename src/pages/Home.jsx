import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import CategoryMenu from '../components/CategoryMenu';

const API_BASE_URL = 'https://api-berita-indonesia.vercel.app'; // Replace with the actual API base URL if different

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('terbaru');
  const [selectedSource, setSelectedSource] = useState('cnn');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    // JPNN and Kumparan only have 'terbaru' category based on your API structure.
    // If you want to include them, you'll need to handle the category filtering for them.
    // For simplicity, I'm excluding them from the general category selection for now.
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        let apiUrl = `${API_BASE_URL}/${selectedSource}/${selectedCategory}`;

        // Special handling for JPNN and Kumparan as they only have 'terbaru' category
        if (['jpnn', 'kumparan'].includes(selectedSource) && selectedCategory !== 'terbaru') {
            // If a specific category other than 'terbaru' is selected for these sources,
            // we should probably just default to 'terbaru' or show an error/empty state.
            // For now, let's default to 'terbaru' for these specific sources if a non-terbaru category is chosen.
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
  }, [selectedCategory, selectedSource]);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Berita Kini</h1>

      {/* News Source Selection */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Select News Source</h2>
        <div className="flex flex-wrap gap-3">
          {newsSources.map((source) => (
            <button
              key={source.id}
              className={`category-button ${selectedSource === source.id ? 'active' : ''}`}
              onClick={() => setSelectedSource(source.id)}
            >
              {source.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category Menu */}
      <CategoryMenu
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {loading && <p className="text-center text-lg text-blue-600 mt-8">Loading news...</p>}
      {error && <p className="text-center text-lg text-red-600 mt-8">{error}</p>}
      {!loading && news.length === 0 && !error && (
        <p className="text-center text-lg text-gray-600 mt-8">No news found for the selected category and source.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {news.map((item, index) => (
          <NewsCard
            key={index}
            title={item.title}
            image={item.image}
            description={item.description}
            link={item.link}
            source={selectedSource} // Pass the selected source to the card
            pubDate={item.pubDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;