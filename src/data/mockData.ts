import { Document, DocumentChunk } from '../types';

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Annual Report 2023',
    fileName: 'annual-report-2023.pdf',
    fileType: 'application/pdf',
    pageCount: 24,
    fileSize: 3500000,
    uploadDate: new Date('2023-12-15'),
    processed: true
  },
  {
    id: '2',
    title: 'Product Specifications',
    fileName: 'product-specs-v2.docx',
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    pageCount: 12,
    fileSize: 1200000,
    uploadDate: new Date('2024-01-20'),
    processed: true
  },
  {
    id: '3',
    title: 'Research Paper',
    fileName: 'quantum-computing-research.pdf',
    fileType: 'application/pdf',
    pageCount: 42,
    fileSize: 5700000,
    uploadDate: new Date('2024-02-05'),
    processed: true
  }
];

export const mockChunks: DocumentChunk[] = [
  // Annual Report chunks
  {
    id: 'chunk1-1',
    documentId: '1',
    content: 'In the fiscal year 2023, our company achieved significant growth across all divisions. Revenue increased by 18% compared to the previous year, reaching $450 million.',
    pageNumber: 1,
    chunkIndex: 0
  },
  {
    id: 'chunk1-2',
    documentId: '1',
    content: 'Our operating expenses were reduced by 5% through strategic optimization of resources and improved operational efficiency.',
    pageNumber: 2,
    chunkIndex: 0
  },
  {
    id: 'chunk1-3',
    documentId: '1',
    content: 'The Board of Directors has approved a dividend of $1.25 per share, payable to shareholders of record as of March 15, 2024.',
    pageNumber: 3,
    chunkIndex: 0
  },
  
  // Product Specs chunks
  {
    id: 'chunk2-1',
    documentId: '2',
    content: 'The XPS-5000 model features a 5nm processor with 12 cores and 24 threads, capable of reaching clock speeds up to 4.8GHz.',
    pageNumber: 1,
    chunkIndex: 0
  },
  {
    id: 'chunk2-2',
    documentId: '2',
    content: 'Memory specifications include support for DDR5 RAM with speeds up to 6400MHz and a maximum capacity of 128GB.',
    pageNumber: 2,
    chunkIndex: 0
  },
  
  // Research Paper chunks
  {
    id: 'chunk3-1',
    documentId: '3',
    content: 'Quantum computing represents a paradigm shift in computational capabilities, leveraging quantum mechanical phenomena such as superposition and entanglement.',
    pageNumber: 1,
    chunkIndex: 0
  },
  {
    id: 'chunk3-2',
    documentId: '3',
    content: 'Our research demonstrates a novel approach to error correction in quantum circuits, potentially increasing qubit coherence time by a factor of 3.',
    pageNumber: 5,
    chunkIndex: 0
  },
  {
    id: 'chunk3-3',
    documentId: '3',
    content: 'Experimental results confirm that the proposed algorithm reduces decoherence effects in a 50-qubit system under standard laboratory conditions.',
    pageNumber: 12,
    chunkIndex: 0
  },
  {
    id: 'chunk3-4',
    documentId: '3',
    content: 'The implications for quantum cryptography are significant, as this method could enable more robust quantum key distribution protocols.',
    pageNumber: 24,
    chunkIndex: 0
  }
];