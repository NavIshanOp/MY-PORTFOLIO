import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// ============ Global Styles & Animations ============

const AboutWrapper = styled(motion.div)`
  padding: 3rem 2rem;
  min-height: 80vh;
  background: #121212;
  font-family: 'Roboto', sans-serif;
  color: #e0e0e0;
  position: relative;
  overflow: hidden;
  @media (max-width: 600px) {
    padding: 2rem 1rem;
  }
`;

const Header = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Paragraph = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 1rem 0;
  position: relative;
  z-index: 2;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const Link = styled(motion.a)`
  color: #bb86fc;
  font-weight: bold;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
  &:hover {
    border-color: #bb86fc;
  }
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
  @media (max-width: 600px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;

// ============ Modal Styles ============

const ModalContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  color: #e0e0e0;
  text-align: center;
`;

const HiddenClose = styled(motion.button)`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #bb86fc;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #ff6ec4;
  }
`;

// ============ Animation Variants ============

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ============ Particle Background ============

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

// ============ Confetti Effect ============

const confettiFall = keyframes`
  0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
`;

const ConfettiPiece = styled.div`
  position: absolute;
  top: -10px;
  width: 10px;
  height: 10px;
  background-color: ${props => props.color || '#fff'};
  opacity: 0.9;
  transform: rotate(${props => props.rotation}deg);
  animation: ${confettiFall} ${props => props.duration}s linear forwards;
  left: ${props => props.left}%;
`;

const ConfettiContainer = ({ pieces }) => {
  return (
    <>
      {pieces.map((piece, index) => (
        <ConfettiPiece
          key={index}
          color={piece.color}
          rotation={piece.rotation}
          duration={piece.duration}
          left={piece.left}
        />
      ))}
    </>
  );
};

const generateConfetti = (count = 20) => {
  let pieces = [];
  const colors = ['#ff6ec4', '#7873f5', '#03dac6', '#bb86fc', '#ffb74d'];
  for (let i = 0; i < count; i++) {
    pieces.push({
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.floor(Math.random() * 360),
      duration: Math.random() * 2 + 2,
      left: Math.random() * 100,
    });
  }
  return pieces;
};

// ============ Main About Component with Animations ============

const About = () => {
  const [showModal, setShowModal] = useState(false);
  const [showBonusModal, setShowBonusModal] = useState(false);
  const [showLongPressModal, setShowLongPressModal] = useState(false);
  const [headerTapCount, setHeaderTapCount] = useState(0);
  const [confettiPieces, setConfettiPieces] = useState([]);

  const triggerConfetti = () => {
    setConfettiPieces(generateConfetti(30));
    setTimeout(() => {
      setConfettiPieces([]);
    }, 3000);
  };

  const handleEasterEggClick = () => {
    setShowModal(true);
    triggerConfetti();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseBonusModal = () => {
    setShowBonusModal(false);
  };

  const handleCloseLongPressModal = () => {
    setShowLongPressModal(false);
  };

  const handleHeaderTap = () => {
    setHeaderTapCount(prev => prev + 1);
    if (headerTapCount + 1 >= 3) {
      setShowBonusModal(true);
      triggerConfetti();
      setHeaderTapCount(0);
    }
  };

  let pressTimer = null;
  const handleParagraphMouseDown = () => {
    pressTimer = setTimeout(() => {
      setShowLongPressModal(true);
      triggerConfetti();
    }, 1000);
  };

  const handleParagraphMouseUp = () => {
    clearTimeout(pressTimer);
  };

  return (
    <AboutWrapper
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {generateParticles(30)}
      {confettiPieces.length > 0 && <ConfettiContainer pieces={confettiPieces} />}
      <Header
        onClick={handleHeaderTap}
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
      >
        About Me
      </Header>
      <Paragraph
        onMouseDown={handleParagraphMouseDown}
        onMouseUp={handleParagraphMouseUp}
        onTouchStart={handleParagraphMouseDown}
        onTouchEnd={handleParagraphMouseUp}
        variants={itemVariants}
      >
        I’m a 17-year-old programmer passionate about IoT and Robotics—constantly exploring innovative ways to merge technology with everyday life.
      </Paragraph>
      <Paragraph variants={itemVariants}>
        I hide clever secrets and interactive surprises in my work; a treasure hunt for those with a keen eye.
      </Paragraph>
      <Paragraph variants={itemVariants}>
        Curious? Discover more on&nbsp;
        <Link
          href="https://github.com/NavIshanOp"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ textDecoration: 'underline' }}
        >
          GitHub
        </Link>
        &nbsp;and&nbsp;
        <Link
          href="https://www.linkedin.com/in/ishan-jaiswal-2a799a30a/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ textDecoration: 'underline' }}
        >
          LinkedIn
        </Link>.
      </Paragraph>
      <EasterEggButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleEasterEggClick}
        variants={itemVariants}
      >
        Reveal the Hidden Secret
      </EasterEggButton>
      <AnimatePresence>
        {showModal && (
          <ModalContainer
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
          </ModalContainer>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showBonusModal && (
          <ModalContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <HiddenClose onClick={handleCloseBonusModal}>×</HiddenClose>
            <h3>Bonus Secret Unlocked!</h3>
            <Paragraph>
              You've discovered an extra secret by tapping the header! Keep your curiosity alive.
            </Paragraph>
          </ModalContainer>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showLongPressModal && (
          <ModalContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <HiddenClose onClick={handleCloseLongPressModal}>×</HiddenClose>
            <h3>Long Press Secret!</h3>
            <Paragraph>
              You held down long enough to reveal this hidden gem. Great job!
            </Paragraph>
          </ModalContainer>
        )}
      </AnimatePresence>
    </AboutWrapper>
  );
};

export default About;