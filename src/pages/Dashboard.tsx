import { useState } from 'react';
import { Link } from 'react-router-dom';
import { File as FilePdf, FileText, FileQuestion, Trash2, Search } from 'lucide-react';
import { useDocuments } from '../contexts/DocumentContext';
import { Document } from '../types';

const Dashboard = () => {
  const { documents, deleteDocument } = useDocuments();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (doc: Document) => {
    if (doc.fileType.includes('pdf')) return <FilePdf className="h-10 w-10 text-red-500" />;
    if (doc.fileType.includes('word')) return <FileText className="h-10 w-10 text-blue-500" />;
    return <FileQuestion className="h-10 w-10 text-gray-500" />;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Document Library</h1>
          <p className="text-gray-600">Browse and manage your uploaded documents</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Link 
            to="/upload" 
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upload
          </Link>
        </div>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No documents found</h3>
          <p className="mt-1 text-gray-500">
            {searchTerm 
              ? "No documents match your search criteria" 
              : "Upload your first document to get started"
            }
          </p>
          {!searchTerm && (
            <Link
              to="/upload"
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Upload Document
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div 
              key={doc.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  {getFileIcon(doc)}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                      aria-label="Delete document"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <h3 className="mt-4 text-lg font-semibold text-gray-800 truncate">
                  {doc.title}
                </h3>
                
                <p className="text-sm text-gray-500 truncate mt-1">
                  {doc.fileName}
                </p>
                
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Size</p>
                    <p className="font-medium text-gray-700">{formatFileSize(doc.fileSize)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Pages</p>
                    <p className="font-medium text-gray-700">{doc.pageCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium text-gray-700">
                      {doc.fileType.split('/')[1]?.toUpperCase() || 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Uploaded</p>
                    <p className="font-medium text-gray-700">
                      {doc.uploadDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Link
                    to={`/qna/${doc.id}`}
                    className="flex-grow text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Ask Questions
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;