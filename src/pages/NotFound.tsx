import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center p-6">
      <FileQuestion className="w-20 h-20 text-gray-300 mb-6" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;