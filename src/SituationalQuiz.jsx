import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, AlertCircle, Home } from 'lucide-react';

const SituationalQuiz = ({ onBackToHome }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const situationalQuestions = [
    {
      id: 1,
      scenario: "A user calls reporting that they cannot access their shared network drive. Other users can access it fine. What is your first troubleshooting step?",
      options: [
        "Restart the file server immediately",
        "Check the user's network connectivity and drive mappings",
        "Reinstall the user's operating system",
        "Reset the user's password"
      ],
      correct: 1,
      explanation: "Always start with the simplest checks first. Verify network connectivity and drive mappings before escalating to more complex solutions."
    },
    {
      id: 2,
      scenario: "Your company's email server is running out of disk space and users are complaining about slow email performance. What should you do first?",
      options: [
        "Delete all emails older than 30 days",
        "Buy more storage immediately",
        "Analyze disk usage and identify large files/logs for cleanup",
        "Restart the email server"
      ],
      correct: 2,
      explanation: "Analyze the situation first. Check what's consuming space (logs, attachments, databases) before taking action or purchasing hardware."
    },
    {
      id: 3,
      scenario: "A critical business application crashes every day at 2 PM. Users are getting frustrated. What's your systematic approach?",
      options: [
        "Restart the application every day at 1:30 PM",
        "Check system logs, resource usage, and scheduled tasks around 2 PM",
        "Reinstall the application",
        "Tell users to avoid using it at 2 PM"
      ],
      correct: 1,
      explanation: "Investigate the root cause by examining logs, resource usage, and any scheduled tasks that might be causing conflicts at that specific time."
    },
    {
      id: 4,
      scenario: "You discover that a former employee still has active accounts in multiple systems 3 months after leaving. What should you do?",
      options: [
        "Leave the accounts active in case they return",
        "Immediately disable all accounts and document the security incident",
        "Only disable the main domain account",
        "Change the passwords but keep accounts active"
      ],
      correct: 1,
      explanation: "This is a security risk. Immediately disable all accounts, document the incident, and review your offboarding procedures to prevent this in the future."
    },
    {
      id: 5,
      scenario: "Your backup system shows a failed backup for the third consecutive night. The backup window is during business hours tomorrow. What do you do?",
      options: [
        "Wait until tomorrow night to try again",
        "Immediately investigate the failure and attempt manual backup if needed",
        "Skip the backup since you have last week's backup",
        "Run the backup during business hours"
      ],
      correct: 1,
      explanation: "Three consecutive failures indicate a serious problem. Investigate immediately and consider manual backup to ensure data protection."
    },
    {
      id: 6,
      scenario: "A department head requests admin rights on their computer to install software. Company policy prohibits this. How do you handle it?",
      options: [
        "Grant admin rights since they're a department head",
        "Explain the policy, offer to install approved software, and escalate if needed",
        "Ignore the request",
        "Give temporary admin rights for one day"
      ],
      correct: 1,
      explanation: "Follow company policy while providing good customer service. Offer alternatives and escalate through proper channels if necessary."
    },
    {
      id: 7,
      scenario: "Your monitoring system alerts you that CPU usage on the database server has been at 95% for the past hour. What's your immediate action?",
      options: [
        "Restart the database server immediately",
        "Check running processes, active connections, and recent changes",
        "Upgrade the server hardware",
        "Wait to see if it resolves itself"
      ],
      correct: 1,
      explanation: "Investigate what's causing the high CPU usage. Check for runaway processes, unusual queries, or recent changes before taking drastic action."
    },
    {
      id: 8,
      scenario: "A user reports their computer is 'running very slowly' since yesterday. What's your diagnostic approach?",
      options: [
        "Immediately reimage the computer",
        "Check Task Manager, recent software installs, and run antivirus scan",
        "Tell them to restart and call back if it persists",
        "Upgrade their RAM"
      ],
      correct: 1,
      explanation: "Systematically diagnose: check resource usage, recent changes, malware, and startup programs before considering hardware solutions."
    },
    {
      id: 9,
      scenario: "You need to apply critical security patches to 50 servers, but some run 24/7 production applications. What's your approach?",
      options: [
        "Apply patches immediately to all servers",
        "Skip patching the production servers",
        "Plan maintenance windows, test patches, and coordinate with stakeholders",
        "Apply patches only to non-production servers"
      ],
      correct: 2,
      explanation: "Balance security with business continuity. Plan maintenance windows, test patches in a staging environment, and coordinate with business stakeholders."
    },
    {
      id: 10,
      scenario: "A new employee starts Monday but their computer won't be ready until Wednesday. They need to work immediately. What do you do?",
      options: [
        "Tell them to wait until Wednesday",
        "Give them someone else's computer",
        "Provide a temporary laptop/workstation with appropriate access",
        "Let them use their personal device for work"
      ],
      correct: 2,
      explanation: "Provide a temporary solution that maintains security and productivity. A temporary workstation with proper access controls is the best approach."
    },
    {
      id: 11,
      scenario: "Your company's internet connection goes down during peak business hours. What's your priority order?",
      options: [
        "Fix internet, then notify users",
        "Notify users, contact ISP, implement backup connection if available",
        "Wait for ISP to fix it automatically",
        "Tell everyone to go home"
      ],
      correct: 1,
      explanation: "Communicate with users first, then work on solutions. Contact ISP and implement backup connectivity options if available."
    },
    {
      id: 12,
      scenario: "You discover unauthorized software installed on multiple computers during a security audit. What's your response?",
      options: [
        "Immediately uninstall from all computers",
        "Document findings, assess security risk, plan removal strategy, and educate users",
        "Ignore it if it's not causing problems",
        "Report users to HR for policy violation"
      ],
      correct: 1,
      explanation: "Take a systematic approach: document, assess risk, plan removal, and use it as an education opportunity to prevent future incidents."
    },
    {
      id: 13,
      scenario: "A critical server's hard drive shows SMART errors indicating imminent failure. The server hosts important databases. What do you do?",
      options: [
        "Wait until the drive actually fails",
        "Immediately shut down the server",
        "Plan emergency maintenance to replace the drive and verify backups",
        "Continue monitoring the drive"
      ],
      correct: 2,
      explanation: "SMART errors indicate imminent failure. Plan immediate replacement during the next available maintenance window and verify backup integrity."
    },
    {
      id: 14,
      scenario: "Users report that the company website is loading very slowly. You check and find the web server CPU is normal but network traffic is high. What do you investigate?",
      options: [
        "Restart the web server",
        "Check for DDoS attacks, bandwidth usage, and network bottlenecks",
        "Upgrade the web server",
        "Block all external traffic"
      ],
      correct: 1,
      explanation: "High network traffic with normal CPU suggests network issues. Check for attacks, bandwidth consumption, and network infrastructure problems."
    },
    {
      id: 15,
      scenario: "A user accidentally deleted an important file from the shared drive. They need it recovered urgently for a client presentation in 2 hours. What's your approach?",
      options: [
        "Tell them it's gone forever",
        "Check recycle bin, shadow copies, and backups in order of speed",
        "Restore the entire shared drive from backup",
        "Ask other users if they have a copy"
      ],
      correct: 1,
      explanation: "Work through recovery options from fastest to slowest: recycle bin, shadow copies/previous versions, then backups. Time is critical."
    },
    {
      id: 16,
      scenario: "Your organization is implementing a new software system. Users are resistant to change and complaining. How do you support the rollout?",
      options: [
        "Force users to use the new system immediately",
        "Provide training, documentation, and patient support during transition",
        "Revert to the old system",
        "Only help users who ask nicely"
      ],
      correct: 1,
      explanation: "Change management requires patience, training, and support. Help users adapt through education and responsive support."
    },
    {
      id: 17,
      scenario: "You notice unusual network traffic patterns at night when the office should be empty. What should you investigate?",
      options: [
        "Ignore it since no one is working",
        "Check for malware, unauthorized access, and scheduled system tasks",
        "Block all night-time network traffic",
        "Assume it's automatic updates"
      ],
      correct: 1,
      explanation: "Unusual after-hours traffic could indicate security threats, malware, or unauthorized access. Investigate thoroughly."
    },
    {
      id: 18,
      scenario: "A department wants to use a cloud service that hasn't been approved by IT security. They claim it's essential for their work. How do you respond?",
      options: [
        "Block access to the service immediately",
        "Work with security team to evaluate the service and find approved alternatives",
        "Let them use it since it's for work",
        "Tell them to use it secretly"
      ],
      correct: 1,
      explanation: "Balance business needs with security. Work with security to evaluate the service or find approved alternatives that meet their needs."
    },
    {
      id: 19,
      scenario: "Your backup verification shows that 20% of files failed to restore properly during last week's test. What's your next step?",
      options: [
        "Assume the other 80% is good enough",
        "Investigate backup integrity, check storage media, and rerun full backup",
        "Ignore it since it's just a test",
        "Buy new backup software"
      ],
      correct: 1,
      explanation: "20% failure rate is serious. Investigate backup integrity, check for hardware issues, and ensure reliable backup processes."
    },
    {
      id: 20,
      scenario: "A user reports receiving suspicious emails that look like phishing attempts. Several other users mention similar emails. What's your response?",
      options: [
        "Tell users to delete the emails",
        "Alert security team, analyze emails, block sender, and educate all users",
        "Forward the emails to the sender to complain",
        "Ignore it since users can handle it"
      ],
      correct: 1,
      explanation: "Potential phishing is a security incident. Alert security team, analyze the threat, implement blocks, and educate all users about the threat."
    }
  ];

  // Shuffle array function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Shuffle options for a question
  const shuffleQuestion = (question) => {
    const options = [...question.options];
    const correctAnswer = options[question.correct];
    
    const shuffled = shuffleArray(options);
    const newCorrectIndex = shuffled.indexOf(correctAnswer);
    
    return {
      ...question,
      options: shuffled,
      correct: newCorrectIndex
    };
  };

  // Initialize shuffled questions on mount
  useEffect(() => {
    const shuffledQuestionOrder = shuffleArray(situationalQuestions);
    const shuffledWithOptions = shuffledQuestionOrder.map(q => shuffleQuestion(q));
    setShuffledQuestions(shuffledWithOptions);
  }, []);

  const handleAnswer = (optionIndex) => {
    setAnswers({...answers, [currentQuestion]: optionIndex});
  };

  const handleNext = () => {
    if (showResults) {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowResults(false);
      } else {
        setQuizComplete(true);
      }
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuizComplete(false);
    const shuffledQuestionOrder = shuffleArray(situationalQuestions);
    const shuffledWithOptions = shuffledQuestionOrder.map(q => shuffleQuestion(q));
    setShuffledQuestions(shuffledWithOptions);
  };

  const calculateScore = () => {
    let correct = 0;
    shuffledQuestions.forEach((q, index) => {
      if (answers[index] === q.correct) correct++;
    });
    return correct;
  };

  // Show loading state while questions are being shuffled
  if (shuffledQuestions.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading scenarios...</div>
      </div>
    );
  }

  if (quizComplete) {
    const score = calculateScore();
    const percentage = ((score / shuffledQuestions.length) * 100).toFixed(1);
    
    return (
      <div className="completion-container">
        <div className="completion-card">
          <h1 className="completion-title">Scenarios Complete! 🎯</h1>
          <div className="completion-score">
            {score}/{shuffledQuestions.length}
          </div>
          <p className="completion-percentage">Your Score: {percentage}%</p>
          <p className="completion-message">
            {percentage >= 90 ? "Outstanding! You're ready for real-world challenges! 🌟" : 
             percentage >= 80 ? "Excellent problem-solving skills! 👏" :
             percentage >= 70 ? "Good analytical thinking! Keep practicing! 💪" :
             percentage >= 60 ? "Fair understanding. Review scenarios and best practices! 📚" :
             "Keep studying real-world scenarios and best practices! 💡"}
          </p>
          
          <div className="completion-buttons">
            <button onClick={handleRestart} className="restart-button">
              <RotateCcw size={20} />
              Retake Scenarios
            </button>
            <button onClick={onBackToHome} className="restart-button">
              <Home size={20} />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = shuffledQuestions[currentQuestion];
  const userAnswer = answers[currentQuestion];
  const isAnswered = userAnswer !== undefined;

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        {/* Header */}
        <div className="quiz-header">
          <div className="quiz-progress-info">
            <span className="question-badge">
              Scenario {currentQuestion + 1} of {shuffledQuestions.length}
            </span>
            <span className="score-text">
              Score: {calculateScore()}/{currentQuestion + (showResults ? 1 : 0)}
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%`}}
            />
          </div>
        </div>

        {/* Back to Home Button */}
        <button onClick={onBackToHome} className="back-home-button">
          <Home size={16} />
          Back to Home
        </button>

        {/* Scenario */}
        <div className="question-section">
          <div className="scenario-label">Scenario:</div>
          <h2 className="question-text">
            {question.scenario}
          </h2>
        </div>

        {/* Options */}
        <div className="options-container">
          {question.options.map((option, index) => {
            const isSelected = userAnswer === index;
            const isCorrect = index === question.correct;
            const showCorrect = showResults && isCorrect;
            const showIncorrect = showResults && isSelected && !isCorrect;

            let buttonClass = 'option-button';
            if (showCorrect) buttonClass += ' correct';
            else if (showIncorrect) buttonClass += ' incorrect';
            else if (isSelected) buttonClass += ' selected';

            return (
              <button
                key={index}
                onClick={() => !showResults && handleAnswer(index)}
                disabled={showResults}
                className={buttonClass}
              >
                <span className="option-text">
                  {option}
                </span>
                {showCorrect && <CheckCircle color="#10b981" size={24} />}
                {showIncorrect && <XCircle color="#ef4444" size={24} />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResults && (
          <div className={`explanation-box ${
            userAnswer === question.correct ? 'correct' : 'incorrect'
          }`}>
            <h3 className="explanation-title">
              {userAnswer === question.correct ? '✓ Correct!' : '✗ Incorrect'}
            </h3>
            <p className="explanation-text">{question.explanation}</p>
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`next-button ${isAnswered ? 'enabled' : 'disabled'}`}
        >
          {showResults ? (
            currentQuestion < shuffledQuestions.length - 1 ? 'Next Scenario' : 'View Results'
          ) : (
            'Check Answer'
          )}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default SituationalQuiz;
