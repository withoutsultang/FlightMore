import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import images from './Image';

const Slide = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const imageList = [images.img4, images.img1, images.img2, images.img3, images.img4];
    const intervalTime = 3000;

    useEffect(() => {
        const nextSlide = () => {
            setCurrentIndex((prevIndex) => 
                prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
            );
        };
    
        const interval = setInterval(nextSlide, intervalTime);
    
        return () => clearInterval(interval);
    }, [imageList.length]);

    return (
        <SliderContainer>
            <ImageWrapper currentIndex={currentIndex}>
                {imageList.map((image, index) => (
                    <Image src={image} alt={`Slide ${index}`} key={index} />
                ))}
            </ImageWrapper>
        </SliderContainer>
    );
};

export default Slide;

const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
`;

const ImageWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    transform: translateX(${(props) => `-${props.currentIndex * 100}%`});
    transition: transform 0.5s ease;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
`;
