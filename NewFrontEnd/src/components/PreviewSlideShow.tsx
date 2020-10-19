import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { AtLeastOne } from '../assets/utils';

interface PreviewSlideShowItem {
  src: string;
  altText: string;
  caption: string;
}

export const testSlideShow: AtLeastOne<PreviewSlideShowItem> = [
  {
    src:
      'https://i.pinimg.com/474x/98/d2/90/98d2901d829bb21263e099e3fe4701e7.jpg',
    altText: 'Slide 1',
    caption: 'Slide 1',
  },
  {
    src:
      'https://i.pinimg.com/474x/98/d2/90/98d2901d829bb21263e099e3fe4701e7.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2',
  },
  {
    src:
      'https://i.pinimg.com/474x/98/d2/90/98d2901d829bb21263e099e3fe4701e7.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3',
  },
];

interface PathProps {
  items: AtLeastOne<PreviewSlideShowItem>;
  className?: string;
}

const PreviewSlideShow: React.FC<PathProps> = ({ items, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

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
        <img
          src={item.src}
          alt={item.altText}
          className="d-block w-100 h-100"
        />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  // TODO eventually change to flexbox
  const thumbs = items.map((item, idx) => (
    <Col sm={Math.ceil(12 / items.length)} className="p-0 m-0 ">
      <img
        className={
          activeIndex == idx
            ? 'd-block w-100 h-100'
            : 'd-block w-100 h-100 selected-img'
        }
        src={item.src}
        alt={item.altText}
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
        next={next}
        previous={previous}
        className="align-flex-stretch"
      >
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
      <div className="preview-slideshow-thumbnail">{thumbs}</div>
    </div>
  );
};

export default PreviewSlideShow;
