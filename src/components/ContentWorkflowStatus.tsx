
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { listReports, listModels } from '@/utils/markdown';

const ContentWorkflowStatus = () => {
  const [reportsCount, setReportsCount] = useState(0);
  const [modelsCount, setModelsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadContent() {
      try {
        const reports = await listReports();
        const models = await listModels();
        setReportsCount(reports.length);
        setModelsCount(models.length);
      } catch (error) {
        console.error("Error loading content:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadContent();
  }, []);
  
  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-finance-blue mb-4">Content Workflow Status</h2>
      
      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-6">
            <Card className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Research Reports</p>
                <p className="text-2xl font-semibold">{reportsCount}</p>
              </div>
              <Badge variant="outline" className="text-finance-blue">
                Markdown Files
              </Badge>
            </Card>
            
            <Card className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Financial Models</p>
                <p className="text-2xl font-semibold">{modelsCount}</p>
              </div>
              <Badge variant="outline" className="text-finance-blue">
                Markdown Files
              </Badge>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Button asChild>
              <Link to="/markdown-guide">
                View Markdown Workflow Guide
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ContentWorkflowStatus;
