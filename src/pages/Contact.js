import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';

const FORMSPREE_ENDPOINT = process.env.REACT_APP_FORMSPREE_ENDPOINT;
const ContactWrapper = styled.div`
  padding: 3rem 2rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: ${({ theme }) => theme.background};
`;

const Heading = styled.h2`
  color: ${({ theme }) => theme.accent};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.text};
  max-width: 600px;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ContactButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s ease, color 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.accent};
  }
`;

const ContactFormWrapper = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  max-width: 600px;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  resize: vertical;
  min-height: 120px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.accent};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.accent};
  }
`;

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    const formData = new FormData(e.target);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });      

      if (response.ok) {
        setStatus('Message sent!');
        e.target.reset();
      } else {
        setStatus('Error sending message. Please try again.');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('Error sending message. Please try again.');
    }
  };

  return (
    <ContactWrapper>
      <Heading>Contact Me</Heading>
      <Description>
        I’d love to hear from you! Whether you have a question or just want to say hi, 
        reach out using any of the methods below or send me a direct message.
      </Description>
      <ButtonContainer>
        <ContactButton href="mailto:me@ishan.vip">
          <FaEnvelope /> Email
        </ContactButton>
        <ContactButton 
          href="https://in.linkedin.com/in/ishan-jaiswal-2a799a30a?trk=people-guest_people_search-card" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaLinkedin /> LinkedIn
        </ContactButton>
        <ContactButton 
          href="https://github.com/NavIshanOp" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaGithub /> GitHub
        </ContactButton>
        <ContactButton 
          href="https://discord.com/users/774148420260462602" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaDiscord /> Discord
        </ContactButton>
      </ButtonContainer>
      <ContactFormWrapper>
        <Form onSubmit={handleSubmit}>
          <Input type="text" name="name" placeholder="Your Name" required />
          <Input type="email" name="email" placeholder="Your Email" required />
          <Textarea name="message" placeholder="Your Message" required />
          <SubmitButton type="submit">Send Message</SubmitButton>
        </Form>
        {status && <p>{status}</p>}
      </ContactFormWrapper>
    </ContactWrapper>
  );
};

export default Contact;