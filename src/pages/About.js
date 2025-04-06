import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const AboutWrapper = styled.div`
  padding: 3rem 2rem;
  min-height: 80vh;
  background: #121212;
  font-family: 'Roboto', sans-serif;
  color: #e0e0e0;
  position: relative;
  overflow: hidden;
`;

const Header = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 1rem 0;
  position: relative;
  z-index: 2;
`;

const Link = styled.a`
  color: #bb86fc;
  font-weight: bold;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
  &:hover {
    border-color: #bb86fc;
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const EasterEggButton = styled(motion.button)`
  display: block;
  margin: 2rem auto;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(45deg, #ff6ec4, #7873f5);
  border: none;
  border-radius: 50px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  z-index: 2;
  animation: ${pulse} 2s infinite;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HiddenContainer = styled(motion.div)`
  background: rgba(18, 18, 18, 0.95);
  border: 2px solid #bb86fc;
  border-radius: 10px;
  padding: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  max-width: 500px;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  box-shadow: 0 8px 16px rgba(0,0,0,0.5);
  animation: ${fadeIn} 0.5s ease-out;
`;

const HiddenClose = styled.button`
  background: transparent;
  border: none;
  font-size: 1.2rem;
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  color: #e0e0e0;
`;

const particleAnimation = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) scale(0.5);
    opacity: 0;
  }
`;

const Particle = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  animation: ${particleAnimation} 8s linear infinite;
`;

const generateParticles = (num) => {
  let particles = [];
  for (let i = 0; i < num; i++) {
    const size = Math.random() * 8 + 4;
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    particles.push(
      <Particle 
        key={i} 
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${delay}s`
        }} 
      />
    );
  }
  return particles;
};

const About = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleEasterEggClick = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <AboutWrapper>
      {generateParticles(30)}
      <Header>About Me</Header>
      <Paragraph>
        I’m a 17-year-old programmer passionate about IoT and Robotics—constantly exploring innovative ways to merge technology with everyday life.
      </Paragraph>
      <Paragraph>
        I hide clever secrets and interactive surprises in my work; a treasure hunt for those with a keen eye.
      </Paragraph>
      <Paragraph>
        Curious? Discover more on&nbsp;
        <Link href="https://github.com/NavIshanOp" target="_blank" rel="noopener noreferrer">
          GitHub
        </Link>
        &nbsp;and&nbsp;
        <Link href="https://www.linkedin.com/in/ishan-jaiswal-2a799a30a/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Link>.
      </Paragraph>
      <EasterEggButton 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleEasterEggClick}
      >
        Reveal the Hidden Secret
      </EasterEggButton>
      <AnimatePresence>
        {showModal && (
          <HiddenContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <HiddenClose onClick={handleCloseModal}>×</HiddenClose>
            <h3>Secret Unlocked!</h3>
            <Paragraph>
              The magic lies in discovery. Sometimes, the answer is hidden in plain sight—keep exploring and experimenting.
            </Paragraph>
            <Paragraph>
              [Easter Egg Code: <code>{`if (curiosity > 100) { innovate(); }`}</code>]
            </Paragraph>
          </HiddenContainer>
        )}
      </AnimatePresence>
    </AboutWrapper>
  );
};

export default About;