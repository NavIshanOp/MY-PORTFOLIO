import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';

const FORMSPREE_ENDPOINT = process.env.REACT_APP_FORMSPREE_ENDPOINT;

// ============ Animations ============

// Page entrance
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

// Sequential item animation
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const shimmer = keyframes`
  0% { background-position: -200px; }
  100% { background-position: 300px; }
`;

// Floating particles
const float = keyframes`
  0% { transform: translateY(0) translateX(0); opacity: 1; }
  100% { transform: translateY(-100vh) translateX(10px); opacity: 0; }
`;

const Particle = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: ${float} 10s linear infinite;
`;

const generateParticles = (num) => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    const size = Math.random() * 6 + 2;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 10;
    arr.push(
      <Particle
        key={i}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          top: `${top}%`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  }
  return arr;
};

// ============ Styled Components ============

const ContactWrapper = styled(motion.div)`
  padding: 3rem 2rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: ${({ theme }) => theme.background};
  position: relative;
  overflow: hidden;
`;

const Heading = styled(motion.h2)`
  color: ${({ theme }) => theme.accent};
  margin-bottom: 1rem;
  font-size: 2.2rem;
`;

const Description = styled(motion.p)`
  color: ${({ theme }) => theme.text};
  max-width: 600px;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ContactButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  background-size: 200%;
  transition: all 0.3s ease;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 15px ${({ theme }) => theme.accent};
    transform: translateY(-4px);
  }
`;

const ContactFormWrapper = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  max-width: 600px;
  width: 100%;
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled(motion.input)`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  box-shadow: inset 0 0 4px rgba(0,0,0,0.2);
  transition: box-shadow 0.3s ease;
  &:focus {
    box-shadow: 0 0 10px ${({ theme }) => theme.accent};
  }
`;

const Textarea = styled(motion.textarea)`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 120px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  box-shadow: inset 0 0 4px rgba(0,0,0,0.2);
  &:focus {
    box-shadow: 0 0 10px ${({ theme }) => theme.accent};
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease;
  animation: ${({ loading }) => loading && shimmer} 1.5s linear infinite;

  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.accent};
    transform: scale(1.05);
  }
`;

// ============ Component ============

const Contact = () => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    setLoading(true);
    const formData = new FormData(e.target);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus('Message sent successfully!');
        e.target.reset();
      } else {
        setStatus('Error sending message. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactWrapper
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {generateParticles(25)}
      <Heading variants={fadeInUp}>Contact Me</Heading>
      <Description variants={fadeInUp}>
        I’d love to hear from you! Whether you have a question or just want to say hi, 
        reach out using any of the methods below or send me a direct message.
      </Description>

      <ButtonContainer variants={fadeInUp}>
        <ContactButton
          href="mailto:me@ishan.vip"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaEnvelope /> Email
        </ContactButton>
        <ContactButton
          href="https://in.linkedin.com/in/ishan-jaiswal-2a799a30a"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaLinkedin /> LinkedIn
        </ContactButton>
        <ContactButton
          href="https://github.com/NavIshanOp"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub /> GitHub
        </ContactButton>
        <ContactButton
          href="https://discord.com/users/774148420260462602"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDiscord /> Discord
        </ContactButton>
      </ButtonContainer>

      <ContactFormWrapper variants={fadeInUp}>
        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Your Name"
            required
            variants={fadeInUp}
          />
          <Input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            variants={fadeInUp}
          />
          <Textarea
            name="message"
            placeholder="Your Message"
            required
            variants={fadeInUp}
          />
          <SubmitButton
            type="submit"
            loading={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeInUp}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </SubmitButton>
        </Form>
        {status && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: '1rem', color: '#bb86fc' }}
          >
            {status}
          </motion.p>
        )}
      </ContactFormWrapper>
    </ContactWrapper>
  );
};

export default Contact;