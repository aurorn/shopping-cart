import styled from 'styled-components';

const StyledLoadingScreen = styled.div`
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b3e283;
  font-size: 2rem;
  letter-spacing: 0.1em;
  background-color: rgb(36, 36, 36);
`;

const LoadingScreen = () => <StyledLoadingScreen />;

export default LoadingScreen;
