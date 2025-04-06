import React from 'react';
import Hero from '../components/Hero';
import SkillsSection from '../components/SkillsSection';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  background: ${({ theme }) => theme.background};
  min-height: 100vh;
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Hero />
      <SkillsSection />
    </HomeWrapper>
  );
};

export default Home;