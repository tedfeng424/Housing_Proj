import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { roomTypeIcons, roomTypeUnchosen } from '../../assets/icons/all';
import AutoComplete from '../PlacesAutoComplete';

type RoomType = { [P in keyof typeof roomTypeUnchosen]: boolean };
interface Price {
  minimum: number;
  maximum: number;
}
const PostPage2: React.FC<{}> = () => {
  const [address, setAddress] = useState<string>('');
  const [roomType, setRoomType] = useState<RoomType>({
    single: false,
    double: false,
    triple: false,
    livingRoom: false,
    suite: false,
    studio: false,
  });
  const [price, setPrice] = useState<Price>({
    minimum: 100,
    maximum: 1000,
  });

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
        <Form.Label className="title">Location</Form.Label>
        <AutoComplete className="single-line-input w-100" />
      </Form.Row>

      <Row className="justify-content-center">
        {/* Room Type */}
        <Col
          md={12}
          lg={{ span: 5, offset: 1 }}
          className="justify-content-center"
        >
          <Row className="justify-content-center">
            <div className="title">Room Type</div>
          </Row>
          <Row className="justify-content-center">
            {(Object.keys(roomType) as Array<keyof typeof roomType>).map(
              (key) => {
                const RoomTypeUnchosen = roomTypeIcons[key];
                const RoomTypeChosen =
                  roomTypeIcons[`${key}Chosen` as keyof typeof roomTypeIcons];
                return (
                  <Button
                    className="btn-filter"
                    onClick={() => {
                      const changed = { ...roomType };
                      changed[key] = !roomType[key];
                      setRoomType({
                        ...changed,
                      });
                    }}
                  >
                    {roomType[key] ? <RoomTypeChosen /> : <RoomTypeUnchosen />}
                  </Button>
                );
              },
            )}
          </Row>
        </Col>

        {/* Price Range */}
        <Col
          md={12}
          lg={{ span: 5, offset: 1 }}
          className="justify-content-center"
        >
          <Row className="justify-content-center">
            <div className="title">Price Range</div>
          </Row>

          <Form.Row className="justify-content-center m-2">
            <Form.Label className="word mr-3">Min</Form.Label>
            <Col>
              <Form.Control
                className="single-line-input"
                type="number"
                min={0}
                value={price.minimum}
                onChange={(event) => {
                  setPrice({
                    ...price,
                    minimum: parseInt(event.target.value),
                  });
                }}
                isValid={price.minimum > 0 && price.maximum >= price.minimum}
                isInvalid={price.minimum <= 0 || price.maximum < price.minimum}
                placeholder="min price"
              />
            </Col>
          </Form.Row>

          <Form.Row className="justify-content-center m-2">
            <Form.Label className="word mr-3">Max</Form.Label>
            <Col>
              <Form.Control
                className="single-line-input"
                type="number"
                min="0"
                value={price.maximum}
                onChange={(event) => {
                  setPrice({
                    ...price,
                    maximum: parseInt(event.target.value),
                  });
                }}
                isValid={price.maximum > 0 && price.maximum >= price.minimum}
                isInvalid={price.maximum <= 0 || price.maximum < price.minimum}
                placeholder="max price"
              />
            </Col>
          </Form.Row>
        </Col>
        <Col lg={1} />
      </Row>
    </Container>
  );
};

export default PostPage2;
