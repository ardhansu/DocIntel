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
  - Persistent chat history ![Screenshot 2025-05-29 103924](https://github.com/user-attachments/assets/02f32f6d-bf5b-4460-afc1-4c84ca6df2bb)


- 📚 **Document Management**
  - Drag-and-drop file upload
  - Document library with metadata
  - Search and filter capabilities
  - Progress tracking for uploads

- 🎨 **Modern User Interface**
  - Clean, intuitive design
  - Responsive layout for all devices
  - Real-time processing feedback
  - Dark mode support  ![Screenshot 2025-05-29 103559](https://github.com/user-attachments/assets/0edff023-06a6-40ad-b419-31a02907509c)


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
