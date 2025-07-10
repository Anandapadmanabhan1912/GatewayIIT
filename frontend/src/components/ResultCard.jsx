import React from 'react';

const ResultCard = ({ score = 7, total_marks = 10, attempted = 8, total = 10 }) => {
  // Calculate percentage
  const percentage = (score / total_marks) * 100;
const message =
    percentage > 50
        ? "Congratulations! You are awesome!"
        : percentage > 33
        ? "Good, keep improving!"
        : "You have to work hard !";
  
  // Determine color scheme based on percentage
  const getColorScheme = (percent) => {
    if (percent < 33) {
      return {
        background: '#fee2e2', // light red
        border: '#ef4444',     // red border
        text: '#dc2626'        // darker red text
      };
    } else if (percent >= 33 && percent < 50) {
      return {
        background: '#dbeafe', // light blue
        border: '#3b82f6',     // blue border
        text: '#1d4ed8'        // darker blue text
      };
    } else {
      return {
        background: '#dcfce7', // light green
        border: '#22c55e',     // green border
        text: '#16a34a'        // darker green text
      };
    }
  };
  
  const colorScheme = getColorScheme(percentage);
  
  const cardStyle = {
    backgroundColor: colorScheme.background,
    border: `3px solid ${colorScheme.border}`,
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '400px',
    margin: '20px auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  };
  
  const headingStyle = {
    color: colorScheme.text,
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '20px',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };
  
  const paragraphStyle = {
    color: colorScheme.text,
    fontSize: '18px',
    fontWeight: '500',
    marginBottom: '12px',
    lineHeight: '1.5',
    alignSelf: 'center',
    textAlign: 'center',

  };
  
  const strongStyle = {
    fontWeight: '700',
    color: colorScheme.text
  };
  
  const percentageStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: colorScheme.text,
    textAlign: 'center',
    marginTop: '16px',
    padding: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '6px'
  };

  return (
    <div style={cardStyle}>
      <h2 style={headingStyle}>Your GATE MockTest Results</h2>
      <p style={paragraphStyle}>
        <span style={strongStyle}>{message}</span>
        </p>
      <p style={{ ...paragraphStyle, alignSelf: 'center' }}>
        <span style={strongStyle}>Score:</span> {score} / {total_marks}
      </p>
      <p style={paragraphStyle}>
        <span style={strongStyle}>Attempted:</span> {attempted} / {total}
      </p>
      <div style={percentageStyle}>
        Percentage: {percentage.toFixed(1)}%
      </div>
    </div>
  );
};

export default ResultCard;