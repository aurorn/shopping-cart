import styled, { keyframes } from 'styled-components';
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
  FaChevronDown,
  FaArrowRight,
  FaPlus,
  FaCheck,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

const GameCardWrapper = styled.div`
  width: 200px;
  background-color: #444;
  color: white;
  border-radius: 5px;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.3);
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
  position: relative;
`;

const GameCardMedia = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 1);
  transition: filter 0.3s;

  ${GameCardWrapper}:hover & {
    filter: brightness(50%);
  }
`;

const GameCardInfo = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  width: initial;
  min-width: 200px;
  background: rgb(24, 24, 24);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  line-height: 0;
  z-index: 21;
  padding-bottom: 10px;
  line-height: ${({ $expanded }) => ($expanded ? '1.5' : '0')};
  max-height: ${({ $expanded }) => ($expanded ? '300px' : '0')};
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  overflow: hidden;
  pointer-events: ${({ $expanded }) => ($expanded ? 'auto' : 'none')};
  cursor: default;
  Font-Family: 'Roboto';
`;

const GameCardInfoPlatforms = styled.div`
  display: flex;
  gap: 6px;
  font-size: 1em;
  align-content: center;
  justify-content: center;
  padding-top: 5px;
`;

const GameCardTitle = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  text-align: center;
  width: 100%;
  padding: 5px 20px;
  opacity: 0;
  transition: opacity 0.3s;
  font-family: 'Orbitron';

  a {
    color: ${({ theme }) => theme.primaryFontColor || '#fff'};
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.accent || '#00FF85'};
    }
  }

  ${GameCardWrapper}:hover & {
    opacity: 1;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.dividerColor};
  margin: 8px 0;
`;

const GameCardInfoRelease = styled.div`
  font-size: 0.7em;
  color: ${({ theme }) => theme.secondaryTextColor};
  padding-left: 12px;
  padding: 5px 20px 5px 20px;
`;

const GameCardInfoGenre = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.7em;
  color: #b0b0b0;
  margin-bottom: 8px;
  padding-left: 12px;
  width: 200px;
  padding: 5px 20px 5px 20px;
`;

const GameCardInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const GameCardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  justify-content: center;
  align-self: center;
  height: 100%;
  width: 100%;
  transition: all 0.3s ;

  ${GameCardWrapper}:hover & {
    backdrop-filter: blur(3px);
  }
`;

const GameCardGenreWrapper = styled.div`
  display: flex;
  width: 200px;
`;

const GameCardTopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin: 5px 5px 12px 12px;
`;

const pulseBounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
`;

const GameCardChevron = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 6px;
  animation: ${pulseBounce} 1.8s ease-in-out infinite;
  z-index: 5;
  pointer-events: none;
  opacity: 0;

  ${GameCardWrapper}:hover & {
    display: flex;
    opacity: 1;
  }

  svg {
    color: ${({ theme }) => theme.primaryFontColor};
    font-size: 1rem;
    opacity: 1;
  }
`;

const MiniAddToCartBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.accent};
  opacity: 0.7;
  border: none;
  font-size: 0.8em;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 1);
  cursor: pointer;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.7;
    background-color: #01a355ff;
    cursor: pointer;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const PriceSlideBox = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  height: 30px;
  width: 60px;
  background-color: ${({ theme }) => theme.background};
  opacity: 0;
  border: none;
  font-size: 1em;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(100%);
  transition: all 0.2s ease-in-out;
  
  ${MiniAddToCartBtn}:hover + &{
    opacity: 1; 
    transform: translateX(0);

  }
`;

 const AddedToCartBox = styled.div`
    position: absolute;
    top: 30px;
    left: 100%;
    height: 30px;
    width: 60px;
    background-color: ${({ theme }) => theme.accent};
    opacity: 0;
    border: none;
    font-size: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-100%);
    transition: all 0.2s ease-in-out;
    color: ${({ theme }) => theme.background};
    
    ${({ $isAdded }) => $isAdded && `
      opacity: 0.7;
      transform: translateY(0);
    `}
  `;

const platformIconMap = {
  pc: <FaWindows />,
  playstation5: <FaPlaystation />,
  xboxseriesx: <FaXbox />,
  mac: <FaApple />,
  linux: <FaLinux />,
  android: <FaAndroid />,
};

const GameCard = ({
  game,
  expanded,
  onToggle,
  onAddToCart,
  price,
  setExpandedCardId,
}) => {
  const cardRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        expanded &&
        cardRef.current &&
        !cardRef.current.contains(event.target)
      ) {
        setExpandedCardId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [expanded, setExpandedCardId]);

  return (
    <GameCardWrapper ref={cardRef} onClick={() => onToggle(game.id)}>
      <GameCardMedia
        src={game.background_image}
        alt={game.name}
      ></GameCardMedia>
      <GameCardTitleWrapper>
        <GameCardTitle>
          <Link to={`/game/${game.id}`} onClick={e => e.stopPropagation()}>
            {game.name}
          </Link>
        </GameCardTitle>
      </GameCardTitleWrapper>
      <MiniAddToCartBtn
        onClick={e => {
          e.stopPropagation();
          onAddToCart && onAddToCart();
          setIsAdded(true);
          setTimeout(() => setIsAdded(false), 2000);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? <FaPlus /> : <FaArrowRight />}
      </MiniAddToCartBtn>
      <PriceSlideBox>
        <span style={{ fontWeight: 400, color: '#00FF85' }}>${price}</span>
      </PriceSlideBox>
      <AddedToCartBox $isAdded={isAdded}>
        <FaCheck style={{ marginRight: '4px' }} />
      </AddedToCartBox>
      <GameCardChevron>
        <FaChevronDown />
      </GameCardChevron>
      <GameCardInfo $expanded={expanded}>
        <GameCardInfoWrapper>
          <GameCardTopInfo>
            <GameCardInfoPlatforms>
              {game.platforms?.map((p, idx) => {
                const slug = p.platform?.slug;
                const icon = platformIconMap[slug];
                return (
                  <span key={idx} title={slug} style={{ fontSize: '1.2em' }}>
                    {icon}
                  </span>
                );
              })}
            </GameCardInfoPlatforms>
          </GameCardTopInfo>
          <Divider />
          <GameCardInfoRelease>
            Release: {game.released || 'Unknown'}
          </GameCardInfoRelease>
          <Divider />
          <GameCardGenreWrapper>
            <GameCardInfoGenre>
              Genre: {game.genres?.map(g => g.name).join(', ') || 'Unknown'}
            </GameCardInfoGenre>
          </GameCardGenreWrapper>
        </GameCardInfoWrapper>
      </GameCardInfo>
    </GameCardWrapper>
  );
};

export default GameCard;
