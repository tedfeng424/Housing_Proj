import React from 'react';
import * as z from 'zod';
import { Container, Row, Button } from 'react-bootstrap';
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
  validations,
  setStore,
  submitForm,
}) => {
  return (
    <Container>
      <Row>
        <ImageUploader
          withIcon
          withPreview
          label="Upload images of your home!"
          onChange={(p) => setStore({ pictures: p })}
          imgExtension={['.jpg', '.png', '.jpeg']}
          maxFileSize={5242880}
        />
      </Row>
      <div className="text-center">
        <Button variant="primary" onClick={() => submitForm()}>
          Submit
        </Button>
      </div>
    </Container>
  );
};

export default PostPage6 as React.FC;
