import styled from 'styled-components';

const FooterWrapper = styled.div`
  width: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Signature = styled.p`
  font-size: 12px;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Signature>Made by Sam Cason</Signature>
    </FooterWrapper>
  );
};

export default Footer;
