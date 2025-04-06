import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.header};
  padding: 1rem 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: #aaa;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>© {new Date().getFullYear()} Ishan Jaiswal. All Rights Reserved.</p>
    </FooterWrapper>
  );
};

export default Footer;