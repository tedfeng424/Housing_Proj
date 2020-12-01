import React from 'react';
import { Container, Row, Col, Dropdown, Form } from 'react-bootstrap';
import {
  intervalOptions,
  months,
  yearMonths,
  Interval,
} from '../../assets/constants';
import { moveInSelect } from '../../assets/utils/index';
import { WizardFormStep } from '../WizardForm';

export interface PostPage3Store {
  stayPeriod: number;
  earlyInterval: string;
  earlyMonth: string;
  lateInterval: string;
  lateMonth: string;
}

const PostPage3: React.FC<WizardFormStep<PostPage3Store>> = ({
  useWizardFormStorage,
}) => {
  const [
    { stayPeriod, earlyInterval, earlyMonth, lateInterval, lateMonth },
    setStore,
  ] = useWizardFormStorage<PostPage3Store>({
    stayPeriod: 12,
    earlyInterval: Interval.Anytime,
    earlyMonth: months.Anytime,
    lateInterval: Interval.Anytime,
    lateMonth: months.Anytime,
  });

  return (
    <Container>
      <Row className="justify-content-center">
        {/* Move in time */}
        <Col md={12} lg={6} className="justify-content-center">
          <Row className="justify-content-center">
            <div className="post-word">Move in time</div>
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
                    onSelect={(s) =>
                      setStore({ earlyInterval: s || undefined })
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
                      onSelect={(s) => setStore({ earlyMonth: s || undefined })}
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
                    onSelect={(s) => setStore({ lateInterval: s || undefined })}
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
                      onSelect={(s) => setStore({ lateMonth: s || undefined })}
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
            <div className="post-word">Stay period</div>
          </Row>
          <Row className="justify-content-center">
            <Col>
              <Form.Group as={Row} controlId="formNumberOfMonths">
                <Col sm={8} md={8}>
                  <Form.Control
                    className="single-line-input"
                    value={stayPeriod}
                    onChange={(e) => {
                      if (e.target.value) {
                        setStore({ stayPeriod: parseInt(e.target.value) });
                      } else {
                        setStore({ stayPeriod: undefined }); // force it to be invalid
                      }
                    }}
                    type="number"
                    placeholder="# of Months"
                    isValid={stayPeriod > 0 && stayPeriod <= 12} // TODO what if someone wants to stay for 2 years?
                    isInvalid={
                      !stayPeriod || stayPeriod <= 0 || stayPeriod > 12
                    }
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

export default PostPage3 as React.FC;
