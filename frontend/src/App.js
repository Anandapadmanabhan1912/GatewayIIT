import React, { useState } from 'react';
import Quiz from './components/Quiz';
import FrontPage from './components/FrontPage';
import Results from './components/Results';
import PDFUploader from './components/PDFUploader'; // Assuming this is the uploader you provided

function App() {
  const [front, setFront] = useState(true); // Assuming you want to show the front page first
  const [submitted, setSubmitted] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [quizReady, setQuizReady] = useState(false); // becomes true after successful extraction

  return (
    <>
      {front ? (
        <FrontPage onStart={() => setFront(false)} />
      ) : (
        <div className="App">
          {!quizReady && (
            <PDFUploader onReady={() => setQuizReady(true)} />
          )}

          {quizReady && !submitted && (
            <Quiz onSubmit={(data) => {
              setResultData(data);
              setSubmitted(true);
            }} />
          )}

          {submitted && (
            <Results
              data={resultData}
              onReview={() => setSubmitted(false)}
              onUpload={() => {
                setSubmitted(false);
                setQuizReady(false); // Reset quiz readiness for new upload
                setResultData(null); // Clear previous results
              }}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
