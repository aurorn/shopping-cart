import CarouselComponent from "../modules/Carousel";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const Wrapper = styled.div`
        width: 100%;
        height: 200vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color:rgb(36, 36, 36);
    `;
    
    const Title = styled.h1`
        font-size: 48px;
        color: #333;
    `;
    
    const Subtitle = styled.h2`
        font-size: 24px;
        color: #666;
    `;

    const CarouselContainer = styled.div`
        width: 100%;
        
        margin-bottom: 2rem;
    `;

    /*const image = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        background: grey;
        
        &:before {
        content: "PLACEHOLDER";
        color: black;
        }
        `*/

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
        alighn-items: center;
        justify-content: center;
        margin: 0 auto;
        `;

    const GenreWrapper = styled.div`
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;`

    const GenreList = styled.div`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;`

    const Genre = styled.div`
    width: 200px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #444;
    color: white;
    border-radius: 5px;
    position: relative;
    overflow: hidden;

    &:hover {
        transform: scale(1.1);            
        transition: 0.3s ease-in-out;
        &::before {
            content: "";
            position: absolute;
            inset: 0;
            padding: 2px; // This controls border thickness
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
    }
        
    

    
`

    // Keyframes must be outside the styled component template literal
    
    const BorderGradient = createGlobalStyle`
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
        justify-content: center;`

    const ShowcaseList = styled.div`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;`

    const ShowcaseItem = styled.div`
        width: 200px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #444;
        color: white;
        border-radius: 5px;
        border: 1px solid rgb(99, 95, 95);
        
        &:hover {
        transform: scale(1.1);            
        transition: 0.3s ease-in-out;
        &::before {
            content: "";
            position: absolute;
            inset: 0;
            padding: 2px; // This controls border thickness
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
    }`

const FrontPage = () => {
    
    
    return (
        <Wrapper>
            <CarouselContainer>
                <CarouselComponent items={CarouselItems} onItemClick={(item) => console.log(item)} />
            </CarouselContainer>
            
            <Title> This is a future title</Title>
            <Subtitle>Find something or other here</Subtitle>

            <MiddleWrapper>
                <GenreWrapper>
                    <Title>Popular Genres</Title>
                    <GenreList>
                        <Genre>Action</Genre>
                        <Genre>RPG</Genre>
                        <Genre>Couch Co-op</Genre>
                        <Genre>MMO</Genre>
                    </GenreList>
                </GenreWrapper>
                <ShowcaseWrapper>
                    <Title>Featured Games</Title>
                    <ShowcaseList>
                        <ShowcaseItem>Get Game from API</ShowcaseItem>
                        <ShowcaseItem>Get Game from API</ShowcaseItem>
                        <ShowcaseItem>Get Game from API</ShowcaseItem>
                        <ShowcaseItem>Get Game from API</ShowcaseItem>
                        <ShowcaseItem>Get Game from API</ShowcaseItem>
                        <ShowcaseItem>Get Game from API</ShowcaseItem>
                    </ShowcaseList>
                </ShowcaseWrapper>
            </MiddleWrapper>
        </Wrapper>
    );
}

export default FrontPage;