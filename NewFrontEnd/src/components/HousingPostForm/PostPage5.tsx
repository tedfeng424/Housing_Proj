import React from 'react';
import * as z from 'zod';
import { Container, Form, Row } from 'react-bootstrap';
import { WizardFormStep } from '../WizardForm';

export const page5Schema = z.object({
  leaserIntro: z
    .string()
    .min(1, 'You need to provide an introduction for others!')
    .max(500, 'Your introduction can only have maximum of 500 characters'),
});

export type Page5Store = z.infer<typeof page5Schema>;

export const page5InitialStore: Page5Store = {
  leaserIntro: '',
};

const PostPage5: React.FC<WizardFormStep<Page5Store>> = ({
  leaserIntro,
  validations,
  setStore,
}) => {
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
