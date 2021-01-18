import React, { useState } from 'react';
import { CarouselItem } from 'reactstrap';
import Col from 'react-bootstrap/esm/Col';
import Carousel from 'react-bootstrap/Carousel';
import { SlideShowItem } from './SlideShow';
import { carouselIcons } from '../assets/icons/all';

interface PathProps {
  items: SlideShowItem[];
  className?: string;
}

const PreviewSlideShow: React.FC<PathProps> = ({ items, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goToIndex = (newIndex: number) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.alt} className="d-block w-100 h-100" />
      </CarouselItem>
    );
  });

  // TODO eventually change to flexbox
  const thumbs = items.map((item, idx) => (
    <Col sm={Math.ceil(12 / items.length)} key={item.src} className="p-0 m-0 ">
      <img
        className={
          activeIndex == idx
            ? 'd-block w-100 h-100'
            : 'd-block w-100 h-100 selected-img'
        }
        src={item.src}
        alt={item.alt}
        onClick={() => goToIndex(idx)}
      />
    </Col>
  ));

  return (
    <div
      className={`h-100 d-flex flex-column align-items-stretch align-content-stretch ${className}`}
    >
      <Carousel
        activeIndex={activeIndex}
        onSelect={(index) => setActiveIndex(index)}
        nextIcon={<carouselIcons.rightArrow />}
        prevIcon={<carouselIcons.leftArrow />}
        interval={null}
        indicators={false}
        className="align-flex-stretch"
      >
        {slides}
      </Carousel>
      <div className="preview-slideshow-thumbnail">{thumbs}</div>
    </div>
  );
};

export default PreviewSlideShow;
