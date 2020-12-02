import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import { WizardFormStep } from '../WizardForm';
import { SchoolYear } from '../../assets/constants';

const nonSelectStyle = 'post-word-sub';
const selectStyle = 'post-word-sub post-word-sub-selected';
const nonSelectBg = 'post-word-sub-bg';
const SelectBg = 'post-word-sub-bg post-word-sub-bg-selected';

export interface PostPage1Store {
  leaserPhone: string;
  schoolYear: SchoolYear;
  major: string;
}

export const PostPage1InitialStore: PostPage1Store = {
  leaserPhone: '',
  schoolYear: SchoolYear.First,
  major: '',
};

type PathProps = {};

const PostPage1: React.FC<PathProps & WizardFormStep<PostPage1Store>> = ({
  useWizardFormStorage,
  setIsValidated,
}) => {
  const [{ leaserPhone, schoolYear, major }, setStore] = useWizardFormStorage<
    PostPage1Store
  >();

  // useEffect(() => {
  //   setIsValidated();
  // }, [leaserPhone, schoolYear, major])

  return (
    <Container>
      {/* TODO this is what the inputs should look like */}
      {/* <Form.Row className="justify-content-center m-2">
        <Form.Label className="post-word">Your name</Form.Label>
        <Form.Control
          className="single-line-input"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          isValid={firstName.length > 0}
          isInvalid={firstName.length === 0}
          placeholder="Name"
        />
      </Form.Row> */}

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
      {/* <Row>
        <Col md={{ span: 4, offset: 2 }}>
          <Row className="post-word"> Phone </Row>
          <Row>
            <input
              className="w-75 single-line-input"
              onChange={(event) =>
                setStore({ leaserPhone: event.target.value })
              }
            />
          </Row>
        </Col>
      </Row> */}
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

// NOTE: need the "as" since typescript doesn't know that WizardForm parent component will
// provide the WizardFormStep props
export default PostPage1 as React.FC<PathProps>;
