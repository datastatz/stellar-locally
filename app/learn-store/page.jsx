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
      price: 'Free',
      originalPrice: null,
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
      price: 'Free',
      originalPrice: null,
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
      price: '€1.99',
      originalPrice: '€4.99',
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
      price: 'Free',
      originalPrice: null,
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
      price: '€2.49',
      originalPrice: '€4.99',
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
      price: 'Free',
      originalPrice: null,
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
      price: 'Free',
      originalPrice: null,
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
      price: '€1.99',
      originalPrice: '€3.99',
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
      price: '€2.99',
      originalPrice: '€5.99',
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
      price: 'Free',
      originalPrice: null,
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
      price: 'Free',
      originalPrice: null,
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
      price: '€1.49',
      originalPrice: '€2.99',
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
      price: '€2.99',
      originalPrice: '€4.99',
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
      price: 'Free',
      originalPrice: null,
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
        const priceA = a.price === 'Free' ? 0 : parseFloat(a.price.replace('€', ''));
        const priceB = b.price === 'Free' ? 0 : parseFloat(b.price.replace('€', ''));
        return priceA - priceB;
      case 'price-high':
        const priceAHigh = a.price === 'Free' ? 0 : parseFloat(a.price.replace('€', ''));
        const priceBHigh = b.price === 'Free' ? 0 : parseFloat(b.price.replace('€', ''));
        return priceBHigh - priceAHigh;
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return parseFloat(b.downloads.replace('K', '')) - parseFloat(a.downloads.replace('K', ''));
      default:
        return b.downloads.localeCompare(a.downloads);
    }
  });

  return (
    <div className="min-h-screen relative bg-white">
      {/* Grid Background */}
      <div className="fixed inset-0 z-0" style={{
        backgroundColor: "white",
        backgroundImage: `
          linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
          radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
        `,
        backgroundSize: "40px 40px, 40px 40px, 100% 100%",
      }}></div>
      
      {/* Header */}
      <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button 
              onClick={() => router.push('/')} 
              className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 transition-colors"
            >
              <div className="text-xl">←</div>
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-2xl font-bold text-slate-700">Learn Store</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <Banner />

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="search-container">
          <div className="search-filters-wrapper">
            {/* Search */}
            <div className="search-input-container">
              <div className="search-icon">🔍</div>
              <input
                type="text"
                placeholder="Search apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            {/* Sort */}
            <div className="sort-container">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select"
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
            className={`category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
          >
            All Apps
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedApps.map((app) => (
            <div key={app.id} className="group relative">
              <div className="app-card">
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
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No apps found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .search-container {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
          color: #64748b;
          z-index: 2;
        }

        .search-input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          background-color: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          color: #1f2937;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .sort-container {
          min-width: 200px;
        }

        .select {
          width: 100%;
          padding: 12px 16px;
          background-color: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          color: #1f2937;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 12px center;
          background-repeat: no-repeat;
          background-size: 16px;
          padding-right: 40px;
        }

        .select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .select option {
          background-color: #ffffff;
          color: #1f2937;
          padding: 8px;
        }

        .category-navigation {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }

        .category-btn {
          padding: 12px 20px;
          background-color: #f8fafc;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          color: #64748b;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .category-btn:hover {
          background-color: #e2e8f0;
          border-color: #94a3b8;
          color: #1f2937;
        }

        .category-btn.active {
          background-color: #3b82f6;
          border-color: #3b82f6;
          color: #ffffff;
        }

        .app-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 280px;
          color: #1f2937;
          font-weight: 500;
          text-decoration: none;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.2s ease;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }

        .app-card:hover {
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .featured-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
          color: #ffffff;
          font-size: 10px;
          font-weight: bold;
          padding: 4px 8px;
          border-radius: 12px;
          z-index: 10;
        }

        .new-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: linear-gradient(45deg, #10b981, #059669);
          color: #ffffff;
          font-size: 10px;
          font-weight: bold;
          padding: 4px 8px;
          border-radius: 12px;
          z-index: 10;
          box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
        }

        .app-icon-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          z-index: 3;
          margin-bottom: 12px;
        }

        .app-icon {
          font-size: 48px;
          transition: all 0.2s ease;
        }

        .app-card:hover .app-icon-container {
          transform: translateY(-4px);
        }

        .app-card:hover .app-icon {
          font-size: 52px;
        }

        .app-info {
          text-align: center;
          margin-bottom: 12px;
          z-index: 3;
        }

        .app-title {
          font-size: 16px;
          font-weight: bold;
          color: #1f2937;
          margin: 0 0 4px 0;
          transition: all 0.2s ease;
        }

        .app-card:hover .app-title {
          color: #3b82f6;
        }

        .app-category {
          font-size: 12px;
          color: #64748b;
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
          color: #fbbf24;
        }

        .rating {
          color: #1f2937;
          font-weight: bold;
        }

        .downloads {
          color: #64748b;
        }

        .app-description {
          text-align: center;
          margin-bottom: 16px;
          z-index: 3;
          flex-grow: 1;
        }

        .app-description p {
          font-size: 11px;
          color: #6b7280;
          margin: 0;
          line-height: 1.4;
          transition: all 0.2s ease;
        }

        .app-card:hover .app-description p {
          color: #374151;
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
          color: #1f2937;
          transition: all 0.2s ease;
        }

        .price-period {
          font-size: 12px;
          color: #64748b;
          font-weight: normal;
          transition: all 0.2s ease;
        }

        .app-card:hover .price {
          color: #059669;
        }

        .original-price {
          font-size: 12px;
          color: #9ca3af;
          text-decoration: line-through;
          transition: all 0.2s ease;
        }

        .app-card:hover .original-price {
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
          transition: all 0.2s ease;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .buy-button:hover {
          background: linear-gradient(45deg, #1d4ed8, #1e40af);
          transform: scale(1.05);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .buy-button:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
}