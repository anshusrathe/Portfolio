
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Download, FileSpreadsheet, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample financial models data
const financialModels = [
  {
    id: 1,
    title: 'Discounted Cash Flow (DCF) Model',
    description: 'A comprehensive DCF model for equity valuation with flexible assumptions and sensitivity analysis.',
    publishDate: '2023-05-22',
    difficulty: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1579170053380-58064b2dee67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 2,
    title: 'Startup Valuation Model',
    description: 'Tailored for early-stage companies with limited operating history and high growth potential.',
    publishDate: '2023-04-15',
    difficulty: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 3,
    title: 'LBO (Leveraged Buyout) Model',
    description: 'A detailed LBO model for analyzing private equity transactions and potential returns.',
    publishDate: '2023-03-10',
    difficulty: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1554260570-9140fd3b7614?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 4,
    title: 'SaaS Company Valuation Model',
    description: 'Specialized model for subscription-based software companies with recurring revenue metrics.',
    publishDate: '2023-02-28',
    difficulty: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1609921141835-710b7fa6e438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 5,
    title: 'Real Estate Investment Model',
    description: 'Comprehensive model for analyzing real estate investments with cash flow projections.',
    publishDate: '2023-01-15',
    difficulty: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 6,
    title: 'Merger & Acquisition (M&A) Model',
    description: 'Detailed financial model for M&A transactions with accretion/dilution analysis.',
    publishDate: '2022-12-10',
    difficulty: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1621264448670-812a3b1ad617?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
];

// Difficulty badge color mapping
const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Beginner</Badge>;
    case 'Intermediate':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Intermediate</Badge>;
    case 'Advanced':
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Advanced</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const ModelCards = () => {
  return (
    <section className="py-16 bg-finance-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-finance-blue mb-2">Financial Valuation Models</h2>
            <p className="text-gray-600">Excel-based frameworks to evaluate companies and assets</p>
          </div>
          <Link to="/models" className="mt-4 md:mt-0 flex items-center text-finance-accent hover:text-finance-blue-light transition-colors">
            Browse all models <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {financialModels.map((model) => (
            <div 
              key={model.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={model.imageUrl} 
                  alt={model.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-finance-blue/50 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4">
                  {getDifficultyBadge(model.difficulty)}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-finance-blue mb-2 line-clamp-1">
                  {model.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {model.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FileSpreadsheet className="h-4 w-4 mr-1 text-finance-accent" />
                    Excel Template
                  </div>
                  <div>
                    {new Date(model.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button asChild variant="outline" className="flex-1 text-finance-blue border-finance-blue hover:bg-finance-blue/5">
                    <Link to={`/models/${model.id}`}>
                      <Info className="h-4 w-4 mr-2" />
                      Details
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 bg-finance-accent hover:bg-finance-blue-light text-white">
                    <Link to={`/models/${model.id}`}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild className="bg-finance-blue hover:bg-finance-blue-light text-white px-8">
            <Link to="/models">
              View More Models
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ModelCards;
