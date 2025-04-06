import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  padding: 1.5rem;
  border-radius: 12px;
  margin: 1rem 0;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme.background};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.accent};
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.accent};
  color: #fff;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.8rem;
  margin: 0.2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s ease, color 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.accent};
  }
`;

const ProjectCard = ({ title, description, tags, github, demo, image }) => (
  <Card whileHover={{ scale: 1.02 }}>
    {image && (
      <ImageContainer>
        <img src={image} alt={title} />
      </ImageContainer>
    )}
    <Title>{title}</Title>
    <Description>{description}</Description>
    {tags && tags.length > 0 && (
      <TagContainer>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagContainer>
    )}
    <ButtonContainer>
      {github && (
        <Button href={github} target="_blank" rel="noopener noreferrer">
          <FaGithub /> GitHub
        </Button>
      )}
      {demo && (
        <Button href={demo} target="_blank" rel="noopener noreferrer">
          <FaExternalLinkAlt /> Demo
        </Button>
      )}
    </ButtonContainer>
  </Card>
);

export default ProjectCard;