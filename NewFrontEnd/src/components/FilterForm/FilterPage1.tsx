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
  distance: 20, // 0
};

const Page1: React.FC<WizardFormStep<Page1Store>> = ({
  distance,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row className="justify-content-center m-2 my-4">
        <div className="post-title">Distance to School</div>
      </Row>

      <br />

      <Row className="m-2">
        <Col>
          <Form inline className="justify-content-center">
            <Form.Label className="filterform-word mb-2">
              Less than&nbsp;
            </Form.Label>
            <Input
              value={distance}
              type="number"
              onChange={(e) =>
                setStore({
                  distance: e.target.value
                    ? parseInt(e.target.value)
                    : undefined,
                })
              }
              className="filterform-short-input mb-2"
              isValid={validations?.distance?.success}
              isInvalid={
                validations?.distance && !validations?.distance?.success
              }
            />
            <Form.Label className="filterform-word mb-2">
              &nbsp;mins.
            </Form.Label>
            <Form.Label className="filterform-word mb-2">
              &nbsp;public transportation to Price Center
            </Form.Label>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Page1 as React.FC;
