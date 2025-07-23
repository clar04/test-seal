import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard';

const API_BASE_URL = 'https://api-berita-indonesia.vercel.app';

const RecommendedNews = ({ currentSource, currentCategory, currentTitle }) => {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommended = async () => {
      setLoading(true);
      try {
        const apiUrl = `${API_BASE_URL}/${currentSource}/${currentCategory}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.data && response.data.data.posts) {
          const filteredNews = response.data.data.posts
            .filter((post) => post.title !== decodeURIComponent(currentTitle))
            .slice(0, 3);
          setRecommended(filteredNews);
        }
      } catch (err) {
        console.error("Error fetching recommended news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommended();
  }, [currentSource, currentCategory, currentTitle]);

  if (loading || recommended.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-dark-blue mb-6">Recommended News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommended.map((item, index) => (
          <NewsCard
            key={index}
            title={item.title}
            image={item.image}
            description={item.description}
            link={item.link}
            source={currentSource}
            pubDate={item.pubDate}
            category={currentCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedNews;