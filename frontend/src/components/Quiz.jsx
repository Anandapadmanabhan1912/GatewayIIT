import React, { useEffect, useState, useRef } from 'react';
import QuestionMeta from './QuestionMeta';
import '../styles/Quiz.css'; 

function Quiz({onSubmit}) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [timeLeft, setTimeLeft] = useState(180 * 60);
  const [submitted, setSubmitted] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const paletteRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/questions')
      .then(res => res.json())
      .then(data => setQuestions(data.questions))
      .catch(err => console.error("Failed to load questions", err));
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 && !submitted) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (showPalette && paletteRef.current && !paletteRef.current.contains(event.target)) {
        setShowPalette(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPalette]);

  const handleOptionClick = (option) => {
    const currentKey = `${questions[current].section}_${questions[current].qno}`;
    setAnswers({ ...answers, [currentKey]: option });;
  };

  const handleInputChange = (e) => {
    const currentKey = `${questions[current].section}_${questions[current].qno}`;
    setAnswers({ ...answers,  [currentKey]: e.target.value });
  };

  const handleMark = () => {
    setMarked({ ...marked, [current]: !marked[current] });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleSubmit = () => {
  setSubmitted(true);
  fetch('http://localhost:5000/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  })
    .then(res => res.json())
    .then(data => {
      if (onSubmit) onSubmit(data); // send result to parent
    })
    .catch(err => console.error("Submission failed", err));
};



  const goToQuestion = (index) => {
    setCurrent(index);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getSectionWisePalette = () => {
    const sectionMap = {};
    questions.forEach((q, idx) => {
      if (!sectionMap[q.section]) sectionMap[q.section] = [];
      sectionMap[q.section].push({ idx, q });
    });
    return sectionMap;
  };

  const sectionPalettes = getSectionWisePalette();

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="timer">Time Left: {formatTime(timeLeft)}</div>
        <button className="menu-toggle" onClick={() => setShowPalette(!showPalette)}>
          ☰
        </button>
      </div>

      {questions.length > 0 ? (
        <>
          <QuestionMeta
            type={questions[current].type}
            section={questions[current].section}
            marks={questions[current].marks}/>

          <div className="question-image">
            <img src={`http://localhost:5000/images/${questions[current].image}`} 
                 alt={`Question ${questions[current].qno}`} />
          </div>

          {questions[current].type === 'NAT' ? (
            <>
            <div className="nat-input">
  <input 
    type="number"
    className='nat-answer'
    placeholder="Enter your answer"
    value={answers[`${questions[current].section}_${questions[current].qno}`] || ''}
    onChange={handleInputChange}
  />
</div>

<button
  className="clear-choice"
  onClick={() => handleInputChange({ target: { value: '' } })}
>
  Clear Choice
</button>

            </>
          ) : (
            <>
            <div className="options">
             {['A', 'B', 'C', 'D'].map(opt => (
            <button key={opt}
            className={answers[`${questions[current].section}_${questions[current].qno}`] === opt ? 'selected' : ''}
            onClick={() => handleOptionClick(opt)}>({opt})</button>))}
            </div>
            <button className="clear-choice" onClick={() => handleOptionClick(null)}> Clear Choice</button>
            </>
          )}

          <div className="actions">
            <button onClick={handleBack} disabled={current === 0}>Back</button>
            <button onClick={handleNext} disabled={current === questions.length - 1}>Next</button>
            <button onClick={handleMark}>
              {marked[current] ? "Unmark Review" : "Mark for Review"}
            </button>
            <button onClick={handleSubmit}>Submit</button>
          </div>

          {/* Section-wise Palette Drawer */}
            <div ref={paletteRef} className={`palette-drawer ${showPalette ? 'open' : ''}`}>
            <h3>Question Palette</h3>
            {Object.keys(sectionPalettes).map(section => (
              <div key={section} className="palette-section">
                <h4>{section}</h4>
                <div className="palette">
                  {sectionPalettes[section].map(({ idx }) => (
                    <button
                      key={idx}
                      className={
                        current === idx ? 'active' :
                        marked[idx] ? 'marked' :
                        answers[questions[idx].qno] ? 'answered' :
                        'unseen'
                      }
                      onClick={() => goToQuestion(idx)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}

export default Quiz;
