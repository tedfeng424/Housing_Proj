import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import {
  roomTypeIcons,
  roomTypeUnchosen,
  filterIcons,
  preferencesIcons,
} from '../assets/icons/all';
import { intervalOptions, yearMonths } from '../assets/constants/constants';

interface Preferences {
  female: boolean;
  male: boolean;
  lgbtq: boolean;
  parking: boolean;
  pets: boolean;
  privateBath: boolean;
  _420: boolean;
}

type RoomType = { [P in keyof typeof roomTypeUnchosen]: boolean };

interface Price {
  minimum: number;
  maximum: number;
}

function MoveInSelect(
  earlyMonth: string,
  earlyInterval: string,
  lateMonth: string,
  lateInterval: string,
) {
  if (yearMonths.indexOf(earlyMonth) > yearMonths.indexOf(lateMonth)) {
    // neither has anytime as the option
    if (![earlyMonth, lateMonth].includes(yearMonths[0])) {
      return false;
    }
  }
  if (
    yearMonths.indexOf(earlyMonth) === yearMonths.indexOf(lateMonth) &&
    ![earlyMonth, lateMonth].includes(yearMonths[0])
  ) {
    // neither has anytime as the option
    if (
      ![earlyInterval, lateInterval].includes(intervalOptions[0]) &&
      intervalOptions.indexOf(earlyInterval) >
        intervalOptions.indexOf(lateInterval)
    ) {
      return false;
    }
  }
  return true;
}

function StringWrap(toWrap: string | null) {
  if (toWrap == null) {
    return 'placeHolder';
  }
  return toWrap;
}

const Separator: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => (
  <div className="d-flex justify-content-center my-5">
    <div className="separator" />
  </div>
);

const Filter: React.FC<{}> = () => {
  const [show, setShow] = useState<boolean>(false);
  const [earlyInterval, setEarlyInterval] = useState<string>('Anytime');
  const [earlyMonth, setEarlyMonth] = useState<string>('Anytime');
  const [lateInterval, setLateInterval] = useState<string>('Anytime');
  const [lateMonth, setLateMonth] = useState<string>('Anytime');
  const [monthCount, setMonthCount] = useState<number>(1);
  const [minute, setMinute] = useState<number>(20);
  const [roomType, setRoomType] = useState<RoomType>({
    single: false,
    double: false,
    triple: false,
    livingRoom: false,
    suite: false,
    studio: false,
  });
  const [preferences, setPreferences] = useState<Preferences>({
    female: false,
    male: false,
    lgbtq: false,
    parking: false,
    pets: false,
    privateBath: false,
    _420: false,
  });

  const [price, setPrice] = useState<Price>({
    minimum: 100,
    maximum: 1000,
  });
  return (
    <>
      {/* Header in the home page */}
      <Container>
        <Row style={{ marginBottom: '50px' }} className="main-filter">
          <Col md={4}>
            <Row className="h-100 justify-content-around">
              <filterIcons.hello />
              <filterIcons.arrow />
            </Row>
          </Col>
          <Col md={4}>
            <Button
              className="main-filter-button"
              onClick={() => setShow(true)}
            >
              Filter & Match
            </Button>
          </Col>
          <Col md={4}>
            <Row className="h-100 justify-content-around">
              <filterIcons.arrow />
              <filterIcons.loveHouse />
            </Row>
          </Col>
        </Row>
      </Container>

      {/* The filter itself */}
      <Modal show={show} onHide={() => setShow(false)} size="xl" centered>
        <Container>
          <Form>
            <Row className="justify-content-center my-4">
              <div className="title">Distance</div>
            </Row>
            <Row className="justify-content-center">
              <span className="word">Less than </span>
              <Form.Control
                className="form-input w-10rem mx-3"
                type="number"
                min={0}
                max={120}
                value={minute}
                onChange={(event) => setMinute(parseInt(event.target.value))}
                isValid={minute > 0 && minute <= 120}
                isInvalid={minute <= 0 || minute > 120}
                placeholder="minutes to school"
              />
              <span className="word">
                min public transportation to Price Center
              </span>
            </Row>

            <Separator />

            <Row className="justify-content-center">
              {/* Room Type */}
              <Col md={12} lg={6} className="justify-content-center">
                <Row className="justify-content-center">
                  <div className="title">Room Type</div>
                </Row>
                <Row className="justify-content-center">
                  {(Object.keys(roomType) as Array<keyof typeof roomType>).map(
                    (key) => {
                      const RoomTypeUnchosen = roomTypeIcons[key];
                      const RoomTypeChosen =
                        roomTypeIcons[
                          `${key}Chosen` as keyof typeof roomTypeIcons
                        ];
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
                      className="form-input"
                      type="number"
                      min={0}
                      value={price.minimum}
                      onChange={event => {
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
                      onChange={event => {
                        setPrice({
                          ...price,
                          maximum: parseInt(event.target.value),
                        });
                      }}
                      isValid={
                        price.maximum > 0 && price.maximum >= price.minimum
                      }
                      isInvalid={price.maximum <= 0}
                      placeholder="max price"
                    />
                  </Col>
                </Form.Row>
              </Col>
            </Row>

            <Separator />

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
                          onSelect={(event) =>
                            setEarlyInterval(StringWrap(event))
                          }
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

            <Separator className="my-4" />

            <Row className="justify-content-md-center">
              <span className="title">Others</span>
            </Row>

            {/* TODO */}
            <Row className="justify-content-center">
              <Button
                className="btn-filter"
                onClick={() => {
                  setPreferences({
                    ...preferences,
                    female: !preferences.female,
                  });
                }}
              >
                {preferences.female ? (
                  <preferencesIcons.femaleChosen className="d-block" />
                ) : (
                  <preferencesIcons.female className="d-block" />
                )}
              </Button>
              <Button
                className="btn-filter"
                onClick={() => {
                  setPreferences({ ...preferences, male: !preferences.male });
                }}
              >
                {preferences.male ? (
                  <preferencesIcons.maleChosen className="d-block" />
                ) : (
                  <preferencesIcons.male className="d-block" />
                )}
              </Button>
              <Button
                className="btn-filter"
                onClick={() => {
                  setPreferences({
                    ...preferences,
                    parking: !preferences.parking,
                  });
                }}
              >
                {preferences.parking ? (
                  <preferencesIcons.parkingChosen className="d-block" />
                ) : (
                  <preferencesIcons.parking className="d-block" />
                )}
              </Button>
              <Button
                className="btn-filter"
                onClick={() => {
                  setPreferences({ ...preferences, pets: !preferences.pets });
                }}
              >
                {preferences.pets ? (
                  <preferencesIcons.petsChosen className="d-block" />
                ) : (
                  <preferencesIcons.pets className="d-block" />
                )}
              </Button>
              <Button
                className="btn-filter"
                onClick={() => {
                  setPreferences({ ...preferences, lgbtq: !preferences.lgbtq });
                }}
              >
                {preferences.lgbtq ? (
                  <preferencesIcons.LGBTQChosen className="d-block" />
                ) : (
                  <preferencesIcons.LGBTQ className="d-block" />
                )}
              </Button>
              <Button
                className="btn-filter"
                onClick={() => {
                  setPreferences({
                    ...preferences,
                    privateBath: !preferences.privateBath,
                  });
                }}
              >
                {preferences.privateBath ? (
                  <preferencesIcons.privateBathChosen className="d-block" />
                ) : (
                  <preferencesIcons.privateBath className="d-block" />
                )}
              </Button>
              <Button
                className="btn-filter"
                onClick={() => {
                  setPreferences({
                    ...preferences,
                    _420: !preferences._420,
                  });
                }}
              >
                {preferences._420 ? (
                  <preferencesIcons._420Chosen className="d-block" />
                ) : (
                  <preferencesIcons._420 className="d-block" />
                )}
              </Button>
            </Row>
            <br />
          </Form>
          <Row />
        </Container>
      </Modal>
    </>
  );
};

export default Filter;
