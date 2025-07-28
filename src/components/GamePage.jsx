import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { gameApi } from '../services/gameApi';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MainWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-top: 20px;

  
`;

const TopSectionWrapper = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
   flex-direction: column;
   align-items: center;

   }
`;

const StorePageCarousel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  

  @media (max-width: 768px) {
      width: 90svw;
   }
`;

const MediaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 800px;

  @media (max-width: 768px) {
    width: 90svw;
   }
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 768px) {
    width: 90svw;
    img {
    }
   }
`;

const SecondaryMedia = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  gap: 8px;
  padding: 8px;
  background: #232526;
  justify-content: center;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #232526;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.accent};
    border-radius: 4px;
  }
    @media (max-width: 768px) {
      width: 90svw;
      overflow-x: auto;
   }
`;

const ScreenshotModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: ${props => (props.$isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 90%;
  height: 90%;
  position: relative;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
`;

const InfoSection = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: auto;
  gap: 18px;
  height: 100%;


`;

const GameName = styled.h1`
  color: ${({ theme }) => theme.primaryFontColor};
  position: relative;
  top: 0;
  font-size: 1.8em;

  @media (max-width: 768px) {
    font-size: 1.3em;
    text-align: center;
   }
`;

const InfoBox = styled.div`
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

  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
   }
`;

const MiddleSection = styled.div`
  padding-top: 2vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.accent};
  cursor: pointer;
  font-size: 1rem;
  padding: 8px 0;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AboutBox = styled.div`
  background: #232526;
  width: 85%;
  border-radius: 8px;
  padding: 28px 24px;
  font-size: 1.08rem;
  line-height: 1.7;
  color: #e3e3e3;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);
  font-family: 'Roboto';
  transition: max-height 0.3s ease-out;

  @media (max-width: 768px) {
    width: 100%;
    padding: 16px;
    font-size: 0.9rem;
    align-items: center;
    justify-content: center;
   }
`;

const RatingItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #232526;
  border-radius: 4px;
  padding: 6px 12px;

  width: fit-content;
  color: ${({ theme }) => theme.primaryFontColor};

  .percentage {
    color: ${({ theme }) => theme.accent};
    font-size: 0.9em;
  }
`;

const Title = styled.h1`
  font-size: 1.2em;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.accent};

  
`;

const AdditionalInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  gap: 50px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 5px;
   }
  
`

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};


const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const WORD_LIMIT = 100;

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setLoading(true);
        const [gameData, screenshotsData] = await Promise.all([
          gameApi.getGameDetails(id),
          gameApi.getGameScreenshots(id),
        ]);
        setGame(gameData);
        const allImages = [
          { id: 'main', image: gameData.background_image },
          ...screenshotsData,
        ];
        setScreenshots(allImages);
      } catch (err) {
        setError('Failed to load game details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGameData();
  }, [id]);

  if (loading) return;
  if (error) return <div>{error}</div>;
  if (!game) return null;

  return (
    <MainWrapper>
      <ScreenshotModal $isOpen={isModalOpen}>
        <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
        <ModalContent>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            initialSlide={activeIndex}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
          >
            {screenshots.map(screenshot => (
              <SwiperSlide key={screenshot.id}>
                <img src={screenshot.image} alt={`${game.name} screenshot`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ModalContent>
      </ScreenshotModal>
      <TopSectionWrapper>
        <StorePageCarousel>
          <MediaWrapper>
            <MainImage
              src={game.background_image}
              alt={game.name}
              onClick={() => {
                setActiveIndex(0);
                setIsModalOpen(true);
              }}
            />
            <SecondaryMedia>
              {screenshots.map((screenshot, index) => (
                <img
                  key={screenshot.id}
                  src={screenshot.image}
                  alt={index === 0 ? game.name : `${game.name} screenshot`}
                  style={{
                    width: '100px',
                    height: '56px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </SecondaryMedia>
          </MediaWrapper>
        </StorePageCarousel>
        <InfoSection>
          <GameName>{game.name}</GameName>
          <AdditionalInfo>
            <InfoBox>
              <Title>Genres: </Title>
              {game.genres?.map(genre => (
                <div key={genre.id}>{genre.name}</div>
              ))}
            </InfoBox>
            <InfoBox>
              <Title>Available on: </Title>
              {game.stores?.map(store => (
                <div key={store.store.id}>{store.store.name}</div>
              ))}
            </InfoBox>
            <InfoBox>
              <Title>Ratings:</Title>
              {game.ratings?.map(rating => (
                <RatingItem key={rating.id}>
                  <span>{rating.title}:</span>
                  <span className="percentage">
                    {Math.round(rating.percent)}%
                  </span>
                </RatingItem>
              ))}
            </InfoBox>
          </AdditionalInfo>
        </InfoSection>
      </TopSectionWrapper>

      <MiddleSection>
        <AboutBox>{isExpanded 
            ? game.description_raw 
            : truncateText(game.description_raw, WORD_LIMIT)}
          {game.description_raw.split(' ').length > WORD_LIMIT && (
            <ReadMoreButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? '' : ' Read More'}
            </ReadMoreButton>
          )}</AboutBox>
      </MiddleSection>
    </MainWrapper>
  );
};

export default GamePage;
