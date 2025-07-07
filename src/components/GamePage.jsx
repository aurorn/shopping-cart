import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { gameApi } from '../services/gameApi';



const MainWrapper = styled.div`
  min-height: 100vh;
  color: #fff;
  font-family: 'Segoe UI', Arial, sans-serif;
`;

const TopSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  padding: 40px 5vw 24px 5vw;
  align-items: flex-start;
`;

const StorePageCarousel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
  min-width: 320px;
`;

const MainImage = styled.div`
  width: 70%;
  height: 70%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  margin-bottom: 18px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const SecondaryMedia = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;

  img {
    width: 90px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    background: #222;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 1rem;
  color: #b3e283;

  & > span {
    background: #232526;
    border-radius: 4px;
    padding: 4px 10px;
    margin-right: 6px;
    margin-bottom: 6px;
    font-weight: 500;
  }
`;

const StorePages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.98rem;

  div {
    background: #232526;
    border-radius: 4px;
    padding: 6px 12px;
    color: #e3e3e3;
    margin-bottom: 4px;
    width: fit-content;
  }
`;

const MiddleSection = styled.div`
  padding: 32px 5vw 0 5vw;
`;

const AboutBox = styled.div`
  background: #232526;
  border-radius: 8px;
  padding: 28px 24px;
  font-size: 1.08rem;
  line-height: 1.7;
  color: #e3e3e3;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);
`;

const BottomSection = styled.div`
  padding: 32px 5vw 40px 5vw;
  /* Add more styling as needed for additional info */
`;

const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const data = await gameApi.getGameDetails(id);
        setGame(data);
      } catch (err) {
        setError('Failed to load game details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  if (loading) return ;
  if (error) return <div>{error}</div>;
  if (!game) return null;

  return (
    <MainWrapper>
      <TopSection>
        <StorePageCarousel>
          <MainImage>
            <img src={game.background_image} alt={game.name} />
          </MainImage>
          <SecondaryMedia>
            {/* Render screenshots if available */}
            {game.short_screenshots?.map(shot => (
              <img key={shot.id} src={shot.image} alt="Screenshot" />
            ))}
          </SecondaryMedia>
        </StorePageCarousel>
        <InfoSection>
          <TagBox>{game.genres.map(g => g.name).join(', ')}</TagBox>
          <StorePages>
            {game.stores?.map(store => (
              <div key={store.store.id}>{store.store.name}</div>
            ))}
          </StorePages>
        </InfoSection>
      </TopSection>
      <MiddleSection>
        <AboutBox>{game.description_raw}</AboutBox>
      </MiddleSection>
      <BottomSection>{/* Add more info as needed */}</BottomSection>
    </MainWrapper>
  );
};

export default GamePage;
