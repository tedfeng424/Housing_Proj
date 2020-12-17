import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as z from 'zod';
import { Form } from 'react-bootstrap';
import { WizardFormStep } from '../WizardForm';
import { SchoolYear, NON_EMPTY_ERR_MSG } from '../../assets/constants';

const nonSelectStyle = 'post-word-sub';
const selectStyle = 'post-word-sub post-word-sub-selected';
const nonSelectBg = 'post-word-sub-bg';
const SelectBg = 'post-word-sub-bg post-word-sub-bg-selected';

// TODO put in constants
const phoneRegex = /([ ]*\+?[ ]*[0-9]{0,4}[ ]*(-|\()?[0-9]{3}[ ]*(-|\))?[ ]*[0-9]{3}[ ]*-?[ ]*[0-9]{4}[ ]*)/;

const page1StoreSchema = z.object({
  leaserPhone: z
    .string()
    .nonempty(NON_EMPTY_ERR_MSG)
    .regex(phoneRegex, 'Phone number is not a valid format.'),
  schoolYear: z.nativeEnum(SchoolYear),
  major: z.string().nonempty(NON_EMPTY_ERR_MSG).min(1, 'Not long enough.'),
});

export type PostPage1Store = z.infer<typeof page1StoreSchema>;

const page1InitialStore: PostPage1Store = {
  leaserPhone: '',
  schoolYear: SchoolYear.First,
  major: '',
};

const PostPage1: React.FC<WizardFormStep<PostPage1Store>> = ({
  useWizardFormStorage,
}) => {
  const [
    { leaserPhone, schoolYear, major },
    errors,
    setStore,
  ] = useWizardFormStorage<PostPage1Store>(page1InitialStore, page1StoreSchema);

  return (
    <Container>
      <Form.Row className="justify-content-center m-2">
        <Form.Label className="post-word">Phone</Form.Label>
        <Form.Control
          className="single-line-input"
          type="text"
          value={leaserPhone}
          onChange={(e) => setStore({ leaserPhone: e.target.value })}
          isValid={leaserPhone?.length > 0}
          isInvalid={leaserPhone?.length === 0}
          placeholder="Phone number"
        />
      </Form.Row>
      <br />
      <Row>
        <Col>
          <Row className="post-word">School year</Row>
          <br />
          <Row>
            <div
              className={
                schoolYear === SchoolYear.First ? SelectBg : nonSelectBg
              }
            >
              <span
                className={
                  schoolYear === SchoolYear.First ? selectStyle : nonSelectStyle
                }
                onClick={() => setStore({ schoolYear: SchoolYear.First })}
              >
                First
              </span>
            </div>
            <div
              className={
                schoolYear === SchoolYear.Second ? SelectBg : nonSelectBg
              }
            >
              <span
                className={
                  schoolYear === SchoolYear.Second
                    ? selectStyle
                    : nonSelectStyle
                }
                onClick={() => setStore({ schoolYear: SchoolYear.Second })}
              >
                Sophomore
              </span>
            </div>
            <div
              className={
                schoolYear === SchoolYear.Third ? SelectBg : nonSelectBg
              }
            >
              <span
                className={
                  schoolYear === SchoolYear.Third ? selectStyle : nonSelectStyle
                }
                onClick={() => setStore({ schoolYear: SchoolYear.Third })}
              >
                Junior
              </span>
            </div>
            <div
              className={
                schoolYear === SchoolYear.Fourth ? SelectBg : nonSelectBg
              }
            >
              <span
                className={
                  schoolYear === SchoolYear.Fourth
                    ? selectStyle
                    : nonSelectStyle
                }
                onClick={() => setStore({ schoolYear: SchoolYear.Fourth })}
              >
                Senior
              </span>
            </div>
            <div
              className={
                schoolYear === SchoolYear.Fifth ? SelectBg : nonSelectBg
              }
            >
              <span
                className={
                  schoolYear === SchoolYear.Fifth ? selectStyle : nonSelectStyle
                }
                onClick={() => setStore({ schoolYear: SchoolYear.Fifth })}
              >
                Fifth
              </span>
            </div>
            <div
              className={
                schoolYear === SchoolYear.Grad ? SelectBg : nonSelectBg
              }
            >
              <span
                className={
                  schoolYear === SchoolYear.Grad ? selectStyle : nonSelectStyle
                }
                onClick={() => setStore({ schoolYear: SchoolYear.Grad })}
              >
                Grad
              </span>
            </div>
          </Row>
        </Col>
      </Row>
      <br />
      <Form.Row className="justify-content-center m-2">
        <Form.Label className="post-word">Major</Form.Label>
        <Form.Control
          className="single-line-input"
          type="text"
          value={major}
          onChange={(e) => setStore({ major: e.target.value })}
          isValid={major?.length > 0}
          isInvalid={major?.length === 0}
          placeholder="Major"
        />
      </Form.Row>
    </Container>
  );
};

// NOTE: need the "as React.FC" since typescript doesn't know that WizardForm parent component will
// provide the WizardFormStep props
export default PostPage1 as React.FC;
