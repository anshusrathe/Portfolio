
import React from 'react';

interface ReportDetailProps {
  content: string;
  report?: {
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

const ReportDetail = ({ content, report }: ReportDetailProps) => {
  if (report) {
    // Original implementation with full report object
    return (
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: report.content }} />
      </div>
    );
  }
  
  // Simple implementation that just renders the content
  return (
    <div className="prose max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default ReportDetail;
