import React from 'react';
import { Container, Row, Col, Dropdown, Form } from 'react-bootstrap';
import * as z from 'zod';
import { Month, Interval } from '../../assets/constants';
import { moveInSelect } from '../../assets/utils/index';
import { WizardFormStep } from '../WizardForm';

export const page3Schema = z
  .object({
    stayPeriod: z.number().min(1, 'Minimum number of months is 1'),
    earlyInterval: z.nativeEnum(Interval),
    earlyMonth: z.nativeEnum(Month),
    lateInterval: z.nativeEnum(Interval),
    lateMonth: z.nativeEnum(Month),
  })
  .refine(
    (data) =>
      moveInSelect(
        data.earlyInterval,
        data.earlyMonth,
        data.lateInterval,
        data.lateMonth,
      ),
    'Choose a valid date range',
  );

export type Page3Store = z.infer<typeof page3Schema>;

export const page3InitialStore: Page3Store = {
  stayPeriod: 12,
  earlyInterval: Interval.Anytime,
  earlyMonth: Month.Anytime,
  lateInterval: Interval.Anytime,
  lateMonth: Month.Anytime,
};

const Page3: React.FC<WizardFormStep<Page3Store>> = ({
  stayPeriod,
  earlyInterval,
  earlyMonth,
  lateInterval,
  lateMonth,
  validations,
  setStore,
}) => {
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
                {Object.values(Interval).map((interval) => (
                  <Dropdown.Item
                    eventKey={interval}
                    onSelect={(s) =>
                      setStore({ earlyInterval: (s as Interval) || undefined })
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
                isValid={validations?.earlyInterval?.success}
              >
                <Dropdown.Toggle
                  className="form-dropdown ml-0"
                  id="dropdown-basic"
                >
                  {earlyMonth}
                </Dropdown.Toggle>
                <Dropdown.Menu className="menu">
                  {Object.values(Month).map((month) => (
                    <Dropdown.Item
                      eventKey={month}
                      onSelect={(s) =>
                        setStore({ earlyMonth: (s as Month) || undefined })
                      }
                    >
                      {month}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {!validations?.earlyInterval?.success &&
                  validations?.earlyInterval?.error}
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
                {Object.values(Interval).map((interval) => (
                  <Dropdown.Item
                    eventKey={interval}
                    onSelect={(s) =>
                      setStore({ lateInterval: (s as Interval) || undefined })
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
                  {Object.values(Month).map((month) => (
                    <Dropdown.Item
                      eventKey={month}
                      onSelect={(s) =>
                        setStore({ lateMonth: (s as Month) || undefined })
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

export default Page3 as React.FC;
