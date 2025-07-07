import styled from "styled-components";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid } from "react-icons/fa";

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
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(1.3);
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    z-index: 10;
  }
`;

const GameCardMedia = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border: none;
  border-radius: 5px 5px 0 0;
`;

const GameCardInfo = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  width: initial;
  min-width: 176px;
  background: rgb(24, 24, 24);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  padding: 0 12px;
  pointer-events: none;
  border-radius: 4px;

  ${GameCardWrapper}:hover & {
    max-height: 300px;
    opacity: 1;
    padding: 16px 12px;
    pointer-events: auto;
    z-index: 20;
  }
`;

const GameCardInfoPlatforms = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
  font-size: 1.1em;
`;

const GameCardTitle = styled.div`
  font-weight: bold;
  font-size: 1.1em;
  margin-bottom: 8px;
  text-align: center;
`;

const Divider = styled.div`
  width: 80%;
  height: 1px;
  background: #666;
  margin: 8px 0;
`;

const GameCardInfoRelease = styled.div`
  font-size: 0.95em;
  color: #b0b0b0;
  margin-bottom: 4px;
`;

const GameCardInfoGenre = styled.div`
  font-size: 0.95em;
  color: #b0b0b0;
  margin-bottom: 8px;
  width: 140px;
  
`;

const GameCardInfoAddToCart = styled.button`
  background: ${({ theme }) => theme.accent};
  color: #181818;
  border: none;
  border-radius: 4px;
  padding: 8px 18px;
  font-size: 1em;
  font-weight: 600;
  margin-top: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
  }
`;

const GameCardInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    ${GameCardWrapper}:hover & {
        transform: scale(0.8);
    }
`

const platformIconMap = {
  pc: <FaWindows />,
  playstation5: <FaPlaystation />,
  xboxone: <FaXbox />,
  xboxseriesx: <FaXbox />,
  mac: <FaApple />,
  linux: <FaLinux />,
  android: <FaAndroid />,
};

const GameCard = ({ game, onClick, onAddToCart }) => (
  <GameCardWrapper onClick={() => onClick && onClick(game)}>
    <GameCardMedia src={game.background_image} alt={game.name} />
    <GameCardInfo>
        <GameCardInfoWrapper>
      <GameCardInfoPlatforms>
        {game.platforms?.map((p, idx) => {
          const slug = p.platform?.slug;
          const icon = platformIconMap[slug];
          return (
            <span key={idx} title={slug} style={{ fontSize: "1.3em" }}>
              {icon}
            </span>
          );
        })}
      </GameCardInfoPlatforms>
      <GameCardTitle>{game.name}</GameCardTitle>
      <Divider />
      <GameCardInfoRelease>
        Release: {game.released || "Unknown"}
      </GameCardInfoRelease>
      <Divider />
      <GameCardInfoGenre>
        Genre: {game.genres?.map(g => g.name).join(", ") || "Unknown"}
      </GameCardInfoGenre>
      <GameCardInfoAddToCart
        onClick={e => {
          e.stopPropagation();
          onAddToCart && onAddToCart(game);
        }}
      >
        Add to Cart
      </GameCardInfoAddToCart>
      </GameCardInfoWrapper>
    </GameCardInfo>
  </GameCardWrapper>
);

export default GameCard
