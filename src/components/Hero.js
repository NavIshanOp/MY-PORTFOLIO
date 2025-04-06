import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background: ${({ theme }) => theme.gradient};
  text-align: center;
  padding: 0 2rem;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.accent};
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  max-width: 600px;
`;

const Hero = () => {
  return (
    <HeroWrapper>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Ishan Jaiswal
      </Title>
      <Subtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        17 | Programmer | President at NavTantra - Robotics Club | IoT & Robotics Enthusiast | Innovating with Code and Connected Devices
      </Subtitle>
    </HeroWrapper>
  );
};

export default Hero;