import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import * as z from 'zod';
import { WizardFormStep } from '../WizardForm';
import Input from '../basics/Input';

export const page1Schema = z.object({
  distance: z
    .number()
    .positive('Make sure distance is positive.')
    .min(1, 'Too fast!'),
});

export type Page1Store = z.infer<typeof page1Schema>;

export const page1InitialStore: Page1Store = {
  distance: 0,
};

const Page1: React.FC<WizardFormStep<Page1Store>> = ({
  distance,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <span className="post-title">Distance to School</span>
        </Col>
      </Row>

      <Form.Row className="justify-content-center m-2">
        <Col>
          <Input
            label="Distance (in mins.)"
            value={distance}
            onChange={(e) =>
              setStore({
                distance: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
            isValid={validations?.distance?.success}
            error={validations?.distance?.error}
          />
        </Col>
      </Form.Row>
    </Container>
  );
};

export default Page1 as React.FC;
