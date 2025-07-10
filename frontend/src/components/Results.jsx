// Results.jsx
import React from 'react';
import '../styles/Results.css'; // Import the CSS file
import ResultCard from './ResultCard';

function Results({ data, onReview, onUpload }) {
  if (!data || !data.analysis) {
    return <p>Loading result...</p>;
  }

  const { score, total,total_marks,attempted, analysis, summary } = data;

  return (
    <div className="results-container">
      <ResultCard score={score} total_marks={total_marks} attempted={attempted} total={total} />

      <h3>Type-wise Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Total</th>
            <th>Attempted</th>
            <th>Correct</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(summary).map(([type, stats]) => (
            <tr key={type}>
              <td data-label="Type">{type}</td> {/* Add data-label for responsiveness */}
              <td data-label="Total">{stats.total}</td>
              <td data-label="Attempted">{stats.attempted}</td>
              <td data-label="Correct">{stats.correct}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Analysis</h3>
      {analysis.map((item, idx) => (
        <div key={idx} className="question-review">
          <img
            src={`http://localhost:5000/images/${item.image}`}
            alt={`Question ${item.qno}`}
            className="review-image"
          />
          <p><strong>Q{item.qno} [{item.section}]</strong> | <strong>Type:</strong> {item.type}</p>
          <p><strong>Your Answer:</strong> {item.userAnswer ?? 'Unanswered'}</p>
          <p><strong>Correct Answer:</strong> {item.correct}</p>
          <p className={
            item.isCorrect ? 'correct' :
            item.unanswered ? 'unanswered' : 'wrong'
          }>
            {item.isCorrect ? '✅ Correct' : item.unanswered ? '⚠️ Unanswered' : '❌ Wrong'}
          </p>
        </div>
      ))}

      <button onClick={onReview}>Review Quiz</button>
      <button onClick={onUpload}>Upload a New PDF/Question Paper</button>
    </div>
  );
}

export default Results;