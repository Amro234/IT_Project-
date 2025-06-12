import React from "react";
import { FaHeart, FaLightbulb, FaUsers, FaHandshake, FaChartLine, FaAward, FaCode, FaRocket, FaQuoteLeft, FaLinkedin } from "react-icons/fa";

const teamMembers = [
  {
    name: "Abdo Mohamed",
    role: "Frontend Developer",
    image: "/Assets/Images/Abdo.jpg",
    description: "Specializes in modern web technologies and creates responsive UIs.",
    linkedin: "https://linkedin.com/in/abdelrahman-mohamed-8a33b9207"
  },
  {
    name: "Mohamed Magdy",
    role: "Backend Developer",
    image: "/Assets/Images/Mohamed Magdy.jpeg",
    description: "Expert in PHP and Laravel, building robust web applications.",
    linkedin: "https://www.linkedin.com/in/mohamed-magdy-80292b28b/"
  },
  {
    name: "Abdo Saleh",
    role: "Backend Developer",
    image: "/Assets/Images/Abdo Saleh.jpeg",
    description: "Focuses on secure and high-performance backend systems.",
    linkedin: "https://www.linkedin.com/in/abdelrahman-saleh-389958220/"
  },
  {
    name: "Amr Mohamed",
    role: "AI Engineer",
    image: "/Assets/Images/Amr Mohamed.jpeg",
    description: "Develops intelligent solutions and machine learning models.",
    linkedin: "https://www.linkedin.com/in/amr-mohamed-193813292/"
  },
];

const values = [
  { icon: <FaHeart />, text: "Customer-Centric" },
  { icon: <FaLightbulb />, text: "Innovation" },
  { icon: <FaUsers />, text: "Teamwork" },
  { icon: <FaHandshake />, text: "Integrity" },
];

const stats = [
  { icon: <FaChartLine />, number: "100+", text: "Projects" },
  { icon: <FaUsers />, number: "50+", text: "Clients" },
  { icon: <FaCode />, number: "10+", text: "Years" },
  { icon: <FaAward />, number: "25+", text: "Awards" },
];

const testimonials = [
  { name: "Client 1", text: "Amazing team and great results!", img: "/Assets/Images/client1.jpg" },
  { name: "Client 2", text: "Professional and creative solutions.", img: "/Assets/Images/client2.jpg" },
  { name: "Client 3", text: "Fast delivery and excellent support.", img: "/Assets/Images/client3.jpg" },
  { name: "Client 4", text: "Highly recommended for any business.", img: "/Assets/Images/client4.jpg" },
  { name: "Client 5", text: "Creative ideas and great communication.", img: "/Assets/Images/client5.jpg" },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-inter">
      {/* Team Carousel */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10 text-[#2563eb]">Meet the Team</h2>
        <div className="flex overflow-x-auto gap-8 pb-4">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="min-w-[220px] bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition">
              <img src={member.image} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100" alt={member.name} />
              <h3 className="font-bold text-xl text-[#1e293b]">{member.name}</h3>
              <p className="text-blue-500 font-semibold mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm mb-2">
                {member.name === "Abdo Mohamed" && "Frontend developer specializing in modern web technologies, building responsive and intuitive user interfaces that enhance user experience."}
                {member.name === "Mohamed Magdy" && "Backend developer with expertise in PHP and Laravel, delivering robust and scalable web applications tailored to business needs."}
                {member.name === "Abdo Saleh" && "Backend developer focused on secure, high-performance systems and seamless API integrations for reliable digital solutions."}
                {member.name === "Amr Mohamed" && "AI engineer passionate about developing intelligent solutions and machine learning models to drive innovation and efficiency."}
              </p>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm mt-1">
                <FaLinkedin className="inline text-blue-500" />
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-12">
        <h2 className="text-2xl font-bold text-center mb-8 text-[#2563eb]">What Our Clients Say</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="max-w-sm bg-blue-50 rounded-xl p-6 shadow text-center flex flex-col items-center">
              <FaQuoteLeft className="text-blue-400 text-2xl mb-2 mx-auto" />
              <p className="text-gray-700 mb-4 italic">"{t.text}"</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-blue-300" />
                <span className="font-bold text-blue-700 text-base">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;