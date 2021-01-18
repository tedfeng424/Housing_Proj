import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { carouselIcons } from '../assets/icons/all';

export interface SlideShowItem {
  src: string;
  alt: string;
}

interface PathProps {
  images: SlideShowItem[];
  onImageClick?: () => any;
  className?: string;
  showPreview?: boolean;
}

const SlideShow: React.FC<PathProps> = ({
  images,
  onImageClick,
  className = '',
  showPreview,
}) => {
  // need to track animation so the user cannot click on a preview during animation
  const [animating, setAnimating] = useState(false);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const goToIndex = (index: number) => {
    if (animating) return;
    setImageIndex(index);
  };

  return (
    <div
      className={`h-100 d-flex flex-column align-items-stretch align-content-stretch ${className}`}
    >
      <Carousel
        nextIcon={<carouselIcons.rightArrow />}
        prevIcon={<carouselIcons.leftArrow />}
        interval={null}
        className="w-100"
      >
        {images.map((image) => (
          <Carousel.Item key={image.src}>
            <button
              className="no-show w-100 h-100"
              type="button"
              onClick={onImageClick}
              onKeyDown={
                onImageClick && (({ key }) => key === 'Enter' && onImageClick())
              }
            >
              <img
                className="d-block w-100 h-100"
                src={image.src}
                alt={image.alt}
              />
            </button>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default SlideShow;

export const testSlideShow: Array<SlideShowItem> = [
  {
    src:
      'https://cdn.vox-cdn.com/thumbor/op7DSI_UdWcXSbVGqA4wKYc2v3E=/0x0:1800x1179/1200x800/filters:focal(676x269:964x557)/cdn.vox-cdn.com/uploads/chorus_image/image/66741310/3zlqxf_copy.0.jpg',
    alt: 'First slide',
  },
  {
    src: 'https://houseit.s3.us-east-2.amazonaws.com/test0.png',
    alt: 'Second slide',
  },
  {
    src:
      'https://couriernewsroom.com/wp-content/uploads/sites/2/2020/06/coronavirus-memes-this-is-fine-1200x720.jpg',
    alt: 'Third slide',
  },
];
