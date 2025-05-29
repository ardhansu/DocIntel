import { Link } from 'react-router-dom';
import { FileText, Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FileText className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">DocIntel</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800">
              Dashboard
            </Link>
            <Link to="/upload" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800">
              Upload
            </Link>
            <Link to="/qna" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800">
              Ask Questions
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-blue-800 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/upload" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Upload
            </Link>
            <Link 
              to="/qna" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ask Questions
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;