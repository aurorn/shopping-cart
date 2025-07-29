import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { gameApi } from '../services/gameApi';
import { removeDupes } from '../utilities/removeDupes';
import { useNavigate } from 'react-router-dom';
import { RawgBtn, GitBtn } from '../modules/FPButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import GameCard from '../modules/GameCard';
import GenreCard from '../modules/GenreCard';
import PriceGen from '../utilities/PriceCalc';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Modal from '../modules/Modal';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3em;
  color: ${({ theme }) => theme.primaryFontColor};

  @media (max-width: 768px) {
    font-size: 2em;
    text-align: center;
  }
`;

const Subtitle = styled.h2`
  font-size: 24px;
  color: ${({ theme }) => theme.secondaryTextColor};
`;

const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
`;

const MiddleWrapper = styled.div`
  width: 70%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const GenreWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  justify-content: center;
  text-align: left;
`;

const GenreList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 40px;
  column-gap: 100px;
`;

const ShowcaseWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
`;

const ShowcaseList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 40px;
  column-gap: 100px;
`;

const SectionTopbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  }
`;

const BrowseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100px;
  background-color: ${({ theme }) => theme.accent};
  border: none;
  border-radius: 5px;
  font-size: 1em;

  &:hover {
    background-color: ${({ theme }) => theme.accentHover};
    border: none;
    cursor: pointer;
  }

  & p {
    font-family: 'Roboto';
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-evenly;
  flex-direction: row;
  margin-bottom: 50px;
  margin-top: 50px;
`;

const FrontPage = () => {
  const [trendingGames, setTrendingGames] = useState([]);
  const [latestGames, setLatestGames] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [expandedCardId, setExpandedCardId] = useState(null);

  const handleToggleCard = id => {
    setExpandedCardId(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [games, carouselGames] = await Promise.all([
          gameApi.getNewAndTrendingGames(),
          gameApi.getLatestPopularGames(),
        ]);
        setTrendingGames(Array.isArray(games) ? removeDupes(games) : []);
        setLatestGames(Array.isArray(carouselGames) ? removeDupes(carouselGames) : []);
      } catch (err) {
        console.error('Failed to fetch data', err);
        setTrendingGames([]);
        setLatestGames([]);
      }
    };

    fetchAll();
  }, []);

  const CarouselItems = latestGames.map(game => ({
    title: game.name,
    description: game.released ? `Releases: ${game.released}` : '',
    image: game.background_image,
  }));

  const navigate = useNavigate();

  const handleGameClick = game => {
    navigate(`/game/${game.id}`);
  };

  const handleAddToCart = (game, price) => {
    addToCart({
      id: game.id,
      name: game.name,
      price: parseFloat(price),
      image: game.background_image,
    });
  };

  const handleBtnClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  }

  return (
    <Wrapper>
      <BtnWrapper>
        <RawgBtn />
        <GitBtn />
      </BtnWrapper>
      <CarouselContainer>
        {/*Swiper only renders after api data is loaded or I get loop errors */}{latestGames.length > 1 && (
          <Swiper
            key={latestGames.length}
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            style={{
              width: '80vw',
              height: '70vh',
              boxShadow: '0 4px 24px rgba(0,0,0,1)',
            }}
          >
            {latestGames.map((game) => (
              <SwiperSlide key={game.id}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                  onClick={() => handleGameClick(game)}
                >
                  <img
                    src={game.background_image}
                    alt={game.name}
                    style={{
                      width: '100%',
                      height: '70vh',
                      objectFit: 'cover',
                      borderRadius: '6px',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      background: 'rgba(34,34,34,0.62)',
                      color: 'white',
                      padding: '16px',
                      borderBottomLeftRadius: '12px',
                      borderBottomRightRadius: '12px',
                    }}
                  >
                    <h3 style={{ margin: 0 }}>{game.name}</h3>
                    <p style={{ margin: 0,  fontFamily: 'Roboto'}}>
                      {game.released ? `Releases: ${game.released}` : ''}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </CarouselContainer>
      <MiddleWrapper>
        <GenreWrapper>
          <SectionTopbar>
            <Title>Popular Genres</Title>
            <BrowseButton onClick={handleBtnClick}><p>Browse</p></BrowseButton>
          </SectionTopbar>
          <GenreList>
            <GenreCard />
          </GenreList>
        </GenreWrapper>
        <ShowcaseWrapper>
          <SectionTopbar>
            <Title>New and Trending</Title>
            <BrowseButton onClick={handleBtnClick}><p>Browse</p></BrowseButton>
          </SectionTopbar>
          <ShowcaseList>
            {trendingGames.map(game => {
              const price = PriceGen(50);
              return (
                <GameCard
                  key={game.id}
                  game={game}
                  expanded={expandedCardId === game.id}
                  onToggle={handleToggleCard}
                  price={price}
                  onAddToCart={() => handleAddToCart(game, price)}
                  setExpandedCardId={setExpandedCardId}
                />
              );
            })}
          </ShowcaseList>
        </ShowcaseWrapper>
      </MiddleWrapper>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>This is a dummy link, this link does nothing. For now...</p>
      </Modal>
    </Wrapper>
  );
};

export default FrontPage;
