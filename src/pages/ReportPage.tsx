import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Download, PresentationIcon, Share2, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import BackToHome from '@/components/BackToHome';
import PresentationViewer from '@/components/PresentationViewer';
import ReportDetail from '@/components/ReportDetail';
import { getReportById } from '@/utils/markdown';

const ReportPage = () => {
  const { id } = useParams<{ id: string }>();
  const [showPresentation, setShowPresentation] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function loadReport() {
      if (!id) {
        setError("Report ID is missing");
        setLoading(false);
        return;
      }
      
      try {
        const reportData = await getReportById(id);
        if (!reportData) {
          setError("Report not found");
        } else {
          setReport(reportData);
        }
      } catch (err) {
        console.error("Error loading report:", err);
        setError("Failed to load report");
      } finally {
        setLoading(false);
      }
    }
    
    loadReport();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-finance-gray">
        <Header />
        <main className="container mx-auto px-4 md:px-6 py-12 mt-16">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-6"></div>
              <div className="h-32 bg-gray-200 rounded mb-6"></div>
            </div>
            <p className="text-gray-600">Loading report...</p>
          </div>
        </main>
      </div>
    );
  }
  
  if (error || !report) {
    return (
      <div className="min-h-screen bg-finance-gray">
        <Header />
        <main className="container mx-auto px-4 md:px-6 py-12 mt-16">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Report Not Found</h1>
            <p className="text-gray-600 mb-6">{error || "The report you're looking for doesn't exist or has been removed."}</p>
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
          isOpen={showPresentation}
        />
      )}
      
      <main className="container mx-auto px-4 md:px-6 py-12 mt-16">
        <div className="max-w-3xl mx-auto">
          {/* Back navigation */}
          <div className="flex space-x-4 mb-6">
            <BackToHome />
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
              {report.slides && report.slides.length > 0 && (
                <Button 
                  onClick={() => setShowPresentation(true)}
                  className="bg-finance-accent hover:bg-finance-blue-light text-white"
                >
                  <PresentationIcon className="h-4 w-4 mr-2" />
                  View PPT Version
                </Button>
              )}
              
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
