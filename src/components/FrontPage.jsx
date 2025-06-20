import CarouselComponent from "../modules/Carousel";
import styled from "styled-components";

const Wrapper = styled.div`
        width: 100%;
        height: 200vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f0f0f0;
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

const FrontPage = () => {
    
    
    return (
        <Wrapper>
            <CarouselContainer>
                <CarouselComponent items={CarouselItems} onItemClick={(item) => console.log(item)} />
            </CarouselContainer>
            
            <Title> This is a future title</Title>
            <Subtitle>Find something or other here</Subtitle>
        </Wrapper>
    );
}

export default FrontPage;