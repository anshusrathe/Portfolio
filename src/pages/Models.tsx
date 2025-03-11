import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronDown, Download, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import BackToHome from '@/components/BackToHome';
import { listModels, ModelFrontmatter } from '@/utils/markdown';

// Model type badge color mapping
const getBadgeVariant = (type: string) => {
  switch (type) {
    case 'Valuation Model':
      return 'default';
    case 'LBO Model':
      return 'secondary';
    case 'Financial Model':
      return 'outline';
    case 'M&A Model':
      return 'destructive';
    case 'Real Estate Model':
      return 'secondary';
    default:
      return 'default';
  }
};

const Models = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [models, setModels] = useState<ModelFrontmatter[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load models from markdown
  useEffect(() => {
    async function loadModels() {
      try {
        const modelsList = await listModels();
        setModels(modelsList as ModelFrontmatter[]);
      } catch (error) {
        console.error("Error loading models:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadModels();
  }, []);
  
  // Filter models based on search query and filter type
  const filteredModels = models.filter(model => {
    const matchesSearch = model.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          model.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || model.modelType === filterType;
    
    return matchesSearch && matchesType;
  });
  
  // Get unique model types for filter
  const modelTypes = ['All', ...Array.from(new Set(models.map(model => model.modelType)))];

  return (
    <div className="min-h-screen bg-finance-gray animate-fade-in">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-12 mt-16">
        <div className="max-w-5xl mx-auto">
          <BackToHome />
          
          <h1 className="text-3xl md:text-4xl font-bold text-finance-blue mb-2">
            Financial Models
          </h1>
          <p className="text-gray-600 mb-8">
            Excel-based valuation and financial models for various sectors and use cases
          </p>
          
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search models..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative inline-block w-full md:w-64">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-200 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-finance-accent focus:border-finance-accent"
                >
                  {modelTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Models grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <CalendarDays className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading models...</h3>
              </div>
            ) : filteredModels.length > 0 ? (
              filteredModels.map(model => (
                <div 
                  key={model.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md animate-scale-in"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <Badge variant={getBadgeVariant(model.modelType) as any}>
                      {model.modelType}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarDays className="h-4 w-4 mr-1.5" />
                      {new Date(model.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/models/${model.id}`}
                    className="block group"
                  >
                    <h2 className="text-xl font-semibold text-finance-blue mb-2 group-hover:text-finance-accent transition-colors">
                      {model.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 mb-4">
                    {model.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline" size="sm" className="text-finance-blue">
                      <Link to={`/models/${model.id}`}>
                        View Model Details
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <Download className="h-4 w-4 mr-2" />
                      Download Excel
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarDays className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No models found</h3>
                <p className="text-gray-600 mb-4">
                  No models match your current search criteria. Try adjusting your filters.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setFilterType('All');
                  }}
                  className="bg-finance-accent hover:bg-finance-blue-light text-white"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-finance-blue text-white py-8 mt-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-white/80 mb-2">
            © {new Date().getFullYear()} ValuationSearch. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-white/70 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-white/70 hover:text-white">Terms of Service</a>
            <a href="#" className="text-white/70 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Models;
