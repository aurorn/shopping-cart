

import styled from "styled-components";

const FrontPage = () => {
    const Wrapper = styled.div`
        width: 100%;
        height: 200vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
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
    
    return (
        <Wrapper>
        <Title>Welcome to Our Shopping Cart</Title>
        <Subtitle>Find the best deals here!</Subtitle>
        </Wrapper>
    );
}

export default FrontPage;