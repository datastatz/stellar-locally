'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Banner from './components/Banner';

// Dummy app data
const appData = {
  'AI-Powered Book Licenses': [
    {
      id: 1,
      name: 'Quantum Physics Master',
      price: '$29.99',
      originalPrice: '$49.99',
      rating: 4.8,
      downloads: '12.5K',
      icon: '📚',
      description: 'Advanced quantum physics concepts with AI tutoring',
      category: 'Science',
      featured: true,
      isNew: false
    },
    {
      id: 2,
      name: 'Mathematics Pro',
      price: '$19.99',
      originalPrice: '$39.99',
      rating: 4.9,
      downloads: '8.2K',
      icon: '🔢',
      description: 'Complete math curriculum from algebra to calculus',
      category: 'Mathematics',
      featured: false,
      isNew: true
    },
    {
      id: 3,
      name: 'History Explorer',
      price: '$24.99',
      originalPrice: '$44.99',
      rating: 4.7,
      downloads: '6.8K',
      icon: '🏛️',
      description: 'Interactive world history with AI storytelling',
      category: 'History',
      featured: true,
      isNew: false
    }
  ],
  'Tutoring': [
    {
      id: 4,
      name: 'AI Math Tutor',
      price: '$14.99',
      originalPrice: '$24.99',
      rating: 4.9,
      downloads: '15.3K',
      icon: '🤖',
      description: 'Personal AI tutor for all math levels',
      category: 'Offline AI Tutoring',
      featured: true,
      isNew: false
    },
    {
      id: 5,
      name: 'Language Learning Pro',
      price: '$18.99',
      originalPrice: '$28.99',
      rating: 4.6,
      downloads: '9.7K',
      icon: '🌍',
      description: 'Learn 12 languages with AI conversation practice',
      category: 'Languages',
      featured: false,
      isNew: true
    },
    {
      id: 6,
      name: 'Coding Mentor',
      price: '$22.99',
      originalPrice: '$32.99',
      rating: 4.8,
      downloads: '11.2K',
      icon: '💻',
      description: 'AI-powered coding lessons and projects',
      category: 'Programming',
      featured: true,
      isNew: false
    }
  ],
  'Games': [
    {
      id: 7,
      name: 'EduQuest Adventure',
      price: '$9.99',
      originalPrice: '$19.99',
      rating: 4.5,
      downloads: '25.1K',
      icon: '🎮',
      description: 'Educational RPG with quests and challenges',
      category: 'Educational Games',
      featured: true,
      isNew: false
    },
    {
      id: 8,
      name: 'Quiz Master Pro',
      price: '$7.99',
      originalPrice: '$14.99',
      rating: 4.7,
      downloads: '18.6K',
      icon: '🧠',
      description: 'Interactive quiz games for all subjects',
      category: 'Quiz Games',
      featured: false,
      isNew: true
    },
    {
      id: 9,
      name: 'Science Simulator',
      price: '$12.99',
      originalPrice: '$22.99',
      rating: 4.8,
      downloads: '7.4K',
      icon: '🔬',
      description: 'Virtual lab experiments and simulations',
      category: 'Simulation',
      featured: true,
      isNew: false
    }
  ],
  'Well-Being': [
    {
      id: 10,
      name: 'Mindful Learning',
      price: '$11.99',
      originalPrice: '$21.99',
      rating: 4.9,
      downloads: '13.8K',
      icon: '🧘',
      description: 'Meditation and mindfulness for better focus',
      category: 'Mindfulness',
      featured: true,
      isNew: false
    },
    {
      id: 11,
      name: 'Study Breaks',
      price: '$6.99',
      originalPrice: '$12.99',
      rating: 4.4,
      downloads: '16.2K',
      icon: '⏰',
      description: 'Smart break reminders and relaxation exercises',
      category: 'Productivity',
      featured: false,
      isNew: true
    },
    {
      id: 12,
      name: 'Sleep & Study',
      price: '$8.99',
      originalPrice: '$16.99',
      rating: 4.6,
      downloads: '9.1K',
      icon: '😴',
      description: 'Optimize sleep patterns for better learning',
      category: 'Health',
      featured: true,
      isNew: false
    }
  ],
  'Opportunities': [
    {
      id: 13,
      name: 'Scholarship Finder',
      price: 'Free',
      originalPrice: null,
      rating: 4.8,
      downloads: '22.7K',
      icon: '🎓',
      description: 'Find scholarships and educational opportunities',
      category: 'Scholarships',
      featured: true,
      isNew: false
    },
    {
      id: 14,
      name: 'Career Path Guide',
      price: '$15.99',
      originalPrice: '$25.99',
      rating: 4.7,
      downloads: '14.3K',
      icon: '💼',
      description: 'AI-powered career guidance and planning',
      category: 'Career',
      featured: true,
      isNew: false
    },
    {
      id: 15,
      name: 'Internship Tracker',
      price: '$9.99',
      originalPrice: '$18.99',
      rating: 4.5,
      downloads: '8.9K',
      icon: '📋',
      description: 'Track and apply to internships worldwide',
      category: 'Internships',
      featured: false,
      isNew: true
    }
  ]
};

const categories = Object.keys(appData);

export default function LearnStore() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const allApps = Object.values(appData).flat();
  const filteredApps = selectedCategory === 'All' 
    ? allApps 
    : appData[selectedCategory] || [];

  const searchFilteredApps = filteredApps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedApps = [...searchFilteredApps].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case 'price-high':
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return parseFloat(b.downloads.replace('K', '')) - parseFloat(a.downloads.replace('K', ''));
      default:
        return b.downloads.localeCompare(a.downloads);
    }
  });

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="brutalist-header">
        <div className="header-content">
          <button 
            onClick={() => router.push('/')} 
            className="brutalist-back-btn"
          >
            <div className="back-icon">←</div>
            <span>Back to Dashboard</span>
          </button>
          <h1 className="header-title">Learn Store</h1>
          <div className="header-spacer"></div>
        </div>
      </div>

      {/* Banner */}
      <Banner />

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="brutalist-search-container">
          <div className="search-filters-wrapper">
            {/* Search */}
            <div className="search-input-container">
              <div className="search-icon">🔍</div>
              <input
                type="text"
                placeholder="Search apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="brutalist-search-input"
              />
            </div>
            
            {/* Sort */}
            <div className="sort-container">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="brutalist-select"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="downloads">Most Downloaded</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="category-navigation">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`brutalist-category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
          >
            All Apps
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`brutalist-category-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedApps.map((app) => (
            <div key={app.id} className="group relative">
              <div className="brutalist-app-card">
                {/* Featured Badge */}
                {app.featured && (
                  <div className="featured-badge">
                    ⭐ FEATURED
                  </div>
                )}
                
                {/* New Badge */}
                {app.isNew && (
                  <div className="new-badge">
                    🆕 NEW
                  </div>
                )}
                
                {/* App Icon */}
                <div className="app-icon-container">
                  <div className="app-icon">
                    {app.icon}
                  </div>
                </div>
                
                {/* App Info */}
                <div className="app-info">
                  <h3 className="app-title">{app.name}</h3>
                  <p className="app-category">{app.category}</p>
                  <div className="app-rating">
                    <span className="star">★</span>
                    <span className="rating">{app.rating}</span>
                    <span className="downloads">({app.downloads})</span>
                  </div>
                </div>

                {/* App Description */}
                <div className="app-description">
                  <p>{app.description}</p>
                </div>
                
                {/* Price and Button */}
                <div className="app-footer">
                  <div className="price-container">
                    <div className="price-info">
                      <span className="price">{app.price}</span>
                      <span className="price-period">/month</span>
                    </div>
                    {app.originalPrice && (
                      <span className="original-price">{app.originalPrice}/month</span>
                    )}
                  </div>
                  <button className="buy-button">
                    {app.price === 'Free' ? 'Get' : 'Buy'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedApps.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No apps found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .brutalist-header {
          background-color: #1a1a1a;
          border-bottom: 3px solid #3b82f6;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brutalist-back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px 12px 24px;
          background-color: #2a2a2a;
          border: 2px solid #4a5568;
          border-radius: 0 8px 8px 0;
          color: #ffffff;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
          margin-left: 0;
        }

        .brutalist-back-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: left 0.6s;
        }

        .brutalist-back-btn:hover::before {
          left: 100%;
        }

        .brutalist-back-btn:hover {
          background-color: #3a3a3a;
          border-color: #60a5fa;
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
        }

        .brutalist-back-btn:active {
          transform: translate(0, 0);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .back-icon {
          font-size: 18px;
          font-weight: bold;
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .brutalist-back-btn:hover .back-icon {
          transform: translateX(-2px);
        }

        .header-title {
          font-size: 28px;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
          flex: 1;
          margin: 0 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: 1px;
        }

        .header-spacer {
          width: 140px;
        }

        .brutalist-search-container {
          background-color: #1a1a1a;
          border: 3px solid #3b82f6;
          border-radius: 12px;
          box-shadow: 4px 4px 1px #000000;
          padding: 20px;
          margin-bottom: 24px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .brutalist-search-container:hover {
          background-color: #2a2a2a;
          border-color: #60a5fa;
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 1px #000000, 10px 10px 20px rgba(59, 130, 246, 0.2);
        }

        .search-filters-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .search-filters-wrapper {
            flex-direction: row;
            gap: 20px;
          }
        }

        .search-input-container {
          position: relative;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 16px;
          color: #a0a0a0;
          z-index: 2;
        }

        .brutalist-search-input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          background-color: #2a2a2a;
          border: 2px solid #4a5568;
          border-radius: 8px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .brutalist-search-input:focus {
          outline: none;
          border-color: #60a5fa;
          background-color: #3a3a3a;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2), 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .brutalist-search-input::placeholder {
          color: #a0a0a0;
        }

        .sort-container {
          min-width: 200px;
        }

        .brutalist-select {
          width: 100%;
          padding: 12px 16px;
          background-color: #2a2a2a;
          border: 2px solid #4a5568;
          border-radius: 8px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a0a0a0' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 12px center;
          background-repeat: no-repeat;
          background-size: 16px;
          padding-right: 40px;
        }

        .brutalist-select:focus {
          outline: none;
          border-color: #60a5fa;
          background-color: #3a3a3a;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2), 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .brutalist-select option {
          background-color: #2a2a2a;
          color: #ffffff;
          padding: 8px;
        }

        .category-navigation {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }

        .brutalist-category-btn {
          padding: 12px 20px;
          background-color: #1a1a1a;
          border: 2px solid #4a5568;
          border-radius: 8px;
          color: #a0a0a0;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .brutalist-category-btn:hover {
          background-color: #2a2a2a;
          border-color: #60a5fa;
          color: #ffffff;
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
        }

        .brutalist-category-btn.active {
          background-color: #3b82f6;
          border-color: #60a5fa;
          color: #ffffff;
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 8px rgba(59, 130, 246, 0.4);
        }

        .brutalist-category-btn:active {
          transform: translate(0, 0);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .brutalist-app-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 280px;
          color: #e5dede;
          font-weight: bold;
          text-decoration: none;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          background-color: #1a1a1a;
          border: 3px solid #3b82f6;
          border-radius: 12px;
          box-shadow: 4px 4px 1px #000000;
          padding: 20px;
        }

        .brutalist-app-card:hover {
          background-color: #2a2a2a;
          border-color: #60a5fa;
          transform: translate(-6px, -6px) rotate(1deg);
          box-shadow: 10px 10px 0 #000000, 15px 15px 20px rgba(59, 130, 246, 0.2);
        }

        .brutalist-app-card::before,
        .brutalist-app-card::after {
          content: "";
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: 0.6s;
        }

        .brutalist-app-card::before {
          left: -100%;
        }
        .brutalist-app-card::after {
          left: 100%;
        }

        .brutalist-app-card:hover::before {
          animation: swipeRight 1.5s infinite;
        }
        .brutalist-app-card:hover::after {
          animation: swipeLeft 1.5s infinite;
        }

        @keyframes swipeRight {
          100% {
            transform: translateX(200%) skew(-45deg);
          }
        }

        @keyframes swipeLeft {
          100% {
            transform: translateX(-200%) skew(-45deg);
          }
        }

        .featured-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          color: #000;
          font-size: 10px;
          font-weight: bold;
          padding: 4px 8px;
          border-radius: 12px;
          z-index: 10;
          animation: pulse 2s infinite;
        }

        .new-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: linear-gradient(45deg, #10b981, #34d399);
          color: #ffffff;
          font-size: 10px;
          font-weight: bold;
          padding: 4px 8px;
          border-radius: 12px;
          z-index: 10;
          animation: bounce 2s infinite;
          box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-4px);
          }
          60% {
            transform: translateY(-2px);
          }
        }

        .app-icon-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          z-index: 3;
          margin-bottom: 12px;
        }

        .app-icon {
          font-size: 48px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .brutalist-app-card:hover .app-icon-container {
          transform: translateY(-8px);
        }

        .brutalist-app-card:hover .app-icon {
          font-size: 56px;
          animation: spin-and-zoom 4s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
        }

        @keyframes spin-and-zoom {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        .app-info {
          text-align: center;
          margin-bottom: 12px;
          z-index: 3;
        }

        .app-title {
          font-size: 16px;
          font-weight: bold;
          color: #ffffff;
          margin: 0 0 4px 0;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .brutalist-app-card:hover .app-title {
          color: #60a5fa;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .app-category {
          font-size: 12px;
          color: #a0a0a0;
          margin: 0 0 8px 0;
          font-weight: normal;
        }

        .app-rating {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-size: 12px;
        }

        .star {
          color: #ffd700;
          animation: pulse 2s infinite;
        }

        .rating {
          color: #ffffff;
          font-weight: bold;
        }

        .downloads {
          color: #a0a0a0;
        }

        .app-description {
          text-align: center;
          margin-bottom: 16px;
          z-index: 3;
          flex-grow: 1;
        }

        .app-description p {
          font-size: 11px;
          color: #d0d0d0;
          margin: 0;
          line-height: 1.4;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .brutalist-app-card:hover .app-description p {
          color: #ffffff;
        }

        .app-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          z-index: 3;
        }

        .price-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
        }

        .price-info {
          display: flex;
          align-items: baseline;
          gap: 2px;
        }

        .price {
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .price-period {
          font-size: 12px;
          color: #a0a0a0;
          font-weight: normal;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .brutalist-app-card:hover .price {
          color: #4ade80;
        }

        .brutalist-app-card:hover .price-period {
          color: #d0d0d0;
        }

        .original-price {
          font-size: 12px;
          color: #a0a0a0;
          text-decoration: line-through;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .brutalist-app-card:hover .original-price {
          color: #ef4444;
        }

        .buy-button {
          background: linear-gradient(45deg, #3b82f6, #1d4ed8);
          color: #ffffff;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .buy-button:hover {
          background: linear-gradient(45deg, #1d4ed8, #1e40af);
          transform: scale(1.05);
          box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
        }

        .buy-button:active {
          transform: scale(0.95);
        }

        .brutalist-app-card:active .app-icon,
        .brutalist-app-card:active .app-title,
        .brutalist-app-card:active .buy-button {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
}