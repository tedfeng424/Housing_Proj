import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import * as z from 'zod';
import { WizardFormStep } from '../WizardForm';
import Input from '../basics/Input';
import { miscIcons } from '../../assets/icons/all';

export const page3Schema = z
  .object({
    minPrice: z.number().positive('Make sure price is positive.'),
    maxPrice: z
      .number()
      .positive('Make sure price is positive.')
      .max(5000, 'This is unrealistic for a college student!'),
  })
  .refine((vals) => vals.minPrice <= vals.maxPrice, {
    message: 'Minimum price cannot be larger than maximum price!',
    path: ['minPrice', 'maxPrice'],
  });

export type Page3Store = z.infer<typeof page3Schema>;

export const page3InitialStore: Page3Store = {
  minPrice: 0,
  maxPrice: 5000,
};

const Page3: React.FC<WizardFormStep<Page3Store>> = ({
  minPrice,
  maxPrice,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row className="justify-content-center m-2 my-4">
        <div className="post-title">Price Range</div>
      </Row>

      <Row className="m-2">
        <Col>
          <Form inline className="justify-content-center">
            <Form.Label className="filterform-word m-2">$</Form.Label>
            <Input
              value={minPrice}
              onChange={(e) =>
                setStore({
                  minPrice: e.target.value
                    ? parseInt(e.target.value)
                    : undefined,
                })
              }
              className="filterform-short-input m-2 mr-5"
              isValid={validations?.minPrice?.success}
              error={validations?.minPrice?.error}
              errorClassName="d-none"
            />
            <miscIcons.dash />
            <Form.Label className="filterform-word m-2 ml-5">$</Form.Label>
            <Input
              value={maxPrice}
              onChange={(e) =>
                setStore({
                  maxPrice: e.target.value
                    ? parseInt(e.target.value)
                    : undefined,
                })
              }
              className="filterform-short-input m-2"
              isValid={validations?.maxPrice?.success}
              error={validations?.maxPrice?.error}
              errorClassName="d-none"
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Page3 as React.FC;
