
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
    default:
      return 'default';
  }
};

const ReportsTable = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-finance-blue mb-2">Latest Research Reports</h2>
            <p className="text-gray-600">Explore our most recent financial analysis and research</p>
          </div>
          <Link to="/reports" className="mt-4 md:mt-0 flex items-center text-finance-accent hover:text-finance-blue-light transition-colors">
            View all reports <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white animate-fade-in">
          <table className="finance-table w-full min-w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-finance-blue">Report Title</th>
                <th className="px-6 py-3 text-finance-blue">Publish Date</th>
                <th className="px-6 py-3 text-finance-blue">Research Type</th>
                <th className="px-6 py-3 text-finance-blue">Summary</th>
                <th className="px-6 py-3 text-finance-blue sr-only">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleReports.map((report) => (
                <tr 
                  key={report.id} 
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <Link 
                      to={`/reports/${report.id}`} 
                      className="font-medium text-finance-blue hover:text-finance-accent transition-colors"
                    >
                      {report.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(report.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getBadgeVariant(report.researchType) as any}>
                      {report.researchType}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-md">
                    <p className="truncate" title={report.summary}>
                      {report.summary}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" asChild size="sm">
                      <Link to={`/reports/${report.id}`}>
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View report</span>
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 text-center">
          <Button asChild className="bg-finance-blue hover:bg-finance-blue-light text-white px-8">
            <Link to="/reports">
              View More Reports
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReportsTable;
