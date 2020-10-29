import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ImageUploader from 'react-images-upload';
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

const ImagesUploader: React.FC<{}> = (props) => {
  const picturesArr: any[] = []; // what is the type of picture?
  const [pictures, setPictures] = useState(picturesArr);

  // what is type of image?
  const onDrop = (picture: any) => {
    setPictures([...pictures, picture]);
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
            {...props}
            withIcon
            withPreview
            label="Upload Images of Your Home"
            onChange={onDrop}
            imgExtension={['.jpg', '.png']}
            maxFileSize={5242880}
          />
          <div className="text-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ImagesUploader;
