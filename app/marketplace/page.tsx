'use client';

import { useState } from 'react';

interface App {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  rating: number;
  downloads: string;
  icon: string;
  featured: boolean;
}

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const apps: App[] = [
    {
      id: 'emotional-guide',
      name: 'Emotionele Begeleider',
      description: 'AI-powered emotional support and guidance for students',
      category: 'wellness',
      price: 'Free',
      rating: 4.8,
      downloads: '2.3k',
      icon: '🧠',
      featured: true
    },
    {
      id: 'career-guide',
      name: 'Studieloopbaan Begeleider',
      description: 'Career guidance and study path recommendations',
      category: 'career',
      price: 'Free',
      rating: 4.9,
      downloads: '1.8k',
      icon: '🎯',
      featured: true
    },
    {
      id: 'math-tutor',
      name: 'AI Math Tutor',
      description: 'Personalized mathematics learning with AI assistance',
      category: 'academic',
      price: '€9.99',
      rating: 4.7,
      downloads: '5.2k',
      icon: '📐',
      featured: false
    },
    {
      id: 'language-learning',
      name: 'Language Master',
      description: 'Interactive language learning with speech recognition',
      category: 'language',
      price: '€14.99',
      rating: 4.6,
      downloads: '3.1k',
      icon: '🗣️',
      featured: false
    },
    {
      id: 'science-lab',
      name: 'Virtual Science Lab',
      description: '3D virtual laboratory for science experiments',
      category: 'science',
      price: '€19.99',
      rating: 4.5,
      downloads: '2.7k',
      icon: '🧪',
      featured: false
    },
    {
      id: 'history-timeline',
      name: 'History Explorer',
      description: 'Interactive historical timelines and events',
      category: 'history',
      price: '€7.99',
      rating: 4.4,
      downloads: '1.9k',
      icon: '📚',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Apps', count: apps.length },
    { id: 'wellness', name: 'Wellness', count: apps.filter(app => app.category === 'wellness').length },
    { id: 'career', name: 'Career', count: apps.filter(app => app.category === 'career').length },
    { id: 'academic', name: 'Academic', count: apps.filter(app => app.category === 'academic').length },
    { id: 'language', name: 'Language', count: apps.filter(app => app.category === 'language').length },
    { id: 'science', name: 'Science', count: apps.filter(app => app.category === 'science').length },
    { id: 'history', name: 'History', count: apps.filter(app => app.category === 'history').length }
  ];

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredApps = apps.filter(app => app.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Stellar Education</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Language:</span>
                <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                  <option value="nl">🇳🇱 Nederlands</option>
                  <option value="en">🇬🇧 English</option>
                </select>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">DU</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <nav className="space-y-2 mb-8">
              <a href="/marketplace" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg bg-blue-50 text-blue-700 border-r-2 border-blue-700">
                <span className="mr-3 text-lg">🛒</span>
                Marketplace
              </a>
              <a href="/my-apps" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <span className="mr-3 text-lg">📱</span>
                My Apps
              </a>
            </nav>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search apps..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>

            {/* Featured Apps */}
            {selectedCategory === 'all' && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Featured Apps</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredApps.map((app) => (
                    <div key={app.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="text-4xl mr-4">{app.icon}</div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                            <p className="text-gray-600 text-sm">{app.description}</p>
                            <div className="flex items-center mt-2">
                              <div className="flex items-center">
                                <span className="text-yellow-400">⭐</span>
                                <span className="ml-1 text-sm text-gray-600">{app.rating}</span>
                              </div>
                              <span className="ml-4 text-sm text-gray-500">{app.downloads} downloads</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">{app.price}</div>
                          <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                            Install
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Apps */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {selectedCategory === 'all' ? 'All Apps' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApps.map((app) => (
                  <div key={app.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-3">{app.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                        <div className="flex items-center">
                          <span className="text-yellow-400">⭐</span>
                          <span className="ml-1 text-sm text-gray-600">{app.rating}</span>
                          <span className="ml-2 text-sm text-gray-500">({app.downloads})</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{app.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-gray-900">{app.price}</div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        {app.price === 'Free' ? 'Install' : 'Buy'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
