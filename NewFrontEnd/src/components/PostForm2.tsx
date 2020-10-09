import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { MoveInSelect, StringWrap } from './utils/CardUtil';
import { roomTypeIcons, roomTypeUnchosen } from '../assets/icons/all';
import { intervalOptions, yearMonths } from '../assets/constants/constants';

type RoomType = { [P in keyof typeof roomTypeUnchosen]: boolean };
interface Price {
  minimum: number;
  maximum: number;
}
const Slide2: React.FC<{}> = () => {
  const [monthCount, setMonthCount] = useState<number>(1);
  const [earlyInterval, setEarlyInterval] = useState<string>('Anytime');
  const [show, setShow] = useState<boolean>(false);
  const [earlyMonth, setEarlyMonth] = useState<string>('Anytime');
  const [lateInterval, setLateInterval] = useState<string>('Anytime');
  const [lateMonth, setLateMonth] = useState<string>('Anytime');
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
    <>
      <Container>
        <Row>
          <Button onClick={() => setShow(true)}>Second Page</Button>
        </Row>
      </Container>
      <Modal
        dialogClassName="post-modal"
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        centered
      >
        <Row>
          <Col>
            <span className="post-title">
              ...about the room, time & stay period{' '}
            </span>
          </Col>
        </Row>
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
                    <Col>
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
                        {roomType[key] ? (
                          <RoomTypeChosen />
                        ) : (
                          <RoomTypeUnchosen />
                        )}
                      </Button>
                    </Col>
                  );
                },
              )}
            </Row>
          </Col>

          {/* Price Range */}
          <Col
            md={12}
            lg={{ span: 4, offset: 1 }}
            className="justify-content-center"
          >
            <Row className="justify-content-center">
              <div className="title">Price Range</div>
            </Row>

            <Form.Row className="justify-content-center m-2">
              <Form.Label className="word mr-3">Min</Form.Label>
              <Col>
                <Form.Control
                  className="form-input"
                  type="number"
                  min={0}
                  value={price.minimum}
                  onChange={(event) => {
                    setPrice({
                      ...price,
                      minimum: parseInt(event.target.value),
                    });
                  }}
                  isValid={price.minimum > 0}
                  isInvalid={price.minimum <= 0}
                  placeholder="min price"
                />
              </Col>
            </Form.Row>

            <Form.Row className="justify-content-center m-2">
              <Form.Label className="word mr-3">Max</Form.Label>
              <Col>
                <Form.Control
                  className="form-input"
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
                  isInvalid={price.maximum <= 0}
                  placeholder="max price"
                />
              </Col>
            </Form.Row>
          </Col>
          <Col lg={1} />
        </Row>
        <Row className="justify-content-center">
          {/* Move in time */}
          <Col md={12} lg={6} className="justify-content-center">
            <Row className="justify-content-center">
              <div className="title">Move in time</div>
            </Row>

            <Row className="justify-content-center">
              <span className="word mr-3">As early as</span>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  {earlyInterval}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {intervalOptions.map((interval) => (
                    <Dropdown.Item
                      eventKey={interval}
                      onSelect={(event) => setEarlyInterval(StringWrap(event))}
                    >
                      {interval}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Form.Group>
                <Form.Control
                  className="clear-border"
                  as={Dropdown}
                  isValid={MoveInSelect(
                    earlyMonth,
                    earlyInterval,
                    lateMonth,
                    lateInterval,
                  )}
                  isInvalid={
                    !MoveInSelect(
                      earlyMonth,
                      earlyInterval,
                      lateMonth,
                      lateInterval,
                    )
                  }
                >
                  <Dropdown.Toggle
                    className="form-dropdown ml-0"
                    id="dropdown-basic"
                  >
                    {earlyMonth}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="menu">
                    {yearMonths.map((month) => (
                      <Dropdown.Item
                        eventKey={month}
                        onSelect={(eventKey) =>
                          setEarlyMonth(StringWrap(eventKey))
                        }
                      >
                        {month}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Form.Control>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Invalid value!
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="justify-content-center">
              <span className="word notes">As late as </span>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  {lateInterval}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {intervalOptions.map((interval) => (
                    <Dropdown.Item
                      eventKey={interval}
                      onSelect={(eventKey) =>
                        setLateInterval(StringWrap(eventKey))
                      }
                    >
                      {interval}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Form.Group>
                <Form.Control className="clear-border" as={Dropdown}>
                  <Dropdown.Toggle
                    className="form-dropdown ml-0"
                    id="dropdown-basic"
                  >
                    {lateMonth}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="menu">
                    {yearMonths.map((month) => (
                      <Dropdown.Item
                        eventKey={month}
                        onSelect={(eventKey) =>
                          setLateMonth(StringWrap(eventKey))
                        }
                      >
                        {month}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Form.Control>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Invalid Value!
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Col>

          <Col
            md={12}
            lg={{ span: 5, offset: 1 }}
            className="justify-content-center"
          >
            <Row className="justify-content-center">
              <div className="title">Stay period</div>
            </Row>
            <Row className="justify-content-center">
              <Col>
                <Form.Group as={Row} controlId="formNumberOfMonths">
                  <Col sm={8} md={8}>
                    <Form.Control
                      value={monthCount}
                      onChange={(event) =>
                        setMonthCount(parseInt(event.target.value))
                      }
                      type="number"
                      placeholder="# of Months"
                      isValid={monthCount > 0 && monthCount <= 12}
                      isInvalid={monthCount <= 0 || monthCount > 12}
                    />
                  </Col>
                  <span className="word">Month(s)</span>
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Slide2;
