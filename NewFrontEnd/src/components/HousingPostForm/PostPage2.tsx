import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import * as z from 'zod';
import { roomTypeIcons } from '../../assets/icons/all';
import AutoComplete from '../PlacesAutoComplete';
import { RoomType } from '../../assets/constants';
import { WizardFormStep } from '../WizardForm';

export const page2Schema = z.object({
  locationSearch: z.string(),
  selectedLocation: z.string().nonempty('Make sure to select an address.'),
  roomType: z.nativeEnum(RoomType),
  price: z
    .number()
    .positive('Make sure the price is positive.')
    .max(5000, 'The price is unreasonably high for college students!'),
});

export type Page2Store = z.infer<typeof page2Schema>;

export const page2InitialStore: Page2Store = {
  locationSearch: '',
  selectedLocation: '',
  roomType: RoomType.single,
  price: 800,
};

const Page2: React.FC<WizardFormStep<Page2Store>> = ({
  locationSearch,
  roomType,
  price,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <span className="post-title">
            ...about the room, time & stay period
          </span>
        </Col>
      </Row>

      <Form.Row className="justify-content-center m-2 my-4">
        <Form.Label className="post-word">Location</Form.Label>
        <AutoComplete
          className="single-line-input w-100"
          initialAddress={locationSearch}
          onChange={(value) => {
            setStore({ locationSearch: value, selectedLocation: '' });
          }}
          onSelect={(value) => {
            setStore({ locationSearch: value, selectedLocation: value });
          }}
          isValid={validations?.selectedLocation?.success}
        />
        <div className="wizard-form-invalid-feedback">
          {!validations?.selectedLocation?.success &&
            validations?.selectedLocation?.error}
        </div>
      </Form.Row>

      <Row className="justify-content-center">
        {/* Room Type */}
        <Col
          md={12}
          lg={{ span: 5, offset: 1 }}
          className="justify-content-center"
        >
          <Row className="justify-content-center">
            <div className="post-word">Room Type</div>
          </Row>
          {/* TODO update the filter to be like below */}
          <Row className="justify-content-center">
            {(Object.entries(RoomType) as Array<
              [keyof typeof RoomType, RoomType]
            >).map(([key, value]) => {
              const RoomTypeUnchosen = roomTypeIcons[key];
              const RoomTypeChosen =
                roomTypeIcons[`${key}Chosen` as keyof typeof roomTypeIcons];
              return (
                <Button
                  variant="no-show"
                  className="btn-filter"
                  key={key}
                  onClick={() => {
                    setStore({ roomType: value });
                  }}
                >
                  {roomType === value ? (
                    <RoomTypeChosen />
                  ) : (
                    <RoomTypeUnchosen />
                  )}
                </Button>
              );
            })}
          </Row>
        </Col>

        <Col
          md={12}
          lg={{ span: 5, offset: 1 }}
          className="justify-content-center"
        >
          <Row className="justify-content-center">
            <div className="post-word">Price</div>
          </Row>

          <Form.Row className="justify-content-center m-2">
            <Form.Label className="word mr-3">$</Form.Label>
            <Col>
              <Form.Control
                className="single-line-input"
                type="number"
                value={price}
                onChange={(e) => {
                  if (e.target.value) {
                    setStore({ price: parseInt(e.target.value) });
                  } else {
                    setStore({ price: undefined }); // force it to be invalid
                  }
                }}
                isValid={validations?.price?.success}
                placeholder="Price"
              />
            </Col>
          </Form.Row>
          <div className="wizard-form-invalid-feedback">
            {!validations?.price?.success && validations?.price?.error}
          </div>
        </Col>
        <Col lg={1} />
      </Row>
    </Container>
  );
};

export default Page2 as React.FC;
