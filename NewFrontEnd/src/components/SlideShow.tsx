import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

interface PathProps {
  setShow: (show: boolean) => void;
}

const SlideShow: React.FC<PathProps> = ({ setShow }) => {
  return (
    <Carousel interval={null}>
      <Carousel.Item>
        <img
          className="d-block w-100 h-100"
          src="https://cdn.vox-cdn.com/thumbor/op7DSI_UdWcXSbVGqA4wKYc2v3E=/0x0:1800x1179/1200x800/filters:focal(676x269:964x557)/cdn.vox-cdn.com/uploads/chorus_image/image/66741310/3zlqxf_copy.0.jpg"
          alt="First slide"
          onClick={() => setShow(true)}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-100"
          src="https://www.fosi.org/media/images/funny-game-of-thrones-memes-coverimage.width-800.jpg"
          alt="Third slide"
          onClick={() => setShow(true)}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-100"
          src="https://couriernewsroom.com/wp-content/uploads/sites/2/2020/06/coronavirus-memes-this-is-fine-1200x720.jpg"
          alt="Third slide"
          onClick={() => setShow(true)}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default SlideShow;
