
import React from 'react';

interface ModelDetailProps {
  content: string;
  screenshots?: string[];
  model?: {
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

const ModelDetail = ({ content, screenshots, model }: ModelDetailProps) => {
  // Support both new (content/screenshots) and old (model) props pattern
  if (model) {
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
          return <div className="bg-green-50 text-green-700 border-green-200">Beginner</div>;
        case 'Intermediate':
          return <div className="bg-blue-50 text-blue-700 border-blue-200">Intermediate</div>;
        case 'Advanced':
          return <div className="bg-purple-50 text-purple-700 border-purple-200">Advanced</div>;
        default:
          return <div>Unknown</div>;
      }
    };
    
    // Return the original implementation
    return (
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: model.description }} />
      </div>
    );
  }
  
  // New implementation that accepts content and screenshots directly
  return (
    <div className="prose max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
      
      {screenshots && screenshots.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-finance-blue mb-4">Model Screenshots</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {screenshots.map((screenshot, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={screenshot} 
                  alt={`Model screenshot ${index + 1}`} 
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelDetail;
