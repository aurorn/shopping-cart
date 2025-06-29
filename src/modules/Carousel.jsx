// Carousel.jsx
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  user-select: none;
`;

const CarouselSlide = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: grey;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background-color: rgba(34, 34, 34, 0.62);
    
    
    filter: drop-shadow(0px -10px 10px rgba(0, 0, 0, 0.56));
  }

`;

const CarouselContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 20px;
  color: white;
  text-align: center;
  

  z-index: 2;

  h3 {
    margin: 0 0 10px 0;
    font-size: 30px;
  }

  p {
    margin: 0;
    font-size: 15px;
  }

  ${CarouselSlide}:hover & {
    opacity: 1;
  }
`;

const ArrowWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
    height: 100%;
    width: 70px;
    background: linear-gradient(0deg,rgba(0, 0, 0, 0) 0%, rgba(76, 158, 84, 0.49) 50%, rgba(0, 0, 0, 0) 100%);

    &:hover {
      background: linear-gradient(0deg,rgba(0, 0, 0, 0) 0%, rgba(76, 158, 84, 1) 50%, rgba(0, 0, 0, 0) 100%);
    }
`

const Arrow = styled.div`
  display: flex;
  align-self: center;
  padding: 10px;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 10;
  font-size: 2rem;
  

  &:hover {
    scale: 1.3;
  }
`;
  
const Carousel = ({ items, onItemClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = 3000;

  useEffect(() => {
    if (!items || items.length === 0) return;
    let interval;
    if (isAutoPlaying) {
        interval = setInterval(() => {
            nextSlide();
        }, autoPlayInterval);
    }
    return() => {
        if(interval) {
            clearInterval(interval);
        }
    };
  }, );

  if (!items || items.length === 0) {
    return <div style={{color: "white", textAlign: "center", padding: "2rem"}}>No items to display</div>;
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

    const handleMouseEnter = () => {
        setIsAutoPlaying(false);
    };

    const handleMouseLeave = () => {
        setIsAutoPlaying(true);
    };

  return (
    <CarouselWrapper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
      <ArrowWrapper>
        <Arrow className="prev" onClick={prevSlide}><HiChevronLeft/></Arrow>
      </ArrowWrapper>
      
      
      <CarouselSlide onClick={() => onItemClick(items[currentIndex])}>
        <img 
          src={items[currentIndex].image} 
          alt={items[currentIndex].title} 
        />
        <CarouselContent>
          <h3>{items[currentIndex].title}</h3>
          <p>{items[currentIndex].description}</p>
        </CarouselContent>
      </CarouselSlide>
      <ArrowWrapper>
        <Arrow className="next" onClick={nextSlide}><HiChevronRight/></Arrow>
      </ArrowWrapper>
    </CarouselWrapper>
  );
};

export default Carousel;