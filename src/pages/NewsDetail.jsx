import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RecommendedNews from '../components/RecommendedNews';

const API_BASE_URL = 'https://api-berita-indonesia.vercel.app';

const NewsDetail = () => {
  const { source, category, title } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = `${API_BASE_URL}/${source}/${category}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.data && response.data.data.posts) {
          const foundNews = response.data.data.posts.find(
            (post) => post.title === decodeURIComponent(title)
          );
          setNewsItem(foundNews);
        } else {
          setNewsItem(null);
        }
      } catch (err) {
        console.error("Error fetching news detail:", err);
        setError("Failed to fetch news details. Please try again later.");
        setNewsItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [source, category, title]);

  const stripHtml = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  if (loading) {
    return <p className="text-center text-lg text-dark-blue mt-8">Loading news detail...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-600 mt-8">{error}</p>;
  }

  if (!newsItem) {
    return <p className="text-center text-lg text-gray-600 mt-8">News item not found.</p>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-dark-blue mb-4">{newsItem.title}</h1>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span className="font-semibold capitalize">{source}</span>
          {newsItem.pubDate && <span>{new Date(newsItem.pubDate).toLocaleDateString()}</span>}
        </div>
        {newsItem.image && (
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-auto object-cover rounded-lg mb-6"
          />
        )}
        <div className="text-gray-800 text-lg leading-relaxed space-y-4">
          <p>{stripHtml(newsItem.description)}</p>
          {newsItem.content && <p>{stripHtml(newsItem.content)}</p>}
        </div>
        <a
          href={newsItem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-brown-ish text-white px-6 py-3 rounded-lg hover:bg-dark-blue transition-colors duration-200"
        >
          Read Full Article
        </a>
      </div>
      <RecommendedNews currentSource={source} currentCategory={category} currentTitle={title} />
    </div>
  );
};

export default NewsDetail;