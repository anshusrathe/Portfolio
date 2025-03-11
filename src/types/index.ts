
export interface Slide {
  id?: number;
  title: string;
  content?: string;
  type: string;
  chartData?: {
    labels: string[];
    values: number[];
  };
}

export interface PresentationViewerProps {
  slides: Slide[];
  onClose: () => void;
  isOpen: boolean;
}

export interface ReportDetailProps {
  content: string;
  report?: any;
}

export interface ModelDetailProps {
  content: string;
  screenshots?: string[];
  model?: any;
}
