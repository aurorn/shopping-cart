import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { gameApi } from '../services/gameApi';
import { removeDupes } from '../utilities/removeDupes';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${({ theme }) => theme.primaryFontColor};
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
  margin-top: 100px;
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
        text-align: left:`;

const GenreList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;

const Genre = styled.div`
        width: 200px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #444;
        color: white;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
        box-shadow: -2px 0 12px rgba(0, 0, 0, 0.3);

        p {
        opacity: 0;
        transition: opacity: 0.3;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background: rgba(0,0,0,0.7);
        padding: 10px 0;
        margin: 0;
        pointer-events: none;
        }
        

        &:hover {
            transform: scale(1.1);            
            transition: 0.3s ease-in-out;
            &::before {
                content: "";
                position: absolute;
                inset: 0;
                padding: 2px;
                border-radius: 5px;
                background: linear-gradient(
                    60deg,
                    hsl(224, 85%, 66%),
                    hsl(269, 85%, 66%),
                    hsl(314, 85%, 66%),
                    hsl(359, 85%, 66%),
                    hsl(44, 85%, 66%),
                    hsl(89, 85%, 66%),
                    hsl(134, 85%, 66%),
                    hsl(179, 85%, 66%)
                );
                background-size: 300% 300%;
                background-position: 0 50%;
                animation: moveGradient 4s alternate infinite;
                -webkit-mask: 
                    linear-gradient(#fff 0 0) content-box, 
                    linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
                pointer-events: none;
            }
                p {
                opacity: 1;
            }   
        }

            @keyframes moveGradient {
            50% {
            background-position: 100% 50%;
            }
        }
    
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

const ShowcaseImg = styled.img`
  display: flex;
  justify-content: center;
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  border: none;
`;
const ShowcaseItem = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #444;
        color: white;
        border-color: #444;
        box-shadow: -2px 0 12px rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        
        
        p {
        opacity: 0;
        transition: opacity: 0.3;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background: rgba(0,0,0,0.7);
        padding: 10px 0;
        margin: 0;
        pointer-events: none;
        }
         
        &:hover {
        transform: scale(1.1);            
        transition: 0.3s ease-in-out;
        cursor: pointer;
        
            p {
                opacity: 1;
            }

        
    }`;

const SectionTopbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
  font-size: 14px;

  &:hover {
    background-color: ${({ theme }) => theme.accentHover};

    border: none;
    cursor: pointer;
  }
`;

const FrontPage = () => {
  const [genreList, setGenreList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trendingGames, setTrendingGames] = useState([]);
  const [latestGames, setLatestGames] = useState([]);

  useEffect(() => {
    const fetchGenreList = async () => {
      try {
        const genres = await gameApi.getGamesByGenre();
        setGenreList(Array.isArray(genres) ? genres : []);
      } catch (err) {
        setError('Failed to Fetch Genres');
        setGenreList([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchTrending = async () => {
      try {
        const games = await gameApi.getNewAndTrendingGames();
        const uniqueGames = removeDupes(Array.isArray(games) ? games : []);
        setTrendingGames(uniqueGames);
      } catch (err) {
        setError('Failed to Fetch Genres');
        setGenreList([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCarouselGames = async () => {
      try {
        const carouselGames = await gameApi.getLatestPopularGames();
        setLatestGames(Array.isArray(carouselGames) ? carouselGames : []);
      } catch (err) {
        setError('Failed to fetch carousel games');
        setLatestGames([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
    fetchGenreList();
    fetchCarouselGames();
  }, []);

  const CarouselItems = latestGames.map(game => ({
    title: game.name,
    description: game.released ? `Released: ${game.released}` : '',
    image: game.background_image,
  }));

  const ShowcaseItemContent = ({ game }) => (
    <div>
      <ShowcaseImg src={game.background_image} alt={game.name} />
    </div>
  );

  const ShowcaseGenreItem = ({ genre }) => (
    <div>
      <ShowcaseImg src={genre.image_background} alt={genre.name} />
    </div>
  );

  const navigate = useNavigate();

  const handleGameClick = game => {
    navigate(`/game/${game.id}`);
  };

  if (loading) return <LoadingScreen />;

  return (
    <Wrapper>
      <Title> Welcome to the Aurornis Games!</Title>
      <Subtitle>
        This is a shopping cart project made for the Odin Project
      </Subtitle>
      <Subtitle>This uses the RAWG api!</Subtitle>
      <CarouselContainer>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          style={{ width: '80vw', height: '70vh' }}
        >
          {CarouselItems.map((item, idx) => (
            <SwiperSlide key={idx}>
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
                onClick={() => console.log(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '70vh',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
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
                  <h3 style={{ margin: 0 }}>{item.title}</h3>
                  <p style={{ margin: 0 }}>{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </CarouselContainer>
      <MiddleWrapper>
        <GenreWrapper>
          <SectionTopbar>
            <Title>Popular Genres</Title>
            <BrowseButton>Browse</BrowseButton>
          </SectionTopbar>

          <GenreList>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {Array.isArray(genreList) &&
              genreList.map(genres => (
                <Genre key={genres.id}>
                  <ShowcaseGenreItem genre={genres} />
                  <p>{genres.name}</p>
                </Genre>
              ))}
          </GenreList>
        </GenreWrapper>
        <ShowcaseWrapper>
          <SectionTopbar>
            <Title>New and Trending</Title>
            <BrowseButton>Browse</BrowseButton>
          </SectionTopbar>
          <ShowcaseList>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {Array.isArray(trendingGames) &&
              trendingGames.map(game => (
                <ShowcaseItem
                  key={game.id}
                  onClick={() => handleGameClick(game)}
                >
                  <ShowcaseItemContent game={game} />
                  <p>{game.name}</p>
                </ShowcaseItem>
              ))}
          </ShowcaseList>
        </ShowcaseWrapper>
      </MiddleWrapper>
    </Wrapper>
  );
};

export default FrontPage;
