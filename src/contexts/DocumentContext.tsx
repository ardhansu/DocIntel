import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Document, ChatMessage, DocumentChunk, RAGResult } from '../types';
import { mockDocuments, mockChunks } from '../data/mockData';

interface DocumentContextType {
  documents: Document[];
  addDocument: (file: File) => Promise<Document>;
  getDocument: (id: string) => Document | undefined;
  deleteDocument: (id: string) => void;
  getChunksForDocument: (documentId: string) => DocumentChunk[];
  chatHistory: ChatMessage[];
  addChatMessage: (documentId: string, question: string) => Promise<ChatMessage>;
  getChatHistoryForDocument: (documentId: string) => ChatMessage[];
  clearChatHistory: (documentId: string) => void;
  performRagQuery: (documentId: string, question: string) => Promise<RAGResult>;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [chunks, setChunks] = useState<DocumentChunk[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  // Load mock data on initial render
  useEffect(() => {
    setDocuments(mockDocuments);
    setChunks(mockChunks);
  }, []);

  const addDocument = async (file: File): Promise<Document> => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newDocument: Document = {
      id: uuidv4(),
      title: file.name.split('.')[0],
      fileName: file.name,
      fileType: file.type,
      pageCount: Math.floor(Math.random() * 30) + 1, // Random page count for demo
      fileSize: file.size,
      uploadDate: new Date(),
      processed: true
    };
    
    setDocuments(prev => [...prev, newDocument]);
    
    // Simulate chunk creation
    const newChunks: DocumentChunk[] = [];
    const pageCount = newDocument.pageCount;
    
    for (let i = 0; i < pageCount; i++) {
      const chunksPerPage = Math.floor(Math.random() * 3) + 1;
      
      for (let j = 0; j < chunksPerPage; j++) {
        newChunks.push({
          id: uuidv4(),
          documentId: newDocument.id,
          content: `Sample content from page ${i + 1}, chunk ${j + 1} of document "${newDocument.title}"`,
          pageNumber: i + 1,
          chunkIndex: j
        });
      }
    }
    
    setChunks(prev => [...prev, ...newChunks]);
    
    return newDocument;
  };

  const getDocument = (id: string): Document | undefined => {
    return documents.find(doc => doc.id === id);
  };

  const deleteDocument = (id: string): void => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    setChunks(prev => prev.filter(chunk => chunk.documentId !== id));
    setChatHistory(prev => prev.filter(chat => chat.documentId !== id));
  };

  const getChunksForDocument = (documentId: string): DocumentChunk[] => {
    return chunks.filter(chunk => chunk.documentId === documentId);
  };

  const addChatMessage = async (documentId: string, question: string): Promise<ChatMessage> => {
    // Simulate RAG processing
    const result = await performRagQuery(documentId, question);
    
    const newMessage: ChatMessage = {
      id: uuidv4(),
      documentId,
      question,
      answer: result.answer,
      sources: result.sources,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, newMessage]);
    return newMessage;
  };

  const getChatHistoryForDocument = (documentId: string): ChatMessage[] => {
    return chatHistory.filter(chat => chat.documentId === documentId);
  };

  const clearChatHistory = (documentId: string): void => {
    setChatHistory(prev => prev.filter(chat => chat.documentId !== documentId));
  };

  // Simulated RAG pipeline
  const performRagQuery = async (documentId: string, question: string): Promise<RAGResult> => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Get document chunks
    const documentChunks = getChunksForDocument(documentId);
    
    // Simulate relevance ranking - just get random chunks for the demo
    const relevantChunks = documentChunks
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(3, documentChunks.length));
    
    // Generate answer from chunks (simulated)
    const doc = getDocument(documentId);
    const answer = `Based on the document "${doc?.title}", the answer to your question "${question}" involves information from multiple sections. ` + 
      relevantChunks.map(chunk => chunk.content).join(' ') + 
      ` This is a demonstration of how a RAG system would retrieve relevant chunks and generate an answer based on them.`;
    
    // Generate sources
    const sources = relevantChunks.map(chunk => `Page ${chunk.pageNumber}`);
    
    return {
      question,
      relevantChunks,
      answer,
      sources
    };
  };

  const value = {
    documents,
    addDocument,
    getDocument,
    deleteDocument,
    getChunksForDocument,
    chatHistory,
    addChatMessage,
    getChatHistoryForDocument,
    clearChatHistory,
    performRagQuery
  };

  return <DocumentContext.Provider value={value}>{children}</DocumentContext.Provider>;
};

export const useDocuments = (): DocumentContextType => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};