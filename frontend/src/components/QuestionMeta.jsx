import React from 'react';
import '../styles/QuestionMeta.css';

const QuestionMeta = ({ type, section, marks }) => {
  const positive = parseFloat(marks);
  let negative = 0;

  if (type.toUpperCase() === 'MCQ') {
    negative = positive === 1 ? 1 / 3 : positive === 2 ? 2 / 3 : 0;
  }

  return (
    <div className="meta-container">
      <div className="meta-item"><strong>Type:</strong> {type}</div>
      <div className="meta-item"><strong>Section:</strong> {section}</div>
      <div className="meta-item">
        <strong>Marks:</strong> +{positive} {negative > 0 ? `| -${negative.toFixed(2)}` : ''}
      </div>
    </div>
  );
};

export default QuestionMeta;
