import CarouselComponent from "../modules/Carousel";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { gameApi } from '../services/gameApi';
import Footer from './Footer';
import { removeDupes } from "../utilities/removeDupes";

const Wrapper = styled.div`
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color:rgb(36, 36, 36);
    `;
    
    const Title = styled.h1`
        font-size: 48px;
        color: white;
        
    `;
    
    const Subtitle = styled.h2`
        font-size: 24px;
        color: #666;
    `;

    const CarouselContainer = styled.div`
        width: 100%;
        
        margin-bottom: 2rem;
    `;


    const CarouselItems = [
        {
            title: "Product 1",
            description: "bleep bloop",
            image: "https://picsum.photos/300/200?random=1"
        },
        {
            title: "Product 2",
            description: "bleep bloop",
            image: "https://picsum.photos/300/200?random=2"
        },
        {
            title: "Product 3",
            description: "bleep bloop",
            image: "https://picsum.photos/300/200?random=3"
        }
    ];

    const MiddleWrapper = styled.div`
        Width: 70%;
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
        
        justify-content: center;
        text-align: left:`

    const GenreList = styled.div`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;`

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
    
`
    
    const ShowcaseWrapper = styled.div`
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;`

    const ShowcaseList = styled.div`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        row-gap: 40px;
        column-gap: 100px;`


    const ShowcaseImg = styled.img`
        display: flex;
        justify-content: center;
        width: 200px;
        height: 200px;
        object-fit: cover;
        `
    const ShowcaseItem = styled.div`
        
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #444;
        color: white;
        border-radius: 3px;
        border-color: #444;
        
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
        
            p {
                opacity: 1;
            }

        
    }`

    const SectionTopbar = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    `

    const BrowseButton = styled.button`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 100px;
        background-color: rgb(43, 43, 43);
        border: 1px solid rgb(0,0,0);
        color: rgb(197, 197, 197);

        &:hover {
            background-color: rgb(95, 95, 95);
            color: rgb(216, 213, 213);
            border-color: rgb(255, 255, 255);
            cursor: pointer;
        
        }
    `

    
    

const FrontPage = () => {
    const [genreList, setGenreList] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trendingGames, setTrendingGames] = useState([]);
    

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

    fetchTrending();
    fetchGenreList();
}, []);

const ShowcaseItemContent = ({ game }) => (
    <div> 
        <ShowcaseImg src={game.background_image} 
            alt={game.name} 
            
        />
        
    </div>
)

const ShowcaseGenreItem = ({ genre }) => (
    <div>
        <ShowcaseImg src={genre.image_background}
            alt={genre.name}
            />
    </div>
)
    
    
    return (
        <Wrapper>
            <CarouselContainer>
                <CarouselComponent items={CarouselItems} onItemClick={(item) => console.log(item)} />
            </CarouselContainer>
            
            <Title> This is a future title</Title>
            <Subtitle>Find something or other here</Subtitle>

            <MiddleWrapper>
                <GenreWrapper>
                    <SectionTopbar>
                        <Title>Popular Genres</Title>
                        <BrowseButton>Browse More</BrowseButton>
                    </SectionTopbar>
                    
                    <GenreList>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                        {Array.isArray(genreList) && genreList.map((genres) => (
                            <Genre key={genres.id}>
                                <ShowcaseGenreItem genre={genres}/>
                                <p>{genres.name}</p>
                            </Genre>
                        ))}
                    </GenreList>
                </GenreWrapper>
                <ShowcaseWrapper>
                    <SectionTopbar>
                        <Title>New and Trending</Title>
                        <BrowseButton>Browse More</BrowseButton>
                    </SectionTopbar>
                    <ShowcaseList>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                        {Array.isArray(trendingGames) && trendingGames.map((game) => (
                    <ShowcaseItem key={game.id}>
                        <ShowcaseItemContent game={game} />
                        <p>{game.name}</p>
                    </ShowcaseItem>
                        ))}
                    </ShowcaseList>
                </ShowcaseWrapper>
            </MiddleWrapper>
            <Footer/>
        </Wrapper>
        
    );
}

export default FrontPage;