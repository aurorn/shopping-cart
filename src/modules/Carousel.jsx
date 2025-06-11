// Carousel.jsx
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100svw;
  height: 600px;
  overflow: hidden;
`;

const CarouselSlide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(0, 0, 0, 0.5) 51%,
      rgba(0, 0, 0, 0.65) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const CarouselContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 20px;
  color: white;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 2;

  h3 {
    margin: 0 0 10px 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
  }

  ${CarouselSlide}:hover & {
    opacity: 1;
  }
`;

const Arrow = styled.div`position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  border: none;
  cursor: pointer;
  z-index: 10;
  font-size: 2rem;

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }
`;
  
const Carousel = ({ items, onItemClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = 3000;

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

  useEffect(() => {
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
      <Arrow className="prev" onClick={prevSlide}><HiChevronLeft/></Arrow>
      <Arrow className="next" onClick={nextSlide}><HiChevronRight/></Arrow>
      
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
    </CarouselWrapper>
  );
};

export default Carousel;