import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import * as z from 'zod';
import { RoomType } from '../../assets/constants';
import { roomTypeIcons } from '../../assets/icons/all';
import { WizardFormStep } from '../WizardForm';
import Dropdown from '../basics/Dropdown';

export const page2Schema = z.object({
  numBeds: z.string(),
  numBaths: z.string(),
  roomType: z.nativeEnum(RoomType),
});

export type Page2Store = z.infer<typeof page2Schema>;

export const page2InitialStore: Page2Store = {
  numBeds: '0',
  numBaths: '0',
  roomType: RoomType.single,
};

const Page2: React.FC<WizardFormStep<Page2Store>> = ({
  numBeds,
  numBaths,
  roomType,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row className="justify-content-center m-2 my-4">
        <div className="post-title">Unit / Room Type</div>
      </Row>

      <br />

      <Row className="m-2">
        <Col>
          <Form.Label className="filterform-word">Unit Size</Form.Label>
        </Col>
      </Row>
      <Row className="m-2">
        <Col md={2}>
          <Dropdown
            options={['0', '1', '2', '3', '4', '5']}
            // className="filterform-short-dropdown"
            isValid={validations?.numBeds?.success}
            error={validations?.numBeds?.error}
            onSelect={(s, e) =>
              setStore({ numBeds: s !== null ? s : undefined })
            }
          />
        </Col>
        <Col md={2}>
          <Form.Label className="filterform-word m-2">Bedrooms</Form.Label>
        </Col>
        <Col md={2}>
          <Dropdown
            options={['0', '0.5', '1', '1.5', '2', '2.5', '3']}
            // className="filterform-short-dropdown"
            isValid={validations?.numBaths?.success}
            error={validations?.numBaths?.error}
            onSelect={(s, e) =>
              setStore({ numBaths: s !== null ? s : undefined })
            }
          />
        </Col>
        <Col md={2}>
          <Form.Label className="filterform-word m-2">Bathrooms</Form.Label>
        </Col>
      </Row>

      <Row className="m-2 mt-5">
        <Col>
          <Form.Label className="filterform-word">Room Type</Form.Label>
        </Col>
      </Row>
      <Row className="justify-content-center m-2">
        <Col>
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
        </Col>
      </Row>
    </Container>
  );
};

export default Page2 as React.FC;
