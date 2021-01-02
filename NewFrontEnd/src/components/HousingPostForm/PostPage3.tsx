import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import * as z from 'zod';
import { Month, Interval } from '../../assets/constants';
import { moveInSelect } from '../../assets/utils/index';
import { WizardFormStep } from '../WizardForm';
import Input from '../basics/Input';
import Dropdown from '../basics/Dropdown';

export const page3Schema = z
  .object({
    stayPeriod: z.number().min(1, 'Minimum number of months is 1'),
    earlyInterval: z.nativeEnum(Interval),
    earlyMonth: z.nativeEnum(Month),
    lateInterval: z.nativeEnum(Interval),
    lateMonth: z.nativeEnum(Month),
    price: z
      .number()
      .positive('Make sure price is positive.')
      .max(5000, 'This is not feasible for a college student!'),
  })
  .refine(
    (data) =>
      moveInSelect(
        data.earlyInterval,
        data.earlyMonth,
        data.lateInterval,
        data.lateMonth,
      ),
    { message: 'Choose a valid date range', path: ['earlyInterval'] },
  );

export type Page3Store = z.infer<typeof page3Schema>;

export const page3InitialStore: Page3Store = {
  stayPeriod: 12,
  earlyInterval: Interval.Anytime,
  earlyMonth: Month.Anytime,
  lateInterval: Interval.Anytime,
  lateMonth: Month.Anytime,
  price: 0,
};

const Page3: React.FC<WizardFormStep<Page3Store>> = ({
  stayPeriod,
  earlyInterval,
  earlyMonth,
  lateInterval,
  lateMonth,
  price,
  validations,
  setStore,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="post-title">Rental Dates</div>
        </Col>
      </Row>

      <Form.Row className="m-2">
        <Col>
          <Form.Label className="post-word">Move-In Timeframe</Form.Label>
        </Col>
      </Form.Row>
      <Form.Row className="m-2">
        <Col md={2}>
          <Form.Label className="post-word my-2">From</Form.Label>
        </Col>
        <Col md={3}>
          <Dropdown
            options={Object.keys(Interval)}
            initialSelected={earlyInterval}
            placeholder="Date"
            // className="filterform-short-dropdown"
            isValid={validations?.earlyInterval?.success}
            error={validations?.earlyInterval?.error}
            onSelect={(s, e) =>
              setStore({
                earlyInterval:
                  s !== null ? Interval[s as keyof typeof Interval] : undefined,
              })
            }
          />
        </Col>
        <Col>
          <Dropdown
            options={Object.keys(Month)}
            initialSelected={earlyMonth}
            placeholder="Month"
            // className="filterform-short-dropdown"
            isValid={validations?.earlyMonth?.success}
            error={validations?.earlyMonth?.error}
            onSelect={(s, e) =>
              setStore({
                earlyMonth:
                  s !== null ? Month[s as keyof typeof Month] : undefined,
              })
            }
          />
        </Col>
      </Form.Row>
      <Form.Row className="m-2">
        <Col md={2}>
          <Form.Label className="post-word my-2">To</Form.Label>
        </Col>
        <Col md={3}>
          <Dropdown
            options={Object.keys(Interval)}
            initialSelected={lateInterval}
            placeholder="Date"
            // className="filterform-short-dropdown"
            isValid={validations?.lateInterval?.success}
            error={validations?.lateInterval?.error}
            onSelect={(s, e) =>
              setStore({
                lateInterval:
                  s !== null ? Interval[s as keyof typeof Interval] : undefined,
              })
            }
          />
        </Col>
        <Col>
          <Dropdown
            options={Object.keys(Month)}
            initialSelected={lateMonth}
            placeholder="Month"
            // className="filterform-short-dropdown"
            isValid={validations?.lateMonth?.success}
            error={validations?.lateMonth?.error}
            onSelect={(s, e) =>
              setStore({
                lateMonth:
                  s !== null ? Month[s as keyof typeof Month] : undefined,
              })
            }
          />
        </Col>
      </Form.Row>

      <Form.Row className="m-2">
        <Col md={12}>
          <Dropdown
            options={[
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12',
            ]}
            initialSelected={stayPeriod?.toString()}
            // className="filterform-short-dropdown"
            label="Stay Period"
            isValid={validations?.stayPeriod?.success}
            error={validations?.stayPeriod?.error}
            onSelect={(s, e) =>
              setStore({ stayPeriod: s !== null ? parseInt(s) : undefined })
            }
            inlinePostText="Months"
          />
        </Col>
      </Form.Row>

      <Row className="mt-5">
        <Col>
          <div className="post-title">Price</div>
        </Col>
      </Row>

      <Form.Row className="m-2">
        <Col md={12}>
          <Input
            value={price}
            type="number"
            onChange={(e) =>
              setStore({
                price: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
            className="mb-2"
            label="Rent"
            inlinePostText="USD/Month"
            isValid={validations?.price?.success}
            isInvalid={validations?.price && !validations?.price?.success}
            required
          />
        </Col>
      </Form.Row>

      {/* <Row className="justify-content-center"> */}
      {/* Move in time */}
      {/* <Col md={12} lg={6} className="justify-content-center"> */}
      {/* <Row className="justify-content-center"> */}
      {/* <div className="post-word">Move in time</div> */}
      {/* </Row> */}

      {/* <Row> */}
      {/* <span className="word notes">As early as</span> */}
      {/* </Row> */}
      {/* <Row> */}
      {/* <Dropdown> */}
      {/* <Dropdown.Toggle id="dropdown-basic"> */}
      {/* {earlyInterval} */}
      {/* </Dropdown.Toggle> */}
      {/* <Dropdown.Menu> */}
      {/* {Object.values(Interval).map((interval) => ( */}
      {/* // <Dropdown.Item */}
      {/* // eventKey={interval} */}
      {/* // onSelect={(s) => */}
      {/* // setStore({ earlyInterval: (s as Interval) || undefined }) */}
      {/* // } */}
      {/* // > */}
      {/* {interval} */}
      {/* </Dropdown.Item> */}
      {/* // ))} */}
      {/* </Dropdown.Menu> */}
      {/* </Dropdown> */}
      {/* <Form.Group> */}
      {/* <Form.Control */}
      {/* className="clear-border" */}
      {/* as={Dropdown} */}
      {/* isValid={validations?.earlyInterval?.success} */}
      {/* > */}
      {/* <Dropdown.Toggle */}
      {/* className="form-dropdown ml-0" */}
      {/* id="dropdown-basic" */}
      {/* > */}
      {/* {earlyMonth} */}
      {/* </Dropdown.Toggle> */}
      {/* <Dropdown.Menu className="menu"> */}
      {/* {Object.values(Month).map((month) => ( */}
      {/* <Dropdown.Item */}
      {/* eventKey={month} */}
      {/* onSelect={(s) => */}
      {/* setStore({ earlyMonth: (s as Month) || undefined }) */}
      {/* } */}
      {/* > */}
      {/* {month} */}
      {/* </Dropdown.Item> */}
      {/* ))} */}
      {/* </Dropdown.Menu> */}
      {/* </Form.Control> */}
      {/* <Form.Control.Feedback type="invalid"> */}
      {/* {!validations?.earlyInterval?.success && */}
      {/* validations?.earlyInterval?.error} */}
      {/* </Form.Control.Feedback> */}
      {/* </Form.Group> */}
      {/* </Row> */}

      {/* <Row> */}
      {/* <span className="word notes">As late as </span> */}
      {/* </Row> */}
      {/* <Row> */}
      {/* <Dropdown> */}
      {/* <Dropdown.Toggle id="dropdown-basic"> */}
      {/* {lateInterval} */}
      {/* </Dropdown.Toggle> */}
      {/* <Dropdown.Menu> */}
      {/* {Object.values(Interval).map((interval) => ( */}
      {/* <Dropdown.Item */}
      {/* eventKey={interval} */}
      {/* onSelect={(s) => */}
      {/* setStore({ lateInterval: (s as Interval) || undefined }) */}
      {/* } */}
      {/* > */}
      {/* {interval} */}
      {/* </Dropdown.Item> */}
      {/* ))} */}
      {/* </Dropdown.Menu> */}
      {/* </Dropdown> */}
      {/* <Form.Group> */}
      {/* <Form.Control className="clear-border" as={Dropdown}> */}
      {/* <Dropdown.Toggle */}
      {/* className="form-dropdown ml-0" */}
      {/* id="dropdown-basic" */}
      {/* > */}
      {/* {lateMonth} */}
      {/* </Dropdown.Toggle> */}
      {/* <Dropdown.Menu className="menu"> */}
      {/* {Object.values(Month).map((month) => ( */}
      {/* <Dropdown.Item */}
      {/* eventKey={month} */}
      {/* onSelect={(s) => */}
      {/* setStore({ lateMonth: (s as Month) || undefined }) */}
      {/* } */}
      {/* > */}
      {/* {month} */}
      {/* </Dropdown.Item> */}
      {/* ))}</Col> */}
      {/* </Dropdown.Menu> */}
      {/* </Form.Control> */}
      {/* <div className="wizard-form-invalid-feedback"> */}
      {/* {!validations?.earlyInterval?.success && */}
      {/* validations?.earlyInterval?.error} */}
      {/* </div> */}
      {/* </Form.Group> */}
      {/* </Row> */}
      {/* </Col> */}

      {/* <Col */}
      {/* md={12} */}
      {/* lg={{ span: 5, offset: 1 }} */}
      {/* className="justify-content-center" */}
      {/* > */}
      {/* <Row className="justify-content-center"> */}
      {/* <div className="post-word">Stay period</div> */}
      {/* </Row> */}
      {/* <Row className="justify-content-center"> */}
      {/* <Col> */}
      {/* <Form.Group as={Row} controlId="formNumberOfMonths"> */}
      {/* <Col sm={8} md={8}> */}
      {/* <Form.Control */}
      {/* className="single-line-input" */}
      {/* value={stayPeriod} */}
      {/* onChange={(e) => { */}
      {/* setStore({ */}
      {/* stayPeriod: e.target.value */}
      {/* ? parseInt(e.target.value) */}
      {/* : undefined, */}
      {/* }); */}
      {/* }} */}
      {/* type="number" */}
      {/* placeholder="# of Months" */}
      {/* isValid={stayPeriod > 0 && stayPeriod <= 12} // TODO what if someone wants to stay for 2 years? */}
      {/* isInvalid={ */}
      {/* !stayPeriod || stayPeriod <= 0 || stayPeriod > 12 */}
      {/* } */}
      {/* /> */}
      {/* </Col> */}
      {/* <span className="word">Month(s)</span> */}
      {/* </Form.Group> */}
      {/* </Col> */}
      {/* </Row> */}
      {/* </Col> */}
      {/* </Row> */}
    </Container>
  );
};

export default Page3 as React.FC;
