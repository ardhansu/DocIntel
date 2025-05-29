# Document Intelligence Platform

A modern web application that leverages RAG (Retrieval Augmented Generation) technology to enable intelligent document analysis and natural language querying. Upload documents and ask questions in plain English to get contextual answers based on your documents' content.

![Document Intelligence Platform](https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 📄 **Multi-format Document Support**
  - PDF documents
  - Word documents (DOCX)
  - Plain text files (TXT)
  - Markdown files (MD)

- 🔍 **Intelligent Document Processing**
  - Automatic document chunking
  - Semantic content analysis
  - Context-aware retrieval
  - Source citations for answers

- 💬 **Natural Language Interface**
  - Ask questions in plain English
  - Get contextual answers from your documents
  - View relevant source passages
  - Persistent chat history

- 📚 **Document Management**
  - Drag-and-drop file upload
  - Document library with metadata
  - Search and filter capabilities
  - Progress tracking for uploads

- 🎨 **Modern User Interface**
  - Clean, intuitive design
  - Responsive layout for all devices
  - Real-time processing feedback
  - Dark mode support

## Screenshots & Examples

### Document Library
![Dashboard](https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)
Browse and manage your uploaded documents with detailed metadata and quick actions.

### Document Upload
![Upload Interface](https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)
Drag & drop interface for easy document uploads with real-time progress tracking.

### Q&A Interface
![Q&A Interface](https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)
Intelligent document querying with context-aware answers.

### Sample Q&A Interactions

#### Example 1: Financial Report Analysis
**Question:** "What was the company's revenue growth in 2023?"

**Answer:** Based on the Annual Report 2023, the company achieved significant growth with an 18% increase in revenue compared to the previous year, reaching $450 million. This growth was observed across all divisions.

*Sources: Page 1, Annual Report 2023*

#### Example 2: Technical Specifications
**Question:** "What are the memory specifications of the XPS-5000 model?"

**Answer:** According to the product specifications, the XPS-5000 model supports DDR5 RAM with speeds up to 6400MHz and can accommodate a maximum capacity of 128GB. The system also features a 5nm processor with 12 cores and 24 threads.

*Sources: Page 2, Product Specifications*

#### Example 3: Research Findings
**Question:** "What are the key findings regarding quantum error correction?"

**Answer:** The research demonstrates a novel approach to error correction in quantum circuits that potentially increases qubit coherence time by a factor of 3. Experimental results confirm that the proposed algorithm reduces decoherence effects in a 50-qubit system under standard laboratory conditions. This has significant implications for quantum cryptography, as it could enable more robust quantum key distribution protocols.

*Sources: Pages 5, 12, 24, Research Paper*

## Tech Stack

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide Icons
  - React Router
  - React Dropzone

- **Document Processing**
  - RAG (Retrieval Augmented Generation)
  - Semantic chunking
  - Vector similarity search
  - Context-aware answer generation

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/document-intelligence-platform.git
   cd document-intelligence-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Upload Documents**
   - Click the "Upload" button or drag files to the upload area
   - Supported formats: PDF, DOCX, TXT, MD
   - Maximum file size: 20MB

2. **View Documents**
   - Access your document library from the dashboard
   - View document metadata and status
   - Search and filter documents

3. **Ask Questions**
   - Select a document from your library
   - Type your question in natural language
   - View answers with source citations
   - Access chat history for each document

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- File upload powered by [React Dropzone](https://react-dropzone.js.org/)
