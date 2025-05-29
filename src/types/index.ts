export interface Document {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  pageCount: number;
  fileSize: number;
  uploadDate: Date;
  processed: boolean;
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  content: string;
  pageNumber: number;
  chunkIndex: number;
}

export interface ChatMessage {
  id: string;
  documentId: string;
  question: string;
  answer: string;
  sources: string[];
  timestamp: Date;
}

export interface UploadStatus {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export interface RAGResult {
  question: string;
  relevantChunks: DocumentChunk[];
  answer: string;
  sources: string[];
}