import React from 'react';

const NewsCard = ({ title, image, description, link, source, pubDate }) => {
  // Function to strip HTML tags from a string
  const stripHtml = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const cleanDescription = description ? stripHtml(description) : 'No description available.';

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
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-brown-ish text-white px-4 py-2 rounded hover:bg-dark-blue self-end"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsCard;