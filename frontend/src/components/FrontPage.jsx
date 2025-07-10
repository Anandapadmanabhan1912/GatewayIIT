import React from 'react';

const FrontPage = ({onStart}) => {
  const instituteLogos = [
    { name: "IIT Kharagpur", logo: "/images/iitkgp.png" },
    { name: "IIT Bombay", logo: "/images/iitbom.png" },
    { name: "IIT Delhi", logo: "/images/iitd.png" },
    { name: "IIT Madras", logo: "/images/iitm.png" },
    { name: "IIT Kanpur", logo: "/images/iitk.png" },
    { name: "IIT Roorkee", logo: "/images/iitr.png" },
    { name: "IIT Guwahati", logo: "/images/iitg.png" },
    { name: "IISc Bangalore", logo: "/images/iisc.png" }
  ];

  const instructions = [
    "The PDFs are to be downloaded from the official site to get the best matches and larger question set.",
    "In case the answers and questions are in different PDFs merge them into a single PDF and upload",
    "Wait for it to extract questions and form a Quiz.",
    "The mark each question carries is clearly mentioned (along with negative marking if any)",
    "The Quiz shall automatically submit once the time limit elapses.",
    "Numerical Answer Type can be answered using the Keyboard",
    "Your choices can be cleared using 'Clear Choice' button."
  ];

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center',
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      marginBottom: '30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    logo: {
      width: '80px',
      height: '80px',
      backgroundColor: '#2563eb',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      color: 'white',
      fontSize: '36px',
      fontWeight: 'bold'
    },
    title: {
      fontSize: '48px',
      color: '#1f2937',
      margin: '0 0 10px 0',
      fontWeight: 'bold'
    },
    subtitle: {
      fontSize: '20px',
      color: '#6b7280',
      margin: '0'
    },
    section: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      marginBottom: '30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    sectionTitle: {
      fontSize: '28px',
      color: '#1f2937',
      marginBottom: '20px',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    institutesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    },
    instituteCard: {
      textAlign: 'center',
      padding: '20px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: '#f9fafb'
    },
    instituteLogo: {
      width: '60px',
      height: '60px',
      backgroundColor: '#dbeafe',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 10px',
      color: '#2563eb',
      fontWeight: 'bold',
      fontSize: '14px'
    },
    instructionsList: {
      listStyle: 'none',
      padding: '0'
    },
    instructionItem: {
      padding: '15px',
      marginBottom: '10px',
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      borderLeft: '4px solid #2563eb'
    },
    instructionNumber: {
      fontWeight: 'bold',
      color: '#2563eb',
      marginRight: '10px'
    },
    link: {
      color: '#2563eb',
      textDecoration: 'underline'
    },
    button: {
      display: 'block',
      width: '300px',
      margin: '30px auto',
      padding: '15px 30px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '20px',
      fontWeight: 'bold',
      cursor: 'pointer'
    },
    footer: {
      textAlign: 'center',
      padding: '20px',
      color: '#6b7280',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>G</div>
        <h1 style={styles.title}>GatewayIIT</h1>
        <p style={styles.subtitle}>GATE Mock Test Application</p>
      </div>

      {/* Institutes Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Conducting Institutes</h2>
        <div style={styles.institutesGrid}>
          {instituteLogos.map((institute, index) => (
            <div key={index} style={styles.instituteCard}>
              <div style={styles.instituteLogo}>
                <img 
                  src={institute.logo} 
                  alt={institute.name}
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{
                  display: 'none',
                  width: '50px',
                  height: '50px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563eb',
                  fontWeight: 'bold',
                  fontSize: '12px'
                }}>
                  {institute.name.split(' ')[1]}
                </div>
              </div>
              <p>{institute.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>How to Use the Application</h2>
        <ul style={styles.instructionsList}>
          {instructions.map((instruction, index) => (
            <li key={index} style={styles.instructionItem}>
              <span style={styles.instructionNumber}>{index + 1}.</span>
              {index === 0 ? (
                <>
                  {instruction.split('(')[0]}
                  (Download from: <a href="https://gate.iitkgp.ac.in/old_question_papers.html" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     style={styles.link}>
                    OFFICIAL WEBSITE of IIT KGP
                  </a>)
                </>
              ) : (
                instruction
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <button style={styles.button} onClick={onStart}>
        Start Mock Test
      </button>

      {/* Footer */}
      <div style={styles.footer}>
        <p>© 2025 GatewayIIT - Your Gateway to IIT Success</p>
      </div>
    </div>
  );
};

export default FrontPage;