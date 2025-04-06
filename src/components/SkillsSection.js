import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaJs, FaPython, FaHtml5, FaLinux } from 'react-icons/fa';
import { SiCplusplus } from 'react-icons/si';
import { GiCircuitry, GiRobotGolem } from 'react-icons/gi';

const SkillsWrapper = styled.section`
  padding: 3rem 2rem;
  background: ${({ theme }) => theme.background};
  text-align: center;
`;

const SkillsTitle = styled.h2`
  color: ${({ theme }) => theme.accent};
  margin-bottom: 2rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
`;

const SkillCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    transform: translateY(-5px);
  }
`;

const SkillIcon = styled.div`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.accent};
  font-size: 2.5rem;
`;

const SkillName = styled.h3`
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const SkillDescription = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
`;


const skillsData = [
  {
    name: "JavaScript",
    description: "React, Node.js, and more",
    icon: <FaJs />
  },
  {
    name: "Python",
    description: "Data Analysis, Scripting, Automation",
    icon: <FaPython />
  },
  {
    name: "IoT",
    description: "Embedded Systems, Sensors, Raspberry Pi",
    icon: <GiCircuitry />
  },
  {
    name: "Robotics",
    description: "Arduino, ESP, Automation",
    icon: <GiRobotGolem />
  },
  {
    name: "Web Development",
    description: "React, HTML, CSS, Vue, Responsive Design, APIs",
    icon: <FaHtml5 />
  },
  {
    name: "Linux & Networking",
    description: "Linux CLI, Shell Scripting, SSH, Networking Basics, System Admin",
    icon: <FaLinux />
  }
];

const SkillsSection = () => {
  return (
    <SkillsWrapper>
      <SkillsTitle>My Skills</SkillsTitle>
      <SkillsGrid>
        {skillsData.map((skill, index) => (
          <SkillCard
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SkillIcon>{skill.icon}</SkillIcon>
            <SkillName>{skill.name}</SkillName>
            <SkillDescription>{skill.description}</SkillDescription>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsWrapper>
  );
};

export default SkillsSection;