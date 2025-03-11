
import React from 'react';
import { ChevronRight, FileText, LineChart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 h-[70%] bg-gradient-to-br from-finance-gray via-white to-finance-gray-dark opacity-50 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-finance-accent opacity-5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-finance-blue opacity-5 rounded-full blur-2xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 mt-8 animate-slide-up">
          <div className="inline-block px-3 py-1 bg-finance-blue/10 text-finance-blue rounded-full text-sm font-medium mb-4">
            Premium Financial Intelligence
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-finance-blue mb-6 leading-tight">
            Expert Financial Analysis & Valuation Models
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Access in-depth financial research reports, comprehensive valuation models, 
            and equity research to make informed investment decisions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button className="bg-finance-blue hover:bg-finance-blue-light text-white px-6 py-6 rounded-lg">
              Explore Reports <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-finance-blue text-finance-blue hover:bg-finance-blue/10 px-6 py-6 rounded-lg">
              View Financial Models
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12 animate-fade-in">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
            <div className="w-12 h-12 bg-finance-accent/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-finance-accent" />
            </div>
            <h3 className="text-xl font-semibold text-finance-blue mb-2">Financial Research Reports</h3>
            <p className="text-gray-600">
              In-depth analysis of companies, sectors, and markets with actionable insights.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
            <div className="w-12 h-12 bg-finance-accent/10 rounded-lg flex items-center justify-center mb-4">
              <LineChart className="h-6 w-6 text-finance-accent" />
            </div>
            <h3 className="text-xl font-semibold text-finance-blue mb-2">Valuation Models</h3>
            <p className="text-gray-600">
              Excel-based financial models to evaluate companies and predict future performance.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
            <div className="w-12 h-12 bg-finance-accent/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-finance-accent" />
            </div>
            <h3 className="text-xl font-semibold text-finance-blue mb-2">Equity Research</h3>
            <p className="text-gray-600">
              Professional stock analysis with price targets and investment recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
