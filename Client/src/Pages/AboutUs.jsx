import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaLinkedin, FaGithub, FaEnvelope, FaHeart, FaLightbulb, FaUsers, FaHandshake, FaChartLine, FaCode, FaRocket, FaAward } from "react-icons/fa";

const AboutUs = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const currentUser = 'AbdoMohamed26';

  // Update current date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')} ${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}`;
      setCurrentDateTime(formatted);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const teamMembers = [
    {
      name: "Abdo Mohamed",
      role: "Frontend Developer",
      image: "/Assets/Images/Abdo.jpg",
      description: "Abdo is a skilled frontend developer specializing in modern web technologies. He creates responsive and interactive user interfaces using React and Tailwind CSS.",
      skills: ["React", "Tailwind CSS", "JavaScript", "HTML/CSS"],
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com/AbdoMohamed26",
        email: "abdo@example.com"
      }
    },
    {
      name: "Mohamed Magdy",
      role: "Backend Developer",
      image: "/Assets/Images/Mohamed Magdy.jpeg",
      description: "Mohamed is a skilled backend developer specializing in PHP and Laravel, building robust and scalable web applications.",
      skills: ["PHP", "Laravel", "MySQL", "RESTful APIs"],
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        email: "mohamed@example.com"
      }
    },
    {
      name: "Abdo Saleh",
      role: "Backend Developer",
      image: "/Assets/Images/Abdo Saleh.jpeg", 
      description: "Abdo is a skilled backend developer specializing in PHP and Laravel, building secure and high-performance web applications.",
      skills: ["PHP", "Laravel", "MySQL", "RESTful APIs"],
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        email: "abdosaleh@example.com"
      }
    },
    {
      name: "Amr Mohamed",
      role: "AI Engineer",
      image: "/Assets/Images/Amr Mohamed.jpeg",
      description: "Amr is an AI specialist focused on developing intelligent solutions and machine learning models to enhance our applications.",
      skills: ["Machine Learning", "Deep Learning", "Python", "TensorFlow"],
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        email: "amr@example.com"
      }
    }
  ];

  const values = [
    { icon: <FaHeart />, text: "Customer-Centric Approach" },
    { icon: <FaLightbulb />, text: "Innovation and Creativity" },
    { icon: <FaUsers />, text: "Teamwork and Collaboration" },
    { icon: <FaHandshake />, text: "Transparency and Integrity" }
  ];

  const stats = [
    { icon: <FaChartLine />, number: "100+", text: "Projects Completed" },
    { icon: <FaUsers />, number: "50+", text: "Happy Clients" },
    { icon: <FaCode />, number: "10+", text: "Years Experience" },
    { icon: <FaAward />, number: "25+", text: "Industry Awards" }
  ];

  const whyChooseUs = [
    {
      icon: <FaRocket />,
      title: "Cutting-Edge Technology",
      description: "We stay ahead of the curve by adopting the latest technologies and best practices."
    },
    {
      icon: <FaCode />,
      title: "Custom Solutions",
      description: "Every project is unique, and we tailor our solutions to meet your specific needs."
    },
    {
      icon: <FaUsers />,
      title: "Expert Team",
      description: "Our team consists of highly skilled professionals with years of industry experience."
    },
    {
      icon: <FaAward />,
      title: "Proven Track Record",
      description: "We have a history of delivering successful projects on time and within budget."
    }
  ];

  return (
    <div className="about-page">
      {/* DateTime and User Info Bar */}
      <div className="info-bar">
        <div className="info-content">
          <div className="datetime">
            <span className="label">Current UTC Time:</span>
            <span className="value">{currentDateTime}</span>
          </div>
          <div className="user-info">
            <span className="label">Welcome,</span>
            <span className="value">{currentUser}</span>
          </div>
        </div>
      </div>

      <Container>
        <div className="page-header animate-fade-down">
          <h1 className="title">About Us</h1>
          <p className="subtitle">
            We are a passionate team dedicated to building amazing web applications that make a difference.
          </p>
        </div>

        <Row className="team-section">
          {teamMembers.map((member, index) => (
            <Col md={3} sm={6} key={index}>
              <div className={`animate-fade-up delay-${index}`}>
                <Card className="team-card">
                  <div className="image-wrapper">
                    <Card.Img
                      src={member.image}
                      alt={member.name}
                      className="team-image"
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="member-name">{member.name}</Card.Title>
                    <Card.Subtitle className="member-role">{member.role}</Card.Subtitle>
                    <Card.Text className="member-description">
                      {member.description}
                    </Card.Text>
                    <div className="skills-section">
                      {member.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                    <div className="social-links">
                      <a href={member.social.linkedin} className="social-icon linkedin" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                      </a>
                      <a href={member.social.github} className="social-icon github" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                      </a>
                      <a href={`mailto:${member.social.email}`} className="social-icon email">
                        <FaEnvelope />
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>

        <div className="mission-section animate-fade-up delay-3">
          <Card className="mission-card">
            <Card.Body>
              <h2 className="section-title">Our Mission</h2>
              <p className="mission-text">
                Our mission is to deliver high-quality software solutions that empower businesses and individuals to
                achieve their goals. We believe in innovation, collaboration, and continuous improvement. We strive to
                create digital experiences that are not only functional but also delightful to use, helping our clients
                stay ahead in an ever-evolving technological landscape.
              </p>
            </Card.Body>
          </Card>
        </div>

        {/* Why Choose Us Section */}
        <div className="why-choose-us-section animate-fade-up delay-4">
          <h2 className="section-title">Why Choose Us</h2>
          <Row className="why-choose-us-grid">
            {whyChooseUs.map((item, index) => (
              <Col md={3} sm={6} key={index}>
                <div className="why-choose-us-card">
                  <div className="why-choose-us-icon">{item.icon}</div>
                  <h3 className="why-choose-us-title">{item.title}</h3>
                  <p className="why-choose-us-description">{item.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <div className="values-section animate-fade-up delay-5">
          <h2 className="section-title">Our Values</h2>
          <Row className="values-grid">
            {values.map((value, index) => (
              <Col md={3} sm={6} key={index}>
                <div className="value-card">
                  <div className="value-icon">{value.icon}</div>
                  <p className="value-text">{value.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>

      <style>
        {`
          .about-page {
            padding-top: 0;
            background: #f8fafc;
            min-height: 100vh;
            font-family: 'Inter', sans-serif;
          }

          .info-bar {
            background: rgba(33, 37, 41, 0.95);
            padding: 0.5rem 0;
            backdrop-filter: blur(10px);
            margin-bottom: 2rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }

          .info-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
          }

          .datetime, .user-info {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .label {
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.9rem;
          }

          .value {
            color: #007BFF;
            font-weight: 600;
            font-family: 'Inter', monospace;
          }

          .page-header {
            text-align: center;
            margin-bottom: 4rem;
            padding-top: 2rem;
          }

          .title {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            color: #1e293b;
            letter-spacing: -0.025em;
          }

          .subtitle {
            font-size: 1.2rem;
            color: #64748b;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
          }

          .stats-section {
            margin-bottom: 4rem;
          }

          .stat-card {
            background: #ffffff;
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            transition: transform 0.3s ease;
            margin-bottom: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          }

          .stat-card:hover {
            transform: translateY(-5px);
          }

          .stat-icon {
            font-size: 2.5rem;
            color: #007BFF;
            margin-bottom: 1rem;
          }

          .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 0.5rem;
          }

          .stat-text {
            color: #64748b;
            font-weight: 500;
          }

          .team-card {
            background: #ffffff;
            border: none;
            border-radius: 16px;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            height: 100%;
            margin-bottom: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          }

          .team-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }

          .image-wrapper {
            padding: 1.5rem;
            background: linear-gradient(45deg,rgb(255, 255, 255),rgb(161, 202, 216));
          }

          .team-image {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 4px solid white;ك
            margin: 0 auto;
            display: block;
            object-fit: cover;
          }

          .member-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1e293b;
          }

          .member-role {
            color: #007BFF;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          .skills-section {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 1rem 0;
          }

          .skill-tag {
            background: #e3f2fd;
            color: #007BFF;
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.85rem;
            font-weight: 500;
          }

          .social-links {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 1.5rem;
          }

          .social-icon {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            color: white;
            transition: transform 0.3s ease;
          }

          .social-icon:hover {
            transform: translateY(-3px);
          }

          .social-icon.linkedin { background: #0077b5; }
          .social-icon.github { background: #333; }
          .social-icon.email { background: #ea4335; }

          .mission-card {
            background: #ffffff;
            border: none;
            border-radius: 16px;
            margin: 4rem 0;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          }

          .section-title {
            text-align: center;
            font-size: 2.25rem;
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 2rem;
            letter-spacing: -0.025em;
          }

          .why-choose-us-section {
            margin: 4rem 0;
          }

          .why-choose-us-card {
            background: #ffffff;
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            transition: transform 0.3s ease;
            margin-bottom: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          }

          .why-choose-us-card:hover {
            transform: translateY(-5px);
          }

          .why-choose-us-icon {
            font-size: 2.5rem;
            color: #007BFF;
            margin-bottom: 1rem;
          }

          .why-choose-us-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 1rem;
          }

          .why-choose-us-description {
            color: #64748b;
            font-size: 0.95rem;
            line-height: 1.6;
          }

          .value-card {
            background: #ffffff;
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            transition: transform 0.3s ease;
            margin-bottom: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          }

          .value-card:hover {
            transform: translateY(-5px);
          }

          .value-icon {
            font-size: 2.5rem;
            color: #007BFF;
            margin-bottom: 1rem;
          }

          .value-text {
            color: #64748b;
            font-weight: 500;
            line-height: 1.6;
          }

          /* Animations */
          .animate-fade-down {
            animation: fadeDown 0.6s ease forwards;
          }

          .animate-fade-up {
            animation: fadeUp 0.6s ease forwards;
          }


          @keyframes fadeDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            .title {
              font-size: 2.5rem;
            }

            .info-content {
              flex-direction: column;
              gap: 0.5rem;
              text-align: center;
            }

            .datetime, .user-info {
              justify-content: center;
            }

            .team-card, .stat-card, .value-card, .why-choose-us-card {
              margin-bottom: 2rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AboutUs;