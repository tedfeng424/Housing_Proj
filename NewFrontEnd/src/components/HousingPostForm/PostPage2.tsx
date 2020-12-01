import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { roomTypeIcons } from '../../assets/icons/all';
import AutoComplete from '../PlacesAutoComplete';
import { RoomType } from '../../assets/constants';
import { WizardFormStep } from '../WizardForm';

export interface PostPage2Store {
  locationSearch: string;
  selectedLocation?: string;
  roomType: keyof typeof RoomType;
  price: number;
}

export const PostPage2InitialStore: PostPage2Store = {
  locationSearch: '',
  roomType: 'single',
  price: 500,
};

const PostPage2: React.FC<WizardFormStep<PostPage2Store>> = ({
  useWizardFormStorage,
}) => {
  const [
    { locationSearch, selectedLocation, roomType, price },
    setStore,
  ] = useWizardFormStorage<PostPage2Store>();

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
            setStore({ locationSearch: value, selectedLocation: undefined });
          }}
          onSelect={(value) => {
            setStore({ locationSearch: value, selectedLocation: value });
          }}
          isValid={selectedLocation !== undefined}
          isInvalid={!selectedLocation}
        />
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
            {(Object.keys(RoomType) as Array<keyof typeof RoomType>).map(
              (key) => {
                const RoomTypeUnchosen = roomTypeIcons[key];
                const RoomTypeChosen =
                  roomTypeIcons[`${key}Chosen` as keyof typeof roomTypeIcons];
                return (
                  <Button
                    variant="no-show"
                    className="btn-filter"
                    key={key}
                    onClick={() => {
                      setStore({ roomType: key });
                    }}
                  >
                    {roomType === key ? (
                      <RoomTypeChosen />
                    ) : (
                      <RoomTypeUnchosen />
                    )}
                  </Button>
                );
              },
            )}
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
                isValid={price !== undefined && price > 0} // TODO set the max of the price
                isInvalid={!price || price <= 0}
                placeholder="Price"
              />
            </Col>
          </Form.Row>
        </Col>
        <Col lg={1} />
      </Row>
    </Container>
  );
};

export default PostPage2 as React.FC;
