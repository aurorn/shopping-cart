import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { gameApi } from '../services/gameApi';

const GenreCardWrapper = styled.div`
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

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 1);
    z-index: 10;
  }
`;

const GenreCardMedia = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 1);
  transition: filter 0.3s;

  ${GenreCardWrapper}:hover & {
    filter: brightness(50%);
  }
`;

const GenreCardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
  transition: all 0.3s;

  ${GenreCardWrapper}:hover & {
    backdrop-filter: blur(3px);
  }
`;

const GenreCardTitle = styled.h2`
  font-weight: bold;
  font-size: 1.2em;
  text-align: center;
  width: 100%;
  padding: 5px 20px;
  opacity: 0;
  transition: opacity 0.3s;
  font-family: 'Orbitron';
  color: ${({ theme }) => theme.primaryFontColor};

  ${GenreCardWrapper}:hover & {
    opacity: 1;
  }
`;

const GenreCardInfo = styled.div`
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
  font-family: 'Roboto';

  ${GenreCardWrapper}:hover & {
    max-height: 300px;
    opacity: 1;
    line-height: 1.5;
  }
`;

const GameCount = styled.div`
  font-size: 0.9em;
  color: ${({ theme }) => theme.secondaryTextColor};
  padding: 12px 20px;
`;

const GenreCard = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const data = await gameApi.getGamesByGenre();
        setGenres(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to fetch genres');
        setGenres([]);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  if (loading) return <div>Loading genres...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {genres.map(genre => (
        <GenreCardWrapper key={genre.id}>
          <GenreCardMedia src={genre.image_background} alt={genre.name} />
          <GenreCardTitleWrapper>
            <GenreCardTitle>{genre.name}</GenreCardTitle>
          </GenreCardTitleWrapper>
          <GenreCardInfo>
            <GameCount>Games count: {genre.games_count}</GameCount>
          </GenreCardInfo>
        </GenreCardWrapper>
      ))}
    </>
  );
};

export default GenreCard;
