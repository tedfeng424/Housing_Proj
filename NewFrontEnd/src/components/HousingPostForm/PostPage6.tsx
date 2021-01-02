import React from 'react';
import * as z from 'zod';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import { WizardFormStep } from '../WizardForm';

export const page6Schema = z.object({
  pictures: z.array(z.any()).min(1, 'You need to add some pictures!'),
});

export interface Page6Store {
  pictures: File[];
}

export const page6InitialStore: Page6Store = {
  pictures: [],
};

const PostPage6: React.FC<WizardFormStep<Page6Store>> = ({
  pictures,
  validations,
  setStore,
  submitForm,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <span className="post-title">Upload photos of your place</span>
        </Col>
      </Row>

      <Row>
        <ImageUploader
          withIcon
          withPreview
          label=""
          onChange={(p) => {
            setStore({ pictures: [...pictures, ...p] });
          }}
          imgExtension={['.jpg', '.png', '.jpeg']}
          maxFileSize={5242880}
          className="house-post-image-uploader"
          buttonText="+"
          buttonClassName="house-post-image-uploader-btn"
          errorClass="house-post-error-label"
        />
      </Row>
      <div className="house-post-error-label">
        {validations?.pictures?.error}
      </div>

      <div className="text-center">
        <Button variant="primary" onClick={() => submitForm()}>
          Submit
        </Button>
      </div>
    </Container>
  );
};

export default PostPage6 as React.FC;
