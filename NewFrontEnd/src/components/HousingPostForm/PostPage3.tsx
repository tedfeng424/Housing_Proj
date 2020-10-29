import React, { useState } from 'react';
import { Container, Row, Col, Dropdown, Form } from 'react-bootstrap';
import { intervalOptions, yearMonths } from '../../assets/constants';
import { moveInSelect } from '../../assets/utils/index';

const PostPage3: React.FC<{}> = () => {
  const [monthCount, setMonthCount] = useState<number>(1);
  const [earlyInterval, setEarlyInterval] = useState<string>('Anytime');
  const [earlyMonth, setEarlyMonth] = useState<string>('Anytime');
  const [lateInterval, setLateInterval] = useState<string>('Anytime');
  const [lateMonth, setLateMonth] = useState<string>('Anytime');
  return (
    <Container>
      <Row className="justify-content-center">
        {/* Move in time */}
        <Col md={12} lg={6} className="justify-content-center">
          <Row className="justify-content-center">
            <div className="title">Move in time</div>
          </Row>

          <Row>
            <span className="word notes">As early as</span>
          </Row>
          <Row>
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
                      onSelect={(eventKey) => setEarlyMonth(eventKey || '')}
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

          <Row>
            <span className="word notes">As late as </span>
          </Row>
          <Row>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                {lateInterval}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {intervalOptions.map((interval) => (
                  <Dropdown.Item
                    eventKey={interval}
                    onSelect={(eventKey) => setLateInterval(eventKey || '')}
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
                      onSelect={(eventKey) => setLateMonth(eventKey || '')}
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
    </Container>
  );
};

export default PostPage3;
