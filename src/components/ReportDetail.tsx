
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Download, Eye, FileText, Share2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PresentationViewer from './PresentationViewer';

interface ReportDetailProps {
  report: {
    id: number;
    title: string;
    publishDate: string;
    author: string;
    researchType: string;
    content: string;
    slides: {
      id: number;
      title: string;
      content: string;
      imageUrl?: string;
    }[];
  };
}

const ReportDetail = ({ report }: ReportDetailProps) => {
  const [presentationOpen, setPresentationOpen] = useState(false);

  const openPresentation = () => {
    setPresentationOpen(true);
  };

  const closePresentation = () => {
    setPresentationOpen(false);
  };

  // Format the date
  const formattedDate = new Date(report.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <div className="mb-6">
          <Link 
            to="/reports" 
            className="inline-flex items-center text-finance-accent hover:text-finance-blue-light transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reports
          </Link>
        </div>
        
        {/* Report header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 animate-slide-up">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <Badge variant="outline" className="bg-finance-accent/10 text-finance-accent border-finance-accent/20">
              {report.researchType}
            </Badge>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="text-gray-600">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button 
                onClick={openPresentation}
                size="sm" 
                className="bg-finance-blue hover:bg-finance-blue-light text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                View PPT Version
              </Button>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-finance-blue mb-4">
            {report.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-600 text-sm gap-y-2 gap-x-6 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-gray-400" />
              {report.author}
            </div>
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2 text-gray-400" />
              Research Report
            </div>
          </div>
          
          {/* Report content preview */}
          <div className="prose max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: report.content.substring(0, 300) + '...' }} 
              className="text-gray-700 mb-4"
            />
            <div className="text-sm text-gray-500 italic">
              Full report content would be displayed here...
            </div>
          </div>
        </div>
        
        {/* Report content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 prose max-w-none animate-slide-up">
          <div dangerouslySetInnerHTML={{ __html: report.content }} className="text-gray-700" />
        </div>
      </div>
      
      {/* Presentation viewer */}
      <PresentationViewer 
        isOpen={presentationOpen}
        onClose={closePresentation}
        slides={report.slides}
        title={report.title}
      />
    </div>
  );
};

export default ReportDetail;
