import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import * as z from 'zod';
import { roomTypeIcons, roomTypeIconsTemp } from '../../assets/icons/all';
import AutoComplete from '../PlacesAutoComplete';
import { RoomType } from '../../assets/constants';
import { WizardFormStep } from '../WizardForm';
import Input from '../basics/Input';
import Dropdown from '../basics/Dropdown';
import ToggleGroup from '../basics/ToggleGroup';

export const page2Schema = z.object({
  locationSearch: z.string(),
  selectedLocation: z.string().nonempty('Make sure to select an address.'),
  // propertyType: z.string().nonempty('Make sure to select a property type.'),
  // apartmentName: z.string(),
  numBeds: z.string().nonempty('Please enter number of bedrooms.'),
  numBaths: z.string().nonempty('Please enter number of bathrooms.'),
  roomTypes: z
    .nativeEnum(RoomType)
    .array()
    .min(1, 'Please choose at least one room type.'),
});

export type Page2Store = z.infer<typeof page2Schema>;

export const page2InitialStore: Page2Store = {
  locationSearch: '',
  selectedLocation: '',
  // propertyType: '',
  // apartmentName: '',
  numBeds: '',
  numBaths: '',
  roomTypes: [],
};

const Page2: React.FC<WizardFormStep<Page2Store>> = ({
  locationSearch,
  selectedLocation,
  // propertyType,
  // apartmentName,
  numBeds,
  numBaths,
  roomTypes,
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
            label="Address"
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
        </Col>
      </Form.Row>

      <Form.Row className="m-2 align-bottom">
        <Col md={3}>
          <Dropdown
            label="Bedrooms"
            options={['1', '2', '3', '4', '5', '6+']}
            initialSelected={numBeds}
            isValid={validations?.numBeds?.success}
            error={validations?.numBeds?.error}
            onSelect={(s) => setStore({ numBeds: s !== null ? s : undefined })}
            noFilter
            required
          />
        </Col>
        <Col md={{ span: 3, offset: 3 }}>
          <Dropdown
            label="Bathrooms"
            options={['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4']}
            initialSelected={numBaths}
            isValid={validations?.numBaths?.success}
            error={validations?.numBaths?.error}
            onSelect={(s) => setStore({ numBaths: s !== null ? s : undefined })}
            noFilter
            required
          />
        </Col>
      </Form.Row>

      <Form.Row className="m-2">
        <ToggleGroup
          content={[
            { label: RoomType.single, icon: roomTypeIconsTemp.single },
            { label: RoomType.double, icon: roomTypeIconsTemp.double },
            { label: RoomType.triple, icon: roomTypeIconsTemp.triple },
          ]}
          label="Room Type (select all that apply)"
          required
          initialSelected={roomTypes}
          onSelect={({ label, selected }) => {
            if (selected) {
              roomTypes.push(label as RoomType);
              setStore({ roomTypes: [...roomTypes] });
            } else {
              setStore({
                roomTypes: roomTypes.filter((roomType) => roomType !== label),
              });
            }
          }}
          error={validations?.roomTypes?.error}
        />
      </Form.Row>
    </Container>
  );
};

export default Page2 as React.FC;
