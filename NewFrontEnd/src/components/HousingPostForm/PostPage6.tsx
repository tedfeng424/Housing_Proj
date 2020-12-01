import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import { WizardFormStep } from '../WizardForm';

export interface PostPage6Store {
  pictures: File[];
}

const PostPage6: React.FC<WizardFormStep<PostPage6Store>> = ({
  exitWizardForm,
  useWizardFormStorage,
}) => {
  const [{ pictures }, setStore] = useWizardFormStorage<PostPage6Store>({
    pictures: [],
  });

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
        <Button
          variant="primary"
          onClick={() => {
            // dispatch(
            //   userPost(() => postHousing(FormMation(pictures, posts))),
            // ); // TODO
            exitWizardForm();
          }}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
};

export default PostPage6 as React.FC;
