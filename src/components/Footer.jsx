import { useState } from 'react';
import styled from 'styled-components';
import Modal from '../modules/Modal';

const FooterWrapper = styled.div`
  width: 97%;
  color: white;
  background: ${({ theme }) => theme.background};
  padding: 40px 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterTitle = styled.h3`
  color: ${({ theme }) => theme.accent};
  font-size: 1.1rem;
  margin-bottom: 8px;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.primaryFontColor};
  text-decoration: none;
  font-size: 0.9rem;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

const Signature = styled.p`
  font-size: 12px;
  text-align: center;
  margin-top: 40px;
  opacity: 0.6;
`;

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = e => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <FooterTitle>About Us</FooterTitle>
          <FooterLink href="#" onClick={handleLinkClick}>
            About GameStore
          </FooterLink>
          <FooterLink href="#" onClick={handleLinkClick}>
            Careers
          </FooterLink>
          <FooterLink href="#" onClick={handleLinkClick}>
            Press Center
          </FooterLink>
          <FooterLink href="#" onClick={handleLinkClick}>
            Our Blog
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Support</FooterTitle>
          <FooterLink href="#" onClick={handleLinkClick}>
            Help Center
          </FooterLink>
          <FooterLink href="#" onClick={handleLinkClick}>
            Safety Center
          </FooterLink>
          <FooterLink href="#" onClick={handleLinkClick}>
            Community Guidelines
          </FooterLink>
          <FooterLink href="#" onClick={handleLinkClick}>
            Contact Us
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLink href="#" onClick={handleLinkClick}>
            Terms of Service
          </FooterLink>
          <FooterLink href="#" onClick={handleLinkClick}>
            Privacy Policy
          </FooterLink>
          <FooterLink href="#" onClick={handleLinkClick}>
            Cookie Settings
          </FooterLink>
          <FooterLink href="#" onClick={handleLinkClick}>
            Copyright Policy
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Follow Us</FooterTitle>
          <FooterLink href="#" onClick={handleLinkClick}>
            Twitter
          </FooterLink>
          <FooterLink href="#" onClick={handleLinkClick}>
            Facebook
          </FooterLink>
          <FooterLink href="#" onClick={handleLinkClick}>
            Instagram
          </FooterLink>
          <FooterLink href="#" onClick={handleLinkClick}>
            Discord
          </FooterLink>
        </FooterSection>
      </FooterContent>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>This is a dummy link, this link does nothing. For now...</p>
      </Modal>

      <Signature>Made by Sam Cason</Signature>
    </FooterWrapper>
  );
};

export default Footer;
