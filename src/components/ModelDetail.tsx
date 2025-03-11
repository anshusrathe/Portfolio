
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Download, FileSpreadsheet, Share2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ModelDetailProps {
  model: {
    id: number;
    title: string;
    publishDate: string;
    author: string;
    difficulty: string;
    description: string;
    features: string[];
    imageUrl: string;
  };
}

const ModelDetail = ({ model }: ModelDetailProps) => {
  // Format the date
  const formattedDate = new Date(model.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Difficulty badge
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

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <div className="mb-6">
          <Link 
            to="/models" 
            className="inline-flex items-center text-finance-accent hover:text-finance-blue-light transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Models
          </Link>
        </div>
        
        {/* Model header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8 animate-slide-up">
          <div className="h-64 relative">
            <img 
              src={model.imageUrl} 
              alt={model.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <div className="flex items-center space-x-2 mb-3">
                {getDifficultyBadge(model.difficulty)}
                <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                  Excel Model
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                {model.title}
              </h1>
              <div className="flex flex-wrap items-center text-white/80 text-sm gap-y-2 gap-x-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-white/60" />
                  {formattedDate}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-white/60" />
                  {model.author}
                </div>
                <div className="flex items-center">
                  <FileSpreadsheet className="h-4 w-4 mr-2 text-white/60" />
                  Financial Model
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-finance-blue mb-2">Overview</h2>
                <p className="text-gray-600">
                  {model.description}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="text-gray-600">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button 
                  size="sm" 
                  className="bg-finance-accent hover:bg-finance-blue-light text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Model
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Model features */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 animate-slide-up">
          <h2 className="text-xl font-semibold text-finance-blue mb-4">Key Features</h2>
          <ul className="space-y-3 text-gray-700">
            {model.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 bg-finance-accent/10 rounded-full flex items-center justify-center mt-0.5 mr-3">
                  <div className="w-2 h-2 rounded-full bg-finance-accent"></div>
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Excel preview placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 animate-slide-up">
          <h2 className="text-xl font-semibold text-finance-blue mb-4">Model Preview</h2>
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Excel spreadsheet would be embedded here</p>
              <Button className="mt-4 bg-finance-blue hover:bg-finance-blue-light text-white">
                <Download className="h-4 w-4 mr-2" />
                Download to Preview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetail;
