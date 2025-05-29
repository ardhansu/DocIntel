import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FileUp, CheckCircle, AlertCircle, File, X } from 'lucide-react';
import { useDocuments } from '../contexts/DocumentContext';

const Upload = () => {
  const navigate = useNavigate();
  const { addDocument } = useDocuments();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
    },
    maxFiles: 5,
    maxSize: 20 * 1024 * 1024, // 20MB
  });

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select at least one file to upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    setSuccess(false);

    try {
      // Simulate file upload with progress
      for (let i = 0; i <= 100; i += 5) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(i);
      }

      // Process all files
      const uploadPromises = files.map(file => addDocument(file));
      const results = await Promise.all(uploadPromises);
      
      setSuccess(true);
      setFiles([]);
      
      // Redirect to first document after a short delay
      if (results.length > 0) {
        setTimeout(() => {
          navigate(`/qna/${results[0].id}`);
        }, 1500);
      }
    } catch (err) {
      setError('An error occurred during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return 'PDF';
    if (file.type.includes('word')) return 'DOCX';
    if (file.type.includes('text/plain')) return 'TXT';
    if (file.type.includes('markdown')) return 'MD';
    return 'FILE';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Upload Documents</h1>
        <p className="text-gray-600">Upload documents to analyze with AI and ask questions about their content</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Dropzone */}
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <FileUp className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-lg font-medium text-gray-700">
            {isDragActive ? 'Drop files here...' : 'Drag & drop files here'}
          </p>
          <p className="mt-2 text-gray-500">
            or <span className="text-blue-600 font-medium">browse from your computer</span>
          </p>
          <p className="mt-3 text-xs text-gray-500">
            Supported formats: PDF, DOCX, TXT, MD (Max 20MB per file)
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Files</h3>
            <ul className="divide-y divide-gray-200">
              {files.map((file, index) => (
                <li key={index} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="flex-shrink-0 h-8 w-8 rounded bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                      {getFileIcon(file)}
                    </span>
                    <div className="ml-4 truncate">
                      <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFile(index)}
                    className="ml-4 text-gray-400 hover:text-red-500"
                    disabled={isUploading}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Error/Success Messages */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>Files uploaded successfully! Redirecting to document view...</span>
          </div>
        )}

        {/* Upload Progress */}
        {isUploading && (
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">Uploading...</span>
              <span className="text-gray-700">{uploadProgress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mr-4"
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || isUploading}
            className={`px-4 py-2 rounded-md text-white ${
              files.length === 0 || isUploading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;