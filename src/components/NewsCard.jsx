import React from 'react';
import { Link } from 'react-router-dom';

const NewsCard = ({ title, image, description, link, source, pubDate, category }) => { 
  const stripHtml = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const cleanDescription = description ? stripHtml(description) : 'No description available.';
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="news-card">
      {image && (
        <img
          src={image}
          alt={title}
          className="news-card-image"
          onError={(e) => { e.target.onerror = null; e.target.src="/placeholder.png" }}
        />
      )}
      <div className="news-card-content">
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-description">{cleanDescription}</p>
        <div className="news-card-footer">
          <span className="news-card-source capitalize">{source}</span>
          {pubDate && <span className="news-card-date">{new Date(pubDate).toLocaleDateString()}</span>}
        </div>
        <Link
          to={`/news/${source}/${category}/${encodedTitle}`} 
          className="mt-4 inline-block bg-brown-ish text-white px-4 py-2 rounded hover:bg-dark-blue self-end"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;