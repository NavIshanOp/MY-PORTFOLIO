import React from 'react';
import styled from 'styled-components';

const NotFoundWrapper = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const BackButton = styled.a`
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.text};
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.background};
  }
`;

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <Title>404 - Page Not Found</Title>
      <Message>The page you are looking for does not exist or has been moved.</Message>
      <BackButton href="/">Go Back to Home</BackButton>
    </NotFoundWrapper>
  );
};

export default NotFound;