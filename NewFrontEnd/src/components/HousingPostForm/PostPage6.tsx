import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import { WizardFormStep } from '../WizardForm';

export interface PostPage6Store {
  pictures: File[];
}

export const PostPage6InitialStore: PostPage6Store = {
  pictures: [],
};

const PostPage6: React.FC<WizardFormStep<PostPage6Store>> = ({
  useWizardFormStorage,
  submitForm,
}) => {
  const [{ pictures }, errors, setStore] = useWizardFormStorage<
    PostPage6Store
  >();

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
