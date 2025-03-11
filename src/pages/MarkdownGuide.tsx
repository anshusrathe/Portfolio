
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import Header from '@/components/Header';

const MarkdownGuide = () => {
  return (
    <div className="min-h-screen bg-finance-gray">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-12 mt-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-finance-blue hover:text-finance-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
            <h1 className="text-3xl font-bold text-finance-blue mb-6">
              Markdown Content Workflow Guide
            </h1>
            
            <div className="prose max-w-none">
              <h2>Overview</h2>
              <p>
                This application uses a markdown-based content workflow to manage financial research reports 
                and models. Content is stored as markdown files with frontmatter metadata, allowing for easy 
                editing and management.
              </p>
              
              <h2>Content Structure</h2>
              <p>Content is organized into two main directories:</p>
              <ul>
                <li><code>content/reports/</code> - Contains all research reports as markdown files</li>
                <li><code>content/models/</code> - Contains all financial models as markdown files</li>
              </ul>
              
              <h2>Frontmatter Format</h2>
              <p>Each content file uses YAML frontmatter to define metadata:</p>
              
              <h3>Reports</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
{`---
layout: report
id: "123"
title: "Report Title"
publishDate: "2023-06-15"
author: "Author Name"
researchType: "Equity Research"
summary: "Brief summary of the report"
slides:
  - title: "Slide 1 Title"
    content: "Slide content text"
    type: "title"
  - title: "Slide 2 Title"
    content: "Bullet points\\n• Point 1\\n• Point 2"
    type: "content"
  - title: "Chart Slide"
    type: "chart"
    chartData:
      labels: ["Label 1", "Label 2", "Label 3"]
      values: [10, 20, 30]
---

## Markdown Content

Your report content goes here...`}
              </pre>
              
              <h3>Models</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
{`---
layout: model
id: "456"
title: "Model Title"
publishDate: "2023-07-10"
author: "Author Name"
modelType: "Valuation Model"
summary: "Brief summary of the model"
screenshots:
  - "/path/to/screenshot1.jpg"
  - "/path/to/screenshot2.jpg"
---

## Markdown Content

Your model description goes here...`}
              </pre>
              
              <h2>GitHub Integration</h2>
              <p>
                To use this workflow with GitHub:
              </p>
              <ol>
                <li>Create a repository for your content</li>
                <li>Organize markdown files in the structure described above</li>
                <li>Configure GitHub Actions to build and deploy your site when content changes</li>
                <li>Optionally use GitHub Pages for hosting</li>
              </ol>
              
              <h2>Editing Content</h2>
              <p>
                You can use any markdown editor (like Obsidian) to create and edit content files.
                Just make sure to maintain the proper frontmatter format.
              </p>
              
              <h2>Example Workflow</h2>
              <ol>
                <li>Create a new report in Obsidian with proper frontmatter</li>
                <li>Save it to your local <code>content/reports/</code> directory</li>
                <li>Commit and push to GitHub</li>
                <li>GitHub Actions builds and deploys your updated site</li>
              </ol>
            </div>
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

export default MarkdownGuide;
