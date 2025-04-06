import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const HeaderWrapper = styled(motion.header)`
  background: ${({ theme }) => theme.header};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
  a {
    margin: 0 1rem;
    font-weight: 500;
    transition: color 0.3s ease, border-bottom 0.3s ease;
    color: ${({ theme }) => theme.text};
    padding-bottom: 4px;

    &.active {
      color: ${({ theme }) => theme.accent};
      border-bottom: 2px solid ${({ theme }) => theme.accent};
    }

    &:hover {
      color: ${({ theme }) => theme.accent};
    }
  }
`;

const MobileMenuIcon = styled.div`
  display: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 60px;
  right: 2rem;
  background: ${({ theme }) => theme.header};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 99;
  a {
    display: block;
    padding: 1rem 1.5rem;
    color: ${({ theme }) => theme.text};
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    &:last-child {
      border-bottom: none;
    }
    &.active {
      color: ${({ theme }) => theme.accent};
      background: rgba(255, 255, 255, 0.1);
    }
    &:hover {
      color: ${({ theme }) => theme.accent};
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderWrapper
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div>
        <h2>Ishan ~ Portfolio</h2>
      </div>
      <Nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about">
          About
        </NavLink>
        <NavLink to="/projects">
          Projects
        </NavLink>
        <NavLink to="/contact">
          Contact
        </NavLink>
      </Nav>
      <MobileMenuIcon onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuIcon>
      {isOpen && (
        <DropdownMenu
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <NavLink onClick={() => setIsOpen(false)} to="/" end>
            Home
          </NavLink>
          <NavLink onClick={() => setIsOpen(false)} to="/about">
            About
          </NavLink>
          <NavLink onClick={() => setIsOpen(false)} to="/projects">
            Projects
          </NavLink>
          <NavLink onClick={() => setIsOpen(false)} to="/contact">
            Contact
          </NavLink>
        </DropdownMenu>
      )}
    </HeaderWrapper>
  );
};

export default Header;