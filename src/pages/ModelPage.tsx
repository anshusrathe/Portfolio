
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Download, FileSpreadsheet, Share2, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ModelDetail from '@/components/ModelDetail';

// Sample models data
const models = [
  {
    id: "1",
    title: "Discounted Cash Flow (DCF) Model - Tech Companies",
    publishDate: "2023-07-10",
    author: "Michael Johnson",
    modelType: "Valuation Model",
    summary: "A comprehensive DCF model template for technology companies with built-in sensitivity analysis.",
    description: `
      <h2>Model Overview</h2>
      <p>This DCF valuation model is specifically designed for technology companies with high growth rates, R&D investments, and potentially irregular cash flow patterns. The model incorporates industry-specific metrics and provides a comprehensive approach to valuing technology businesses.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Detailed revenue buildup by product/service category</li>
        <li>R&D capitalization adjustment options</li>
        <li>Stock-based compensation handling</li>
        <li>Terminal value calculation with multiple methodologies</li>
        <li>Comprehensive sensitivity analysis</li>
        <li>Comparison to trading comparables</li>
      </ul>
      
      <h2>Model Structure</h2>
      <p>The model is organized into the following worksheet sections:</p>
      <ol>
        <li><strong>Instructions</strong> - Detailed guide on how to use the model</li>
        <li><strong>Input Sheet</strong> - Central location for all key assumptions</li>
        <li><strong>Historical Financials</strong> - Historical data entry and analysis</li>
        <li><strong>Projections</strong> - Detailed 5-year financial projections</li>
        <li><strong>DCF Valuation</strong> - Core DCF calculations and sensitivity tables</li>
        <li><strong>Comparables</strong> - Trading and transaction comparables</li>
        <li><strong>Charts</strong> - Visual representation of key metrics and outputs</li>
      </ol>
      
      <h2>Calculation Methodology</h2>
      <p>The model uses a two-stage DCF approach:</p>
      <ul>
        <li>Explicit forecast period of 5 years with detailed projections</li>
        <li>Terminal value based on perpetuity growth or exit multiple</li>
        <li>WACC calculation with industry-specific beta and capital structure</li>
        <li>Adjustments for non-operating assets and liabilities</li>
      </ul>
      
      <h2>Usage Instructions</h2>
      <p>To use this model effectively:</p>
      <ol>
        <li>Enter historical financial data for the subject company</li>
        <li>Review and adjust the key assumptions on the input sheet</li>
        <li>Analyze the projection drivers and modify as needed</li>
        <li>Review the DCF valuation outputs and sensitivity analysis</li>
        <li>Compare the results with trading comparables</li>
      </ol>
      
      <h2>Customization Options</h2>
      <p>This model can be customized for specific use cases by:</p>
      <ul>
        <li>Adjusting the projection period length</li>
        <li>Modifying the revenue and cost driver assumptions</li>
        <li>Changing the terminal value methodology</li>
        <li>Adding company-specific metrics and KPIs</li>
      </ul>
    `,
    screenshots: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ]
  },
  // You would add more models here in the same format
];

const ModelPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the model based on ID parameter
  const model = models.find(m => m.id === id);
  
  if (!model) {
    return (
      <div className="min-h-screen bg-finance-gray">
        <Header />
        <main className="container mx-auto px-4 md:px-6 py-12 mt-16">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Model Not Found</h1>
            <p className="text-gray-600 mb-6">The financial model you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/models">Back to Models</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-finance-gray animate-fade-in">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-12 mt-16">
        <div className="max-w-3xl mx-auto">
          {/* Back navigation */}
          <div className="mb-6">
            <Link 
              to="/models" 
              className="inline-flex items-center text-finance-blue hover:text-finance-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Models
            </Link>
          </div>
          
          {/* Model header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex flex-wrap gap-3 mb-3">
              <Badge>{model.modelType}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarDays className="h-4 w-4 mr-1.5" />
                {new Date(model.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-1.5" />
                {model.author}
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-finance-blue mb-3">
              {model.title}
            </h1>
            
            <p className="text-gray-600 mb-6">
              {model.summary}
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                className="bg-finance-accent hover:bg-finance-blue-light text-white"
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Download Excel
              </Button>
              
              <Button variant="ghost" className="text-gray-600">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          
          {/* Model content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <ModelDetail content={model.description} screenshots={model.screenshots} />
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

export default ModelPage;
