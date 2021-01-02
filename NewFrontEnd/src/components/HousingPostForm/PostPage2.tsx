import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import * as z from 'zod';
import { roomTypeIcons } from '../../assets/icons/all';
import AutoComplete from '../PlacesAutoComplete';
import { RoomType } from '../../assets/constants';
import { WizardFormStep } from '../WizardForm';
import Input from '../basics/Input';
import Dropdown from '../basics/Dropdown';

export const page2Schema = z.object({
  locationSearch: z.string(),
  selectedLocation: z.string().nonempty('Make sure to select an address.'),
  // propertyType: z.string().nonempty('Make sure to select a property type.'),
  // apartmentName: z.string(),
  numBeds: z.string().nonempty('Please enter number of bedrooms.'),
  numBaths: z.string().nonempty('Please enter number of bathrooms.'),
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
  // propertyType: '',
  // apartmentName: '',
  numBeds: '',
  numBaths: '',
  roomType: RoomType.single,
  price: 800,
};

const Page2: React.FC<WizardFormStep<Page2Store>> = ({
  locationSearch,
  selectedLocation,
  // propertyType,
  // apartmentName,
  numBeds,
  numBaths,
  roomType,
  price,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <span className="post-title">Room Information</span>
        </Col>
      </Row>

      <Form.Row className="justify-content-center m-2">
        <Col>
          {/* TODO need to check if the address is valid! Currently, if the user types something in and then clicks enter, it marks it as ok. This issue stems from an issue in PlaceAutoComplete.tsx */}
          <AutoComplete
            label="Location"
            className="w-100"
            initialAddress={locationSearch}
            onChange={(value) => {
              if (selectedLocation === '') setStore({ locationSearch: value });
              else setStore({ locationSearch: value, selectedLocation: '' });
            }}
            onSelect={(value) => {
              setStore({ locationSearch: value, selectedLocation: value });
            }}
            isValid={validations?.selectedLocation?.success}
            error={validations?.selectedLocation?.error}
            required
          />
          {/* <div className="wizard-form-invalid-feedback">
            {!validations?.selectedLocation?.success &&
              validations?.selectedLocation?.error}
          </div> */}
        </Col>
      </Form.Row>

      {/* <Form.Row className="m-2">
        <Col md={5}>
          <Dropdown
            options={['Townhouse', 'Flat']}
            label="Property Type"
            labelClassName="post-dropdown-label"
            className="post-dropdown"
            placeholder="Choose..."
            isValid={validations?.propertyType?.success}
            error={validations?.propertyType?.error}
            onSelect={(s, e) =>
              setStore({ propertyType: s !== null ? s : undefined })
            }
          />
        </Col>
        <Col md={{ span: 5, offset: 2 }}>
          <Input
            label="Apartment Name"
            labelClassName="post-input-label"
            value={apartmentName}
            className="post-dropdown"
            onChange={(e) => setStore({ apartmentName: e.target.value })}
          />
        </Col>
      </Form.Row> */}

      <Form.Row className="m-2 align-bottom">
        <Col md={3}>
          <Dropdown
            label="Bedrooms"
            options={['0', '1', '2', '3', '4', '5']}
            initialSelected={numBeds}
            isValid={validations?.numBeds?.success}
            error={validations?.numBeds?.error}
            onSelect={(s, e) =>
              setStore({ numBeds: s !== null ? s : undefined })
            }
            required
          />
        </Col>
        <Col md={{ span: 3, offset: 3 }}>
          <Dropdown
            label="Bathrooms"
            options={['0', '0.5', '1', '1.5', '2', '2.5', '3']}
            initialSelected={numBaths}
            isValid={validations?.numBaths?.success}
            error={validations?.numBaths?.error}
            onSelect={(s, e) =>
              setStore({ numBaths: s !== null ? s : undefined })
            }
            required
          />
        </Col>
      </Form.Row>

      <Form.Row className="justify-content-center m-2">
        <Form.Group as={Col}>
          <Form.Label className="post-word mb-2">Room Type</Form.Label>
          {(Object.entries(RoomType) as Array<
            [keyof typeof RoomType, RoomType]
          >).map(([key, value]) => {
            const RoomTypeUnchosen = roomTypeIcons[key];
            const RoomTypeChosen =
              roomTypeIcons[`${key}Chosen` as keyof typeof roomTypeIcons];
            return (
              <span className="mr-4">
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
              </span>
            );
          })}
        </Form.Group>
      </Form.Row>

      {/* <Row className="justify-content-center"> */}
      {/* Room Type */}
      {/* <Col
          md={12}
          lg={{ span: 5, offset: 1 }}
          className="justify-content-center"
        >
          <Row className="justify-content-center">
            <div className="post-word">Room Type</div>
          </Row> */}
      {/* TODO update the filter to be like below */}
      {/* <Row className="justify-content-center">
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
      </Row> */}
    </Container>
  );
};

export default Page2 as React.FC;
