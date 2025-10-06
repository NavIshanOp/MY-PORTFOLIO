import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ProjectsWrapper = styled(motion.div)`
  padding: 4rem 2rem;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled(motion.h2)`
  color: ${({ theme }) => theme.accent};
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Subtitle = styled(motion.p)`
  color: ${({ theme }) => theme.text};
  max-width: 700px;
  margin-bottom: 3rem;
  font-size: 1.1rem;
  opacity: 0.85;
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  transform: translateY(0);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 28px rgba(0,0,0,0.4);
    border-color: ${({ theme }) => theme.accent};
  }
`;

const ProjectImage = styled(motion.img)`
  width: 100%;
  border-radius: 12px;
  height: 180px;
  object-fit: cover;
  margin-bottom: 1rem;
  transition: transform 0.4s ease;

  ${GlassCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.accent};
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const ProjectDesc = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: 0.85;
  margin-bottom: 1rem;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.accent};
  color: #fff;
  font-size: 0.8rem;
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  font-weight: bold;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.a`
  background: ${({ theme }) => theme.accent};
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.accent};
  }
`;

const projectsData = [
  {
    title: 'Synex',
    description: 'Ultimate Discord Bot: Moderation, Music, AI, Automation, Fun & More!',
    tags: ['Node.js'],
    demo: 'https://discord.com/oauth2/authorize?client_id=1273604845789515806&permissions=8&integration_type=0&scope=bot',
    image: 'https://i.imgur.com/PzI987D.png',
  },
  {
    title: 'Blogs Website',
    description: 'A personal blog website built with React and Node.js.',
    tags: ['React', 'Node.js'],
    demo: 'https://blogs.ishan.vip',
    image: 'https://i.imgur.com/X5su9PW.png',
  },
  {
    title: 'Aurora AI',
    description: 'An AI-powered platform for personalized learning.',
    tags: ['React', 'Node.js'],
    demo: 'https://aurora.ishan.vip',
    image: 'https://i.imgur.com/I0djILZ.png',
  },
  {
    title: 'NavTantra',
    description: "Sunbeam Lahartara's Robotics Club: Innovating minds, creating the future.",
    tags: ['React', 'JSX', 'JavaScript'],
    demo: 'https://navtantra.ishan.vip',
    image: 'https://i.imgur.com/oOkQ4wS.png',
  },
  {
    title: 'NavTantra - Old',
    description: "Sunbeam Lahartara's ATL Club: Innovating minds, creating the future.",
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/NavIshanOp/NavTantra',
    demo: 'https://navtantraold.ishandev.top',
    image: 'https://i.imgur.com/9PHAF7R.png',
  },
  {
    title: 'ishan-translator',
    description: "Simple nodejs library for talking to Google's Translate API.",
    tags: ['JavaScript', 'Node.js'],
    github: 'https://github.com/NavIshanOp/ishan-Translator',
    demo: 'https://www.npmjs.com/package/@navishanop/ishan-translator',
    image: 'https://i.imgur.com/mYwxOZx.png',
  },
  {
    title: 'Waifu.it wrapper.',
    description: "Waifu.it wrapper, Generate random stuff with a huge database.",
    tags: ['JavaScript', 'Node.js'],
    github: 'https://github.com/NavIshanOp/waifu-up',
    demo: 'https://www.npmjs.com/package/waifu-up',
    image: 'https://i.imgur.com/rIgKWJA.png',
  },
  {
    title: 'Meetify',
    description: "Video calling website with screen share.",
    tags: ['TypeScript', 'CSS', 'HTML'],
    github: 'https://github.com/NavIshanOp/Meetify',
    demo: 'https://meetify.ishan.vip',
    image: 'https://i.imgur.com/c5tTWVM.png',
  },
];

const Projects = () => {
  return (
    <ProjectsWrapper
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Projects
      </Title>
      <Subtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Here’s a glimpse of some of my work — blending creativity with code to bring ideas to life.
      </Subtitle>

      <ProjectsGrid
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {projectsData.map((project, index) => (
          <GlassCard
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            whileHover={{ rotateX: 2, rotateY: -2 }}
          >
            <ProjectImage src={project.image} alt={project.title} />
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDesc>{project.description}</ProjectDesc>
            <Tags>
              {project.tags.map((tag, i) => (
                <Tag key={i}>{tag}</Tag>
              ))}
            </Tags>
            <Buttons>
              {project.demo && <Button href={project.demo} target="_blank">Demo</Button>}
              {project.github && <Button href={project.github} target="_blank">GitHub</Button>}
            </Buttons>
          </GlassCard>
        ))}
      </ProjectsGrid>
    </ProjectsWrapper>
  );
};

export default Projects;