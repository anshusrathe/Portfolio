
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronDown, Download, FileText, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';

// Sample report data
const sampleReports = [
  {
    id: 1,
    title: 'Apple Inc. (AAPL) Valuation Analysis',
    publishDate: '2023-06-15',
    researchType: 'Equity Research',
    summary: 'A comprehensive valuation analysis of Apple Inc., examining growth drivers, risks, and fair value estimation.'
  },
  {
    id: 2,
    title: 'Renewable Energy Sector Outlook 2023',
    publishDate: '2023-05-22',
    researchType: 'Sector Analysis',
    summary: 'An in-depth analysis of the renewable energy sector, highlighting key trends, challenges, and investment opportunities.'
  },
  {
    id: 3,
    title: 'Microsoft Corporation (MSFT) Financial Analysis',
    publishDate: '2023-04-10',
    researchType: 'Equity Research',
    summary: 'Detailed financial analysis of Microsoft, focusing on cloud computing growth and strategic initiatives.'
  },
  {
    id: 4,
    title: 'Banking Sector: Interest Rate Impact Assessment',
    publishDate: '2023-03-28',
    researchType: 'Sector Analysis',
    summary: 'Analysis of how rising interest rates will impact the banking sector profitability and growth prospects.'
  },
  {
    id: 5,
    title: 'Tesla Inc. (TSLA) DCF Valuation',
    publishDate: '2023-02-15',
    researchType: 'Valuation Report',
    summary: 'A discounted cash flow valuation of Tesla, examining its growth potential in the electric vehicle market.'
  },
  {
    id: 6,
    title: 'Semiconductor Industry Supply Chain Analysis',
    publishDate: '2023-01-10',
    researchType: 'Sector Analysis',
    summary: 'Examination of global semiconductor supply chains, key players, and future outlook.'
  },
  {
    id: 7,
    title: 'Amazon.com Inc. (AMZN) Equity Research',
    publishDate: '2022-12-05',
    researchType: 'Equity Research',
    summary: 'In-depth analysis of Amazon\'s business segments, competitive advantages, and valuation.'
  },
  {
    id: 8,
    title: 'Cryptocurrency Market Analysis 2023',
    publishDate: '2022-11-20',
    researchType: 'Market Analysis',
    summary: 'Comprehensive analysis of cryptocurrency markets, regulatory landscape, and investment considerations.'
  },
  {
    id: 9,
    title: 'Healthcare Sector: Innovation and Investment Opportunities',
    publishDate: '2022-10-15',
    researchType: 'Sector Analysis',
    summary: 'Analysis of emerging technologies and investment opportunities in the healthcare sector.'
  },
  {
    id: 10,
    title: 'Netflix Inc. (NFLX) Competitive Analysis',
    publishDate: '2022-09-10',
    researchType: 'Equity Research',
    summary: 'Detailed examination of Netflix\'s business model, content strategy, and competitive landscape.'
  }
];

// Research type badge color mapping
const getBadgeVariant = (type: string) => {
  switch (type) {
    case 'Equity Research':
      return 'default';
    case 'Sector Analysis':
      return 'secondary';
    case 'Valuation Report':
      return 'outline';
    case 'Market Analysis':
      return 'destructive';
    default:
      return 'default';
  }
};

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  
  // Filter reports based on search query and filter type
  const filteredReports = sampleReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          report.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || report.researchType === filterType;
    
    return matchesSearch && matchesType;
  });
  
  // Get unique research types for filter
  const researchTypes = ['All', ...Array.from(new Set(sampleReports.map(report => report.researchType)))];

  return (
    <div className="min-h-screen bg-finance-gray animate-fade-in">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-12 mt-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-finance-blue mb-2">
            Research Reports
          </h1>
          <p className="text-gray-600 mb-8">
            Browse our collection of in-depth financial research reports
          </p>
          
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search reports..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative inline-block w-full md:w-64">
                <div className="relative">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="block appearance-none w-full bg-white border border-gray-200 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-finance-accent focus:border-finance-accent"
                  >
                    {researchTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reports list */}
          <div className="space-y-4">
            {filteredReports.length > 0 ? (
              filteredReports.map(report => (
                <div 
                  key={report.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md animate-scale-in"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                    <Badge variant={getBadgeVariant(report.researchType) as any}>
                      {report.researchType}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarDays className="h-4 w-4 mr-1.5" />
                      {new Date(report.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/reports/${report.id}`}
                    className="block group"
                  >
                    <h2 className="text-xl font-semibold text-finance-blue mb-2 group-hover:text-finance-accent transition-colors">
                      {report.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 mb-4">
                    {report.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline" size="sm" className="text-finance-blue">
                      <Link to={`/reports/${report.id}`}>
                        <FileText className="h-4 w-4 mr-2" />
                        Read Report
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm" className="text-gray-600">
                      <Link to={`/reports/${report.id}`}>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No reports found</h3>
                <p className="text-gray-600 mb-4">
                  No reports match your current search criteria. Try adjusting your filters.
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

export default Reports;
