import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Upload.css';

export default function PDFUploader({onReady}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [questionCount, setQuestionCount] = useState(null);
  const [matchedCount, setMatchedCount] = useState(0);
  const [marks, setMarks] = useState(0);
  const [readyToStart, setReadyToStart] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus('');
    setQuestionCount(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus('Upload successful!');
      setQuestionCount(response.data.total_questions);
      setMatchedCount(response.data.matches);
      setMarks(response.data.total_marks);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Upload failed. Please try again.');
      setQuestionCount(null);
    }
     try {
      setUploadStatus('Uploading...');
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUploadStatus('Upload successful!');
      setQuestionCount(response.data.total_questions);
      setMatchedCount(response.data.matches);
      setMarks(response.data.total_marks);
      
      // Enable quiz start
      setReadyToStart(true);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Upload failed. Please try again.');
      setQuestionCount(null);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">Upload Your GATEQuestionPaper PDF</h2>
        <label className="file-input-label">
          <svg className="file-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 16 12 12 16 8 12 2 12" />
            <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
          </svg>
          <span className="file-input-text">
            {selectedFile ? `Selected: ${selectedFile.name}` : 'Drag & Drop or Click to Select File'}
          </span>
          <input type="file" className="hidden-input" accept="application/pdf" onChange={handleFileChange} />
        </label>

        <button
          onClick={handleUpload}
          className="upload-button"
          disabled={!selectedFile || uploadStatus === 'Uploading...'}
        >
          {uploadStatus === 'Uploading...' ? 'Uploading...' : 'Upload PDF'}
        </button>

        {uploadStatus && (
          <p className={`status-message ${
            uploadStatus.includes('successful') ? 'status-success' :
            uploadStatus.includes('failed') ? 'status-error' : ''
          }`}>
            {uploadStatus}
          </p>
        )}

        {questionCount !== null && (
          <p className="question-count-message">
            ✔ Extracted {questionCount} question(s)<br/>
            Matched {matchedCount} question(s) with the database<br/>
            Total Marks: {marks}
          </p>
        )}
        {readyToStart && (
          <button className="start-quiz-button" onClick={onReady}>
            Go to MockTest
          </button>
        )}
      </div>
    </div>
  );
}
