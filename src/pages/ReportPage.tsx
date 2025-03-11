
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Download, PresentationIcon, Share2, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import PresentationViewer from '@/components/PresentationViewer';
import ReportDetail from '@/components/ReportDetail';

// Sample reports data
const reports = [
  {
    id: "1",
    title: "Apple Inc. (AAPL) Valuation Analysis",
    publishDate: "2023-06-15",
    author: "John Smith",
    researchType: "Equity Research",
    summary: "A comprehensive valuation analysis of Apple Inc., examining growth drivers, risks, and fair value estimation.",
    content: `
      <h2>Executive Summary</h2>
      <p>Apple Inc. continues to demonstrate strong financial performance driven by its ecosystem of products and services. Our analysis suggests the company is well-positioned for continued growth in the medium term.</p>
      
      <h3>Key Investment Points</h3>
      <ul>
        <li>iPhone remains the core revenue driver with strong upgrade cycles</li>
        <li>Services segment growing at double-digit rates, improving margin profile</li>
        <li>Strong balance sheet with significant cash reserves</li>
        <li>Consistent shareholder returns through dividends and share repurchases</li>
      </ul>
      
      <h2>Financial Analysis</h2>
      <p>Apple reported $394.3 billion in revenue for FY2022, representing a 7.8% year-over-year increase. The company's gross margin expanded to 43.3%, driven by a more favorable product mix and growing high-margin services business.</p>
      
      <h3>Revenue Breakdown by Segment</h3>
      <ul>
        <li>iPhone: $205.5 billion (52.1% of total)</li>
        <li>Services: $78.1 billion (19.8% of total)</li>
        <li>Mac: $40.2 billion (10.2% of total)</li>
        <li>Wearables, Home & Accessories: $41.2 billion (10.4% of total)</li>
        <li>iPad: $29.3 billion (7.4% of total)</li>
      </ul>
      
      <h2>Valuation</h2>
      <p>Based on our DCF analysis and comparative valuation metrics, we establish a fair value estimate of $190 per share. This represents a potential upside of approximately 12% from current levels.</p>
      
      <h2>Risk Factors</h2>
      <ul>
        <li>Intense competition in all product categories</li>
        <li>Regulatory pressures, particularly related to App Store policies</li>
        <li>Supply chain dependencies and geopolitical tensions</li>
        <li>Potential market saturation for key products</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>We initiate coverage with a Buy rating and a $190 price target. Apple's ecosystem strength, loyal customer base, and growing services business provide multiple avenues for continued growth and shareholder value creation.</p>
    `,
    slides: [
      {
        title: "Apple Inc. (AAPL) Valuation Analysis",
        content: "Comprehensive equity research and valuation report",
        type: "title"
      },
      {
        title: "Executive Summary",
        content: "• Market leader in premium smartphones, wearables, and tablets\n• Expanding services ecosystem with high margins\n• Strong cash flow generation and shareholder returns\n• Initiating coverage with BUY rating and $190 price target",
        type: "content"
      },
      {
        title: "Financial Highlights",
        content: "• FY2022 Revenue: $394.3 billion (+7.8% YoY)\n• Gross Margin: 43.3% (+160 bps YoY)\n• Services Revenue: $78.1 billion (+19% YoY)\n• Cash & Equivalents: $48.3 billion\n• TTM Free Cash Flow: $111.4 billion",
        type: "content"
      },
      {
        title: "Revenue Breakdown",
        type: "chart",
        chartData: {
          labels: ["iPhone", "Services", "Mac", "Wearables & Home", "iPad"],
          values: [52.1, 19.8, 10.2, 10.4, 7.4]
        }
      },
      {
        title: "Valuation Methodology",
        content: "• DCF Analysis: WACC of 8.5%, terminal growth rate of 3%\n• Comparable Companies Analysis: Trading at 25x forward P/E\n• Precedent Transactions: Technology acquisitions\n• Implied Fair Value: $190 per share (12% upside)",
        type: "content"
      },
      {
        title: "Investment Thesis",
        content: "1. Ecosystem Lock-in Effect\n2. Services Growth Runway\n3. New Product Categories\n4. Capital Return Program\n5. AI Integration Opportunities",
        type: "content"
      },
      {
        title: "Risk Factors",
        content: "• Intense competition across product categories\n• Regulatory pressures and legal challenges\n• Supply chain disruptions and geopolitical risks\n• Slowing upgrade cycles in mature markets\n• Potential margin pressure from new product introductions",
        type: "content"
      },
      {
        title: "Contact Information",
        content: "For more information, please contact:\nresearch@valuationsearch.com\nwww.valuationsearch.com",
        type: "content"
      }
    ]
  },
  // You would add more reports here in the same format
];

const ReportPage = () => {
  const { id } = useParams<{ id: string }>();
  const [showPresentation, setShowPresentation] = useState(false);
  
  // Find the report based on ID parameter
  const report = reports.find(r => r.id === id);
  
  if (!report) {
    return (
      <div className="min-h-screen bg-finance-gray">
        <Header />
        <main className="container mx-auto px-4 md:px-6 py-12 mt-16">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Report Not Found</h1>
            <p className="text-gray-600 mb-6">The report you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/reports">Back to Reports</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-finance-gray animate-fade-in">
      <Header />
      
      {/* Presentation viewer overlay */}
      {showPresentation && (
        <PresentationViewer 
          slides={report.slides} 
          onClose={() => setShowPresentation(false)} 
        />
      )}
      
      <main className="container mx-auto px-4 md:px-6 py-12 mt-16">
        <div className="max-w-3xl mx-auto">
          {/* Back navigation */}
          <div className="mb-6">
            <Link 
              to="/reports" 
              className="inline-flex items-center text-finance-blue hover:text-finance-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Link>
          </div>
          
          {/* Report header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex flex-wrap gap-3 mb-3">
              <Badge>{report.researchType}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarDays className="h-4 w-4 mr-1.5" />
                {new Date(report.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-1.5" />
                {report.author}
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-finance-blue mb-3">
              {report.title}
            </h1>
            
            <p className="text-gray-600 mb-6">
              {report.summary}
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => setShowPresentation(true)}
                className="bg-finance-accent hover:bg-finance-blue-light text-white"
              >
                <PresentationIcon className="h-4 w-4 mr-2" />
                View PPT Version
              </Button>
              
              <Button variant="outline" className="text-finance-blue">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              
              <Button variant="ghost" className="text-gray-600">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          
          {/* Report content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <ReportDetail content={report.content} />
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

export default ReportPage;
