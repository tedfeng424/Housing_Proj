import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import {
  roomTypeIcons,
  filterIcons,
  preferencesIcons,
} from '../assets/icons/all';
import { intervalOptions, yearMonths } from '../assets/constants';
import { moveInSelect } from '../assets/utils/index';
import {
  FilterModel,
  PreferenceLiteralType,
  Preferences,
  RoomLiteralType,
} from '../assets/models/FilterModel';
import { searchHousingPosts } from '../redux/slices/housing';

type RoomType = { [P in RoomLiteralType]: boolean };

interface Price {
  minimum: number;
  maximum: number;
}

const Separator: React.FC<React.HTMLAttributes<JSX.Element>> = () => (
  <div className="d-flex justify-content-center my-5">
    <div className="separator" />
  </div>
);

const formatRequest = (
  pref: Preferences,
  rt: RoomType,
  earlyInterval: string,
  earlyMonth: string,
  lateInterval: string,
  lateMonth: string,
  monthCount: number,
  minute: number,
  price: Price,
): FilterModel => {
  const roomSelections: RoomLiteralType[] = [
    'single',
    'double',
    'triple',
    'livingRoom',
    'suite',
    'studio',
  ];
  const otherPrefs: PreferenceLiteralType[] = [
    'female',
    'male',
    'lgbtq',
    'pets',
    '_420',
  ];
  const facilities: PreferenceLiteralType[] = ['parking', 'privateBath'];
  const roomResult: RoomLiteralType[] = [];
  const selectedRooms = roomSelections.reduce((result, roomSelection) => {
    if (rt[roomSelection]) {
      result.push(roomSelection);
    }
    return roomResult;
  }, roomResult);
  const selectedOther = otherPrefs.reduce<PreferenceLiteralType[]>(
    (otherResult, otherPref) => {
      if (pref[otherPref]) {
        otherResult.push(otherPref);
      }
      return otherResult;
    },
    [],
  );
  const selectedFac = facilities.reduce<PreferenceLiteralType[]>(
    (facResult, otherPref) => {
      if (pref[otherPref]) {
        facResult.push(otherPref);
      }
      return facResult;
    },
    [],
  );
  return {
    distance: `${minute} mins`,
    roomType: selectedRooms,
    earlyInterval,
    earlyMonth,
    lateInterval,
    lateMonth,
    stayPeriod: monthCount,
    priceMin: price.minimum,
    priceMax: price.maximum,
    other: selectedOther,
    facilities: selectedFac,
  };
};

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
  const dispatch = useDispatch();
  return (
    <>
      {/* Header in the home page */}
      <div className="filter-launch-pad">
        <filterIcons.hello className="disappear-on-sm" />
        <filterIcons.arrow className="disappear-on-sm" />
        <Button onClick={() => setShow(true)} className="filter-launch-button">
          Filter & Match
        </Button>
        <filterIcons.arrow className="disappear-on-sm" />
        <filterIcons.loveHouse className="disappear-on-sm" />
      </div>

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
                className="w-10rem mx-3 single-line-input"
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
                      isValid={
                        price.minimum > 0 && price.maximum >= price.minimum
                      }
                      isInvalid={
                        price.minimum <= 0 || price.maximum < price.minimum
                      }
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
                      isValid={
                        price.maximum > 0 && price.maximum >= price.minimum
                      }
                      isInvalid={
                        price.maximum <= 0 || price.maximum < price.minimum
                      }
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
                          onSelect={(event) => setEarlyInterval(event || '')}
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
                      isValid={moveInSelect(
                        earlyMonth,
                        earlyInterval,
                        lateMonth,
                        lateInterval,
                      )}
                      isInvalid={
                        !moveInSelect(
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
                            onSelect={(event) => setEarlyMonth(event || '')}
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
                          onSelect={(event) => setLateInterval(event || '')}
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
                            onSelect={(event) => setLateMonth(event || '')}
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
                          className="single-line-input"
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
          <Row className="justify-content-center">
            <Button
              onClick={() => {
                const formattedRequest = formatRequest(
                  preferences,
                  roomType,
                  earlyInterval,
                  earlyMonth,
                  lateInterval,
                  lateMonth,
                  monthCount,
                  minute,
                  price,
                );
                dispatch(searchHousingPosts(formattedRequest));
              }}
            >
              Find Best Fit Now!
            </Button>
          </Row>
        </Container>
      </Modal>
    </>
  );
};

export default Filter;
