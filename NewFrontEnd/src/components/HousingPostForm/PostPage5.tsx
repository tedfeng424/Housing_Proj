import React from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { WizardFormStep } from '../WizardForm';

export interface PostPage5Store {
  leaserIntro: string;
}

const PostPage5: React.FC<WizardFormStep<PostPage5Store>> = ({
  useWizardFormStorage,
}) => {
  const [{ leaserIntro }, setStore] = useWizardFormStorage<PostPage5Store>({
    leaserIntro: '',
  });

  return (
    <Container>
      <Row>
        <Form.Group className="w-100">
          <Form.Label className="post-word">
            What's your lifestyle like?
          </Form.Label>
          <Form.Control
            className="post-text"
            as="textarea"
            value={leaserIntro}
            placeholder="Introduce yourself to your potential roommates!"
            rows={5}
            onChange={(e) => setStore({ leaserIntro: e.target.value })}
          />
        </Form.Group>
      </Row>
    </Container>
  );
};

export default PostPage5 as React.FC;
