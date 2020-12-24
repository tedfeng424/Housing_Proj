import React from 'react';
import * as z from 'zod';
import { Container, Form, Row } from 'react-bootstrap';
import { WizardFormStep } from '../WizardForm';

export const page2Schema = z.object({
  leaserIntro: z
    .string()
    .min(1, 'You need to provide an introduction for others!')
    .max(600, 'Your introduction can only have maximum of 600 characters'),
});

export type Page2Store = z.infer<typeof page2Schema>;

export const page2InitialStore: Page2Store = {
  leaserIntro: '',
};

const PostPage2: React.FC<WizardFormStep<Page2Store>> = ({
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
            rows={10}
            onChange={(e) => setStore({ leaserIntro: e.target.value })}
          />
        </Form.Group>
      </Row>
    </Container>
  );
};

export default PostPage2 as React.FC;
