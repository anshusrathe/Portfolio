
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

interface BackToHomeProps {
  label?: string;
}

const BackToHome = ({ label = "Back to Home" }: BackToHomeProps) => {
  return (
    <div className="mb-6">
      <Link 
        to="/" 
        className="inline-flex items-center text-finance-blue hover:text-finance-accent transition-colors"
      >
        <Home className="h-4 w-4 mr-2" />
        {label}
      </Link>
    </div>
  );
};

export default BackToHome;
