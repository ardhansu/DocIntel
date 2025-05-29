import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Upload, MessagesSquare, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/upload', label: 'Upload', icon: Upload },
    { path: '/qna', label: 'Ask Questions', icon: MessagesSquare },
  ];

  return (
    <>
      {/* Mobile trigger */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-4 right-4 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`bg-white shadow-md w-64 transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 lg:z-0 overflow-y-auto`}
      >
        <div className="py-6">
          <div className="px-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-800">Document Intel</h2>
            <p className="text-sm text-gray-500">AI-powered document platform</p>
          </div>
          <nav className="space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-500' : 'text-gray-500'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;