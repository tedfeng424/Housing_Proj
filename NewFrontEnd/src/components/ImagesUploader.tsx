import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ImageUploader from 'react-images-upload';
import {
  setPicture,
  selectPost,
  UserPost,
  userPost,
} from '../redux/slices/posting';
import { useSelector, useDispatch } from 'react-redux';
import { postHousing } from '../apis/index';
// import Dropzone from 'react-dropzone';

// https://upmostly.com/tutorials/react-dropzone-file-uploads-react

// Should place this else where when combining everying
const tempStyle = {
  'font-family': 'Roboto Slab',
  'font-style': 'normal',
  'font-weight': 'normal',
  'font-size': '20px',
  'line-height': '26px',
  color: '#A6623F',
};

interface PathProps {
  setShow: (show: boolean) => void;
}

const FormMation = (photos: File[], posts: UserPost) => {
  const formData = new FormData();
  formData.append('json', JSON.stringify(posts));
  for (let i = 0; i < photos.length; i++) {
    formData.append('photos', photos[i]);
  }
  return formData;
};

const ImagesUploader: React.FC<PathProps> = ({ setShow }) => {
  const [pictures, setPictures] = useState<File[]>([]);
  const dispatch = useDispatch();
  const posts = useSelector(selectPost);
  // what is type of image?
  const onDrop = (picture: File[]) => {
    setPictures(picture);
  };

  return (
    <Container>
      <p className="text-center" style={tempStyle}>
        Now add something more personal~~
      </p>
      <div className="text-center">
        <svg width="400" height="19" viewBox="0 0 400 19" fill="none">
          <rect width="400" height="19" rx="9.5" fill="#E7936D" />
        </svg>
      </div>
      <br />
      <Form>
        <Form.Group>
          <ImageUploader
            withIcon
            withPreview
            label="Upload Images of Your Home"
            onChange={onDrop}
            imgExtension={['.jpg', '.png', '.jpeg']}
            maxFileSize={5242880}
          />
          <div className="text-center">
            <Button
              variant="primary"
              onClick={() => {
                dispatch(
                  userPost(() => postHousing(FormMation(pictures, posts))),
                );
                setShow(false);
              }}
            >
              Submit
            </Button>
          </div>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ImagesUploader;
