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
    },
    {
      id: 21,
      scenario: "Your organization's main printer suddenly stops working during a busy period. Multiple departments are affected. What's your troubleshooting priority?",
      options: [
        "Order a new printer immediately",
        "Check power, connections, print queue, and driver status systematically",
        "Tell everyone to email documents instead",
        "Restart all computers connected to the printer"
      ],
      correct: 1,
      explanation: "Follow systematic troubleshooting: check physical connections, power, print spooler service, and drivers before escalating to hardware replacement."
    },
    {
      id: 22,
      scenario: "A department head wants to install personal software on their work computer for a hobby project. How do you handle this request?",
      options: [
        "Install it since they're management",
        "Explain company policy and offer alternatives like personal VM or separate device",
        "Install it but monitor their usage",
        "Report them to HR for inappropriate use"
      ],
      correct: 1,
      explanation: "Maintain policy compliance while being helpful. Explain risks and offer appropriate alternatives that meet their needs without compromising security."
    },
    {
      id: 23,
      scenario: "Your monitoring shows unusual database query patterns at 3 AM when no one should be working. What should you investigate first?",
      options: [
        "Assume it's automated maintenance",
        "Check for unauthorized access, scheduled jobs, and review access logs",
        "Disable the database temporarily",
        "Change all database passwords"
      ],
      correct: 1,
      explanation: "Unusual access patterns could indicate security breaches. Investigate access logs, check for unauthorized users, and review scheduled tasks."
    },
    {
      id: 24,
      scenario: "A critical business application is running slowly for all users. CPU and memory usage appear normal. What's your next diagnostic step?",
      options: [
        "Restart the application server",
        "Check network latency, database performance, and disk I/O",
        "Add more RAM to the server",
        "Tell users to be patient"
      ],
      correct: 1,
      explanation: "When CPU/memory are normal but performance is poor, check network connectivity, database queries, and storage performance."
    },
    {
      id: 25,
      scenario: "You discover that backups have been failing silently for 2 weeks due to insufficient storage space. What's your immediate action plan?",
      options: [
        "Buy more storage and resume backups",
        "Free up space, run manual backup, investigate why alerts failed, then expand storage",
        "Delete old backups to make room",
        "Wait until next week's scheduled maintenance"
      ],
      correct: 1,
      explanation: "Address the immediate risk by freeing space and running manual backup, investigate alert failure, then implement long-term storage solution."
    },
    {
      id: 26,
      scenario: "A new employee needs access to 5 different systems on their first day, but you only have approval for 3. What do you do?",
      options: [
        "Give access to all 5 systems anyway",
        "Provide approved access and escalate remaining requests through proper channels",
        "Give them guest access to everything",
        "Tell them to wait until next week"
      ],
      correct: 1,
      explanation: "Follow security protocols by providing approved access immediately and working through proper approval channels for additional access."
    },
    {
      id: 27,
      scenario: "Users report that file transfers to the server are extremely slow, but web browsing is normal. What should you check?",
      options: [
        "Restart the internet router",
        "Check server disk space, network utilization, and file server performance",
        "Upgrade everyone's internet connection",
        "Tell users to transfer files at night"
      ],
      correct: 1,
      explanation: "Slow file transfers with normal web browsing suggests server-side issues. Check server resources, network congestion, and file server health."
    },
    {
      id: 28,
      scenario: "Your company's website was defaced by hackers. The CEO wants it fixed immediately. What's your response priority?",
      options: [
        "Restore from backup immediately",
        "Take site offline, preserve evidence, investigate breach, then restore securely",
        "Just change the homepage back",
        "Ignore it since it's just cosmetic"
      ],
      correct: 1,
      explanation: "Security incident response: contain the breach, preserve evidence for investigation, identify vulnerabilities, then restore with security improvements."
    },
    {
      id: 29,
      scenario: "A user accidentally sent confidential company data to a competitor via email. They just realized and called you. What do you do?",
      options: [
        "Tell them not to worry about it",
        "Immediately notify security team, legal, and management; document the incident",
        "Ask them to call the competitor to delete it",
        "Delete the email from their sent folder"
      ],
      correct: 1,
      explanation: "Data breach incident requires immediate escalation to security, legal, and management teams. Document everything and follow incident response procedures."
    },
    {
      id: 30,
      scenario: "Your organization is planning to migrate to cloud services. Users are concerned about data security. How do you address this?",
      options: [
        "Tell them cloud is always secure",
        "Provide education on cloud security measures, compliance, and company policies",
        "Agree that cloud is risky and avoid migration",
        "Only migrate non-sensitive data"
      ],
      correct: 1,
      explanation: "Address concerns through education about security measures, compliance standards, encryption, and how the organization will maintain security in the cloud."
    },
    {
      id: 31,
      scenario: "A server's hard drive is at 98% capacity and growing. The server hosts critical databases. What's your immediate action?",
      options: [
        "Delete random files to free space",
        "Analyze disk usage, clean logs/temp files, and plan storage expansion",
        "Shut down the server",
        "Compress all files on the drive"
      ],
      correct: 1,
      explanation: "Analyze what's consuming space (logs, temp files, databases), clean safely, and plan immediate storage expansion to prevent system failure."
    },
    {
      id: 32,
      scenario: "Users report that shared network drives are inaccessible, but they can still access the internet. What's your troubleshooting approach?",
      options: [
        "Restart all user computers",
        "Check file server status, network connectivity, and authentication services",
        "Reinstall network drivers on all computers",
        "Reset the network switch"
      ],
      correct: 1,
      explanation: "Network drives failing while internet works suggests file server or authentication issues. Check server status, network paths, and domain authentication."
    },
    {
      id: 33,
      scenario: "A department wants to use a new software tool that requires admin rights to install. Company policy prohibits this. How do you handle it?",
      options: [
        "Grant temporary admin rights",
        "Evaluate the software, test in sandbox, and install centrally if approved",
        "Tell them they can't use it",
        "Let them install it on one computer as a test"
      ],
      correct: 1,
      explanation: "Balance business needs with security by evaluating the software through proper channels, testing safely, and implementing centrally if approved."
    },
    {
      id: 34,
      scenario: "Your monitoring alerts show that the mail server's CPU has been at 100% for 6 hours. Email delivery is delayed. What do you investigate?",
      options: [
        "Restart the mail server immediately",
        "Check for spam attacks, large attachments, mail queue size, and resource usage",
        "Disable email temporarily",
        "Add more CPU to the server"
      ],
      correct: 1,
      explanation: "High CPU on mail server could indicate spam attacks, large mail queues, or resource issues. Investigate the cause before taking action."
    },
    {
      id: 35,
      scenario: "A user reports their computer is infected with malware. Other users nearby are concerned. What's your immediate response?",
      options: [
        "Tell other users not to worry",
        "Isolate infected computer, run security scan, and check network for spread",
        "Reimage the computer immediately",
        "Install antivirus on all nearby computers"
      ],
      correct: 1,
      explanation: "Contain the infection by isolating the computer, assess the threat, check for network spread, then clean or reimage as appropriate."
    },
    {
      id: 36,
      scenario: "Your organization's internet connection is working but very slow during business hours. What should you investigate?",
      options: [
        "Upgrade the internet plan immediately",
        "Check bandwidth usage, identify heavy users/applications, and analyze traffic patterns",
        "Restart the router every hour",
        "Block all streaming websites"
      ],
      correct: 1,
      explanation: "Analyze bandwidth usage to identify what's consuming capacity. Look for heavy applications, unauthorized usage, or network issues before upgrading."
    },
    {
      id: 37,
      scenario: "A critical server shows memory usage at 95% consistently. Applications are starting to crash. What's your approach?",
      options: [
        "Restart the server during business hours",
        "Identify memory-consuming processes, check for leaks, plan memory upgrade",
        "Kill random processes to free memory",
        "Ignore it since 95% isn't 100%"
      ],
      correct: 1,
      explanation: "Identify what's consuming memory, check for memory leaks, optimize applications, and plan hardware upgrade during appropriate maintenance window."
    },
    {
      id: 38,
      scenario: "Users report that the company intranet is down, but external websites work fine. What's your troubleshooting priority?",
      options: [
        "Restart all user computers",
        "Check internal web server, DNS settings, and internal network connectivity",
        "Contact the internet service provider",
        "Reinstall web browsers on all computers"
      ],
      correct: 1,
      explanation: "Internal sites down while external sites work indicates internal server or DNS issues. Check web server status and internal network configuration."
    },
    {
      id: 39,
      scenario: "A user accidentally deleted an entire folder of important project files. They need it recovered urgently for a client meeting in 1 hour. What do you do?",
      options: [
        "Tell them the files are gone forever",
        "Check recycle bin, shadow copies, and recent backups in order of speed",
        "Restore the entire server from last night's backup",
        "Ask the client to reschedule the meeting"
      ],
      correct: 1,
      explanation: "Work through recovery options from fastest to slowest: recycle bin, shadow copies/previous versions, then targeted backup restoration."
    },
    {
      id: 40,
      scenario: "Your organization is implementing new security policies that require complex passwords. Users are complaining and asking for exceptions. How do you respond?",
      options: [
        "Grant exceptions to avoid complaints",
        "Explain security importance, provide password manager training, and enforce consistently",
        "Implement the policy only for IT staff",
        "Delay implementation until users are happier"
      ],
      correct: 1,
      explanation: "Security policies must be enforced consistently. Provide education, training on password managers, and support while maintaining security standards."
    },
    {
      id: 41,
      scenario: "A power outage affected your data center. Servers are back online but some services aren't starting automatically. What's your systematic approach?",
      options: [
        "Restart all servers again",
        "Check service dependencies, start core services first, then dependent services",
        "Wait for everything to start automatically",
        "Call the power company to complain"
      ],
      correct: 1,
      explanation: "Follow service dependency order: start core infrastructure services (DNS, DHCP, domain controllers) first, then application services that depend on them."
    },
    {
      id: 42,
      scenario: "Users report that video conferences are choppy and audio cuts out frequently. Other network applications work fine. What should you investigate?",
      options: [
        "Upgrade everyone's computers",
        "Check network QoS settings, bandwidth allocation, and video conferencing server performance",
        "Tell users to use phone calls instead",
        "Restart the internet connection"
      ],
      correct: 1,
      explanation: "Video conferencing issues while other apps work suggests QoS, bandwidth prioritization, or video server problems. Check network configuration and server performance."
    },
    {
      id: 43,
      scenario: "A user reports they can't log into their computer. They say they haven't changed their password. What's your troubleshooting sequence?",
      options: [
        "Reset their password immediately",
        "Check account lockout status, recent password changes, and domain connectivity",
        "Reimage their computer",
        "Tell them to try again later"
      ],
      correct: 1,
      explanation: "Check account status first: lockouts, expiration, domain connectivity. Verify the issue before resetting passwords or taking drastic action."
    },
    {
      id: 44,
      scenario: "Your backup verification test shows that 15% of files are corrupted and can't be restored. What's your immediate action plan?",
      options: [
        "Assume 85% success rate is acceptable",
        "Investigate backup media, check for hardware issues, and run new full backup",
        "Switch to a different backup software",
        "Only backup the files that worked before"
      ],
      correct: 1,
      explanation: "15% corruption rate is critical. Investigate backup media integrity, check for hardware failures, and ensure reliable backup processes before data loss occurs."
    },
    {
      id: 45,
      scenario: "A department head requests immediate access to another employee's email account to check for important messages while they're on sick leave. How do you respond?",
      options: [
        "Grant access immediately since they're management",
        "Follow proper authorization procedures, involve HR and legal if necessary",
        "Give read-only access to be safe",
        "Forward all emails to the department head"
      ],
      correct: 1,
      explanation: "Email access requires proper authorization through HR and legal channels. Privacy laws and company policies must be followed even for management requests."
    },
    {
      id: 46,
      scenario: "Your organization's main database server is running out of storage space rapidly. It's projected to be full in 2 days. What's your action plan?",
      options: [
        "Wait until it's completely full",
        "Immediately plan storage expansion, archive old data, and implement monitoring",
        "Delete the oldest records",
        "Stop all database writes"
      ],
      correct: 1,
      explanation: "Act quickly: plan immediate storage expansion, identify data for archiving, implement better monitoring, and ensure business continuity."
    },
    {
      id: 47,
      scenario: "Users report that a specific application crashes frequently, but only on certain computers. Other applications work fine on those computers. What do you investigate?",
      options: [
        "Reinstall the application on all computers",
        "Check application compatibility, system requirements, and specific computer configurations",
        "Replace the problematic computers",
        "Tell users to avoid using that application"
      ],
      correct: 1,
      explanation: "Application-specific issues on certain computers suggest compatibility problems. Check system requirements, configurations, and environmental differences."
    },
    {
      id: 48,
      scenario: "Your monitoring system detects unusual outbound network traffic from multiple computers during off-hours. What's your security response?",
      options: [
        "Block all outbound traffic",
        "Investigate for malware, check traffic destinations, and isolate affected systems",
        "Ignore it since it's after hours",
        "Restart all computers showing the traffic"
      ],
      correct: 1,
      explanation: "Unusual outbound traffic could indicate malware or data exfiltration. Investigate traffic patterns, destinations, and isolate potentially compromised systems."
    },
    {
      id: 49,
      scenario: "A user reports that emails are being sent from their account without their knowledge. They're concerned about account compromise. What's your immediate response?",
      options: [
        "Tell them to change their password",
        "Immediately disable account, check for compromise, review sent items, and investigate",
        "Run antivirus on their computer",
        "Forward the suspicious emails to spam folder"
      ],
      correct: 1,
      explanation: "Potential account compromise requires immediate containment: disable account, investigate extent of compromise, check for data access, then secure and restore access."
    },
    {
      id: 50,
      scenario: "Your organization is planning a major software upgrade that will require 4 hours of downtime. How do you minimize business impact?",
      options: [
        "Do the upgrade during regular business hours",
        "Plan upgrade during off-hours, communicate timeline, prepare rollback plan, and test thoroughly",
        "Upgrade one computer at a time during work hours",
        "Skip testing to save time"
      ],
      correct: 1,
      explanation: "Minimize impact through careful planning: schedule during off-hours, communicate clearly, prepare rollback procedures, and test thoroughly in staging environment."
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
