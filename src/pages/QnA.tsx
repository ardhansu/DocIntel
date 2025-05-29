import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Send, FileQuestion, ChevronDown, ChevronUp, RotateCw, MessageSquare } from 'lucide-react';
import { useDocuments } from '../contexts/DocumentContext';
import { Document, ChatMessage, DocumentChunk } from '../types';

const QnA = () => {
  const { id } = useParams<{ id?: string }>();
  const { 
    documents,
    getDocument, 
    chatHistory, 
    addChatMessage,
    getChatHistoryForDocument,
    getChunksForDocument,
    performRagQuery
  } = useDocuments();
  
  const [selectedDocument, setSelectedDocument] = useState<Document | undefined>(undefined);
  const [documentChatHistory, setDocumentChatHistory] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDocumentSelector, setShowDocumentSelector] = useState(!id);
  const [relevantChunks, setRelevantChunks] = useState<DocumentChunk[]>([]);
  const [showSourcePanel, setShowSourcePanel] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Set selected document based on URL param
  useEffect(() => {
    if (id) {
      const doc = getDocument(id);
      setSelectedDocument(doc);
    }
  }, [id, getDocument]);

  // Update chat history when selected document changes
  useEffect(() => {
    if (selectedDocument) {
      const history = getChatHistoryForDocument(selectedDocument.id);
      setDocumentChatHistory(history);
    } else {
      setDocumentChatHistory([]);
    }
  }, [selectedDocument, getChatHistoryForDocument, chatHistory]);

  // Scroll to bottom of chat when messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [documentChatHistory]);

  const handleSelectDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setShowDocumentSelector(false);
  };

  const handleAskQuestion = async () => {
    if (!question.trim() || !selectedDocument || isLoading) return;
    
    setIsLoading(true);
    try {
      // Get RAG results
      const ragResult = await performRagQuery(selectedDocument.id, question);
      setRelevantChunks(ragResult.relevantChunks);
      
      // Add to chat history
      await addChatMessage(selectedDocument.id, question);
      
      // Reset question input
      setQuestion('');
    } catch (error) {
      console.error('Error asking question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-12rem)]">
      <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Document Q&A</h1>
            <button 
              onClick={() => setShowDocumentSelector(!showDocumentSelector)} 
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              {selectedDocument ? selectedDocument.title : 'Select a document'}
              {showDocumentSelector ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setShowSourcePanel(!showSourcePanel)}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center ${
                showSourcePanel 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileQuestion size={16} className="mr-1" />
              <span className="hidden sm:inline">Source Context</span>
            </button>
          </div>
        </div>
        
        {/* Document Selector */}
        {showDocumentSelector && (
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Select a document to ask questions about:</h3>
            {documents.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-500">No documents found</p>
                <Link 
                  to="/upload" 
                  className="mt-2 inline-block text-blue-600 hover:text-blue-800"
                >
                  Upload a document
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {documents.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => handleSelectDocument(doc)}
                    className={`p-3 rounded-lg border text-left hover:border-blue-500 transition-colors ${
                      selectedDocument?.id === doc.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <p className="font-medium text-gray-800 truncate">{doc.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{doc.pageCount} pages • {doc.fileType.split('/')[1]}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${showSourcePanel ? 'hidden md:flex' : 'flex'}`}>
            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 p-4 overflow-y-auto space-y-4"
            >
              {selectedDocument ? (
                documentChatHistory.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No questions yet</h3>
                    <p className="mt-1 text-gray-500 max-w-sm">
                      Ask questions about "{selectedDocument.title}" and I'll find relevant information using RAG technology.
                    </p>
                  </div>
                ) : (
                  documentChatHistory.map((message) => (
                    <div key={message.id} className="space-y-2">
                      {/* User question */}
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                          U
                        </div>
                        <div className="flex-1">
                          <div className="bg-blue-50 rounded-lg p-3 inline-block">
                            <p className="text-gray-800">{message.question}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTimestamp(message.timestamp)}
                          </p>
                        </div>
                      </div>
                      
                      {/* AI response */}
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                          AI
                        </div>
                        <div className="flex-1">
                          <div className="bg-white border border-gray-200 rounded-lg p-3 inline-block">
                            <p className="text-gray-800 whitespace-pre-line">{message.answer}</p>
                            {message.sources.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-gray-100">
                                <p className="text-xs text-gray-500 font-medium">Sources:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {message.sources.map((source, i) => (
                                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                      {source}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTimestamp(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <FileQuestion className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No document selected</h3>
                  <p className="mt-1 text-gray-500">
                    Please select a document from the dropdown or upload a new document to get started.
                  </p>
                  <Link
                    to="/upload"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Upload Document
                  </Link>
                </div>
              )}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <RotateCw className="h-5 w-5 text-blue-500 animate-spin" />
                  <span className="ml-2 text-sm text-gray-600">Analyzing document...</span>
                </div>
              )}
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex">
                <input
                  type="text"
                  placeholder={selectedDocument ? "Ask a question about the document..." : "Select a document first"}
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                  disabled={!selectedDocument || isLoading}
                />
                <button
                  className={`bg-blue-600 text-white px-4 py-2 rounded-r-lg flex items-center ${
                    !selectedDocument || isLoading 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-blue-700'
                  }`}
                  onClick={handleAskQuestion}
                  disabled={!selectedDocument || isLoading}
                >
                  {isLoading ? <RotateCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
          
          {/* Source Panel */}
          {showSourcePanel && (
            <div className="w-full md:w-2/5 border-l border-gray-200 bg-gray-50 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">Source Context</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Relevant document chunks used to generate the answer
                </p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {relevantChunks.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    <p>Ask a question to see relevant document chunks</p>
                  </div>
                ) : (
                  relevantChunks.map((chunk) => (
                    <div key={chunk.id} className="bg-white border border-gray-200 rounded-md p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                          Page {chunk.pageNumber}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800">{chunk.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QnA;