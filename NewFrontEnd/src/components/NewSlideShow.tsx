import React, { useState } from 'react';
import Container from 'react-bootstrap/Container'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

const items = [
  {
    src: 'https://www.fosi.org/media/images/funny-game-of-thrones-memes-coverimage.width-800.jpg',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: 'https://www.fosi.org/media/images/funny-game-of-thrones-memes-coverimage.width-800.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: 'https://www.fosi.org/media/images/funny-game-of-thrones-memes-coverimage.width-800.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

const Example = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex:number) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} className="d-block w-100 h-100"/>
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  const thumbs = items.map((item,idx)=>{
      return (
          <Col md={4} style={{paddingLeft:0,paddingRight:0}}>
            <img className={activeIndex == idx? "d-block w-100 h-100": "d-block w-100 h-100 selected-img"} src={item.src} alt={item.altText} onClick={() => goToIndex(idx)}/>
          </Col>
      )
  }
  )

  return (
        <Col className="h-100">
            <Row style={{height:"80%"}}>
                <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                >
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
            </Row>
            <Row> 
                {thumbs}
            </Row>
        </Col>
  );
}

export default Example;