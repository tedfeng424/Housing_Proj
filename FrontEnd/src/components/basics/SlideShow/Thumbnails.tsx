import React from 'react';
import { Button } from 'react-bootstrap';
import { SlideShowItem } from '../../SlideShow';

interface ThumbnailsProps {
  images: SlideShowItem[];
  activeIndex?: number;
  onClick?: (index: number) => any;
}

const Thumbnails: React.FC<ThumbnailsProps> = ({
  images,
  activeIndex,
  onClick,
}) => (
  <div className="slideshow-thumbnail">
    {images.map((image, index) => (
      <button type="button" onClick={() => onClick && onClick(index)}>
        <img
          className={activeIndex === index ? 'selected-img' : ''}
          src={image.src}
          alt={image.alt}
        />
      </button>
    ))}
  </div>
);

export default Thumbnails;
