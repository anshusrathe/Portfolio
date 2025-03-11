
import matter from 'gray-matter';
import { marked } from 'marked';

// Parse markdown file content with frontmatter
export function parseMarkdown(fileContent: string) {
  // Extract frontmatter and content
  const { data, content } = matter(fileContent);
  
  // Convert markdown content to HTML
  const htmlContent = marked.parse(content);
  
  return {
    metadata: data,
    content: htmlContent
  };
}

// Mock function to fetch markdown content
// In a real app, this would fetch from the file system or an API
export async function fetchMarkdownFile(path: string) {
  // For demo purposes, we'll use a mock file system
  const mockFiles = MOCK_FILES;
  
  if (mockFiles[path]) {
    return mockFiles[path];
  }
  
  throw new Error(`File not found: ${path}`);
}

// Mock function to fetch slides data
export async function fetchSlidesData(reportId: string) {
  const slidesPath = `assets/reports/${reportId}/slides.json`;
  
  // In a real app, this would fetch a JSON file
  // For demo purposes, we'll use mock data
  const mockSlides = MOCK_SLIDES;
  
  if (mockSlides[reportId]) {
    return mockSlides[reportId];
  }
  
  throw new Error(`Slides not found for report: ${reportId}`);
}

// Types for our content
export interface ReportFrontmatter {
  layout: string;
  id: string;
  title: string;
  publishDate: string;
  author: string;
  researchType: string;
  summary: string;
  slidesSource?: string;
  slides?: any[];
}

export interface ModelFrontmatter {
  layout: string;
  id: string;
  title: string;
  publishDate: string;
  author: string;
  modelType: string;
  summary: string;
  screenshots?: string[];
}

// Mock slides data for demo purposes
const MOCK_SLIDES: Record<string, any[]> = {
  "1": [
    {
      title: "Apple Inc. (AAPL) Valuation Analysis",
      content: "Comprehensive equity research and valuation report",
      type: "title",
      imageUrl: "/placeholder.svg"
    },
    {
      title: "Executive Summary",
      content: "• Market leader in premium smartphones, wearables, and tablets\n• Expanding services ecosystem with high margins\n• Strong cash flow generation and shareholder returns\n• Initiating coverage with BUY rating and $190 price target",
      type: "content",
      imageUrl: "/placeholder.svg"
    },
    {
      title: "Financial Highlights",
      content: "• FY2022 Revenue: $394.3 billion (+7.8% YoY)\n• Gross Margin: 43.3% (+160 bps YoY)\n• Services Revenue: $78.1 billion (+19% YoY)\n• Cash & Equivalents: $48.3 billion\n• TTM Free Cash Flow: $111.4 billion",
      type: "content",
      imageUrl: "/placeholder.svg"
    },
    {
      title: "Revenue Breakdown",
      type: "chart",
      chartData: {
        labels: ["iPhone", "Services", "Mac", "Wearables & Home", "iPad"],
        values: [52.1, 19.8, 10.2, 10.4, 7.4]
      },
      imageUrl: "/placeholder.svg"
    }
  ]
};

// Mock filesystem for demo purposes
// In a real app, these would be actual files on disk or fetched from a CMS
const MOCK_FILES: Record<string, string> = {
  'content/reports/apple-valuation.md': `---
layout: report
id: "1"
title: "Apple Inc. (AAPL) Valuation Analysis"
publishDate: "2023-06-15"
author: "John Smith"
researchType: "Equity Research"
summary: "A comprehensive valuation analysis of Apple Inc., examining growth drivers, risks, and fair value estimation."
slidesSource: "assets/reports/1/slides.json"
---

## Executive Summary

Apple Inc. continues to demonstrate strong financial performance driven by its ecosystem of products and services. Our analysis suggests the company is well-positioned for continued growth in the medium term.

### Key Investment Points

- iPhone remains the core revenue driver with strong upgrade cycles
- Services segment growing at double-digit rates, improving margin profile
- Strong balance sheet with significant cash reserves
- Consistent shareholder returns through dividends and share repurchases

## Financial Analysis

Apple reported $394.3 billion in revenue for FY2022, representing a 7.8% year-over-year increase. The company's gross margin expanded to 43.3%, driven by a more favorable product mix and growing high-margin services business.

### Revenue Breakdown by Segment

- iPhone: $205.5 billion (52.1% of total)
- Services: $78.1 billion (19.8% of total)
- Mac: $40.2 billion (10.2% of total)
- Wearables, Home & Accessories: $41.2 billion (10.4% of total)
- iPad: $29.3 billion (7.4% of total)

## Valuation

Based on our DCF analysis and comparative valuation metrics, we establish a fair value estimate of $190 per share. This represents a potential upside of approximately 12% from current levels.`,

  'content/models/dcf-model.md': `---
layout: model
id: "1"
title: "Discounted Cash Flow (DCF) Model - Tech Companies"
publishDate: "2023-07-10"
author: "Michael Johnson"
modelType: "Valuation Model"
summary: "A comprehensive DCF model template for technology companies with built-in sensitivity analysis."
screenshots:
  - "/placeholder.svg"
  - "/placeholder.svg"
  - "/placeholder.svg"
---

## Model Overview

This DCF valuation model is specifically designed for technology companies with high growth rates, R&D investments, and potentially irregular cash flow patterns. The model incorporates industry-specific metrics and provides a comprehensive approach to valuing technology businesses.

### Key Features

- Detailed revenue buildup by product/service category
- R&D capitalization adjustment options
- Stock-based compensation handling
- Terminal value calculation with multiple methodologies
- Comprehensive sensitivity analysis
- Comparison to trading comparables

## Model Structure

The model is organized into the following worksheet sections:

1. **Instructions** - Detailed guide on how to use the model
2. **Input Sheet** - Central location for all key assumptions
3. **Historical Financials** - Historical data entry and analysis
4. **Projections** - Detailed 5-year financial projections
5. **DCF Valuation** - Core DCF calculations and sensitivity tables
6. **Comparables** - Trading and transaction comparables
7. **Charts** - Visual representation of key metrics and outputs`
};

// Function to get all report paths
export function getReportPaths() {
  return Object.keys(MOCK_FILES).filter(path => path.startsWith('content/reports/'));
}

// Function to get all model paths
export function getModelPaths() {
  return Object.keys(MOCK_FILES).filter(path => path.startsWith('content/models/'));
}

// Function to list all reports with metadata
export async function listReports() {
  const reportPaths = getReportPaths();
  const reports = [];
  
  for (const path of reportPaths) {
    try {
      const fileContent = await fetchMarkdownFile(path);
      const { metadata } = parseMarkdown(fileContent);
      reports.push(metadata);
    } catch (error) {
      console.error(`Error loading report from ${path}:`, error);
    }
  }
  
  return reports;
}

// Function to list all models with metadata
export async function listModels() {
  const modelPaths = getModelPaths();
  const models = [];
  
  for (const path of modelPaths) {
    try {
      const fileContent = await fetchMarkdownFile(path);
      const { metadata } = parseMarkdown(fileContent);
      models.push(metadata);
    } catch (error) {
      console.error(`Error loading model from ${path}:`, error);
    }
  }
  
  return models;
}

// Function to get a specific report by ID
export async function getReportById(id: string) {
  const reports = await listReports();
  const reportMeta = reports.find(report => report.id === id);
  
  if (!reportMeta) {
    return null;
  }
  
  // Find the file path for this report
  const reportPath = getReportPaths().find(async path => {
    const content = await fetchMarkdownFile(path);
    const { metadata } = parseMarkdown(content);
    return metadata.id === id;
  });
  
  if (!reportPath) {
    return reportMeta; // Return just metadata if full content not found
  }
  
  const fileContent = await fetchMarkdownFile(reportPath);
  const { content } = parseMarkdown(fileContent);
  
  // Check if we have slides from a slidesSource property
  if (reportMeta.slidesSource) {
    try {
      // In a real app, fetch the JSON file from reportMeta.slidesSource
      // For demo purposes, we'll use our mock slides data
      const slides = await fetchSlidesData(reportMeta.id);
      return {
        ...reportMeta,
        content,
        slides
      };
    } catch (error) {
      console.error(`Error loading slides for report ${id}:`, error);
      return {
        ...reportMeta,
        content
      };
    }
  } else {
    // Use slides directly from frontmatter if available
    return {
      ...reportMeta,
      content
    };
  }
}

// Function to get a specific model by ID
export async function getModelById(id: string) {
  const models = await listModels();
  const modelMeta = models.find(model => model.id === id);
  
  if (!modelMeta) {
    return null;
  }
  
  // Find the file path for this model
  const modelPath = getModelPaths().find(async path => {
    const content = await fetchMarkdownFile(path);
    const { metadata } = parseMarkdown(content);
    return metadata.id === id;
  });
  
  if (!modelPath) {
    return modelMeta; // Return just metadata if full content not found
  }
  
  const fileContent = await fetchMarkdownFile(modelPath);
  const { content } = parseMarkdown(fileContent);
  
  return {
    ...modelMeta,
    content
  };
}
