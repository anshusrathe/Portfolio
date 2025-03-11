
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ReportsTable from '@/components/ReportsTable';
import ModelCards from '@/components/ModelCards';

const Index = () => {
  return (
    <div className="min-h-screen bg-white animate-fade-in">
      <Header />
      <main>
        <Hero />
        <ReportsTable />
        <ModelCards />
      </main>
      <footer className="bg-finance-blue text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative w-8 h-8 flex items-center justify-center bg-white rounded-md">
                  <span className="text-finance-blue font-bold text-sm">VS</span>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-finance-accent rounded-full"></div>
                </div>
                <span className="text-white font-bold text-lg">ValuationSearch</span>
              </div>
              <p className="text-white/80 mb-4 max-w-md">
                Providing high-quality financial research, valuation models, and equity analysis for 
                investors and financial professionals.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-white">Twitter</a>
                <a href="#" className="text-white/70 hover:text-white">LinkedIn</a>
                <a href="#" className="text-white/70 hover:text-white">Email</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Research</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white">Equity Reports</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Sector Analysis</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Market Outlook</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Valuation Reports</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Models</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white">DCF Models</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">LBO Models</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">M&A Models</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Real Estate Models</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-white/20 text-sm text-white/60">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© {new Date().getFullYear()} ValuationSearch. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Service</a>
                <a href="#" className="hover:text-white">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
