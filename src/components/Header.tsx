
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
      scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 flex items-center justify-center bg-finance-blue rounded-md">
              <span className="text-white font-bold text-lg">VS</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-finance-accent rounded-full"></div>
            </div>
            <span className="text-finance-blue font-bold text-xl">ValuationSearch</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/reports" className="font-medium text-gray-700 hover:text-finance-accent transition-colors link-hover">
              Reports
            </Link>
            <Link to="/models" className="font-medium text-gray-700 hover:text-finance-accent transition-colors link-hover">
              Financial Models
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-1 font-medium text-gray-700 hover:text-finance-accent transition-colors">
                <span>Resources</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Valuation Guides</Link>
                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Financial Terminology</Link>
                <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Analysis Frameworks</Link>
              </div>
            </div>
            <Link to="#" className="font-medium text-gray-700 hover:text-finance-accent transition-colors link-hover">
              About
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-finance-accent transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Button className="bg-finance-accent hover:bg-finance-blue-light text-white">
              Subscribe
            </Button>
          </div>
          
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 animate-slide-down">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/reports" 
              className="font-medium text-gray-700 hover:text-finance-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reports
            </Link>
            <Link 
              to="/models" 
              className="font-medium text-gray-700 hover:text-finance-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Financial Models
            </Link>
            <div className="py-2">
              <button className="flex items-center justify-between w-full font-medium text-gray-700">
                <span>Resources</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="pl-4 mt-2 space-y-2">
                <Link to="#" className="block py-1 text-sm text-gray-600 hover:text-finance-accent">Valuation Guides</Link>
                <Link to="#" className="block py-1 text-sm text-gray-600 hover:text-finance-accent">Financial Terminology</Link>
                <Link to="#" className="block py-1 text-sm text-gray-600 hover:text-finance-accent">Analysis Frameworks</Link>
              </div>
            </div>
            <Link 
              to="#" 
              className="font-medium text-gray-700 hover:text-finance-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-2 flex items-center justify-between">
              <button className="text-gray-600 hover:text-finance-accent transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <Button className="bg-finance-accent hover:bg-finance-blue-light text-white">
                Subscribe
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
