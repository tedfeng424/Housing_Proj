import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import { setPost, selectPost } from '../../redux/slices/posting';

const nonSelectStyle = 'post-word-sub';
const selectStyle = 'post-word-sub post-word-sub-selected';
const nonSelectBg = 'post-word-sub-bg';
const SelectBg = 'post-word-sub-bg post-word-sub-bg-selected';

const PostPage1: React.FC = () => {
  const selected = useSelector(selectPost).leaserSchoolYear;
  const dispatch = useDispatch();
  return (
    <Container>
      <Row>
        <Col>
          <span className="post-title">
            ~Something personal will make your post more trustworthy~
          </span>
        </Col>
      </Row>

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

      <Row>
        <Col md={{ span: 7, offset: 2 }}>
          <Row className="post-word"> Your name </Row>
          <Row>
            <input
              className="w-100 single-line-input"
              onChange={(event) =>
                dispatch(setPost(['name', event.target.value]))
              }
            />
          </Row>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={{ span: 4, offset: 2 }}>
          <Row className="post-word"> Phone </Row>
          <Row>
            <input
              className="w-75 single-line-input"
              onChange={(event) =>
                dispatch(setPost(['leaserPhone', event.target.value]))
              }
            />
          </Row>
        </Col>
        <Col md={4}>
          <Row className="post-word"> School email </Row>
          <Row>
            <input
              className="w-75 single-line-input"
              onChange={(event) =>
                dispatch(setPost(['leaserEmail', event.target.value]))
              }
            />
          </Row>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={{ offset: 2 }}>
          <Row className="post-word"> School year </Row>
          <br />
          <Row>
            <div className={selected === 'First' ? SelectBg : nonSelectBg}>
              <span
                className={selected == 'First' ? selectStyle : nonSelectStyle}
                onClick={() => dispatch(setPost(['leaserSchoolYear', 'First']))}
              >
                First
              </span>
            </div>
            <div className={selected === 'Sophomore' ? SelectBg : nonSelectBg}>
              <span
                className={
                  selected == 'Sophomore' ? selectStyle : nonSelectStyle
                }
                onClick={() =>
                  dispatch(setPost(['leaserSchoolYear', 'Sophomore']))
                }
              >
                Sophomore
              </span>
            </div>
            <div className={selected === 'Junior' ? SelectBg : nonSelectBg}>
              <span
                className={selected == 'Junior' ? selectStyle : nonSelectStyle}
                onClick={() =>
                  dispatch(setPost(['leaserSchoolYear', 'Junior']))
                }
              >
                Junior
              </span>
            </div>
            <div className={selected === 'Senior' ? SelectBg : nonSelectBg}>
              <span
                className={selected == 'Senior' ? selectStyle : nonSelectStyle}
                onClick={() =>
                  dispatch(setPost(['leaserSchoolYear', 'Senior']))
                }
              >
                Senior
              </span>
            </div>
            <div className={selected === 'Fifth' ? SelectBg : nonSelectBg}>
              <span
                className={selected == 'Fifth' ? selectStyle : nonSelectStyle}
                onClick={() => dispatch(setPost(['leaserSchoolYear', 'Fifth']))}
              >
                Fifth
              </span>
            </div>
            <div className={selected === 'Grad' ? SelectBg : nonSelectBg}>
              <span
                className={selected == 'Grad' ? selectStyle : nonSelectStyle}
                onClick={() => dispatch(setPost(['leaserSchoolYear', 'Grad']))}
              >
                Grad
              </span>
            </div>
          </Row>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={{ span: 4, offset: 2 }}>
          <Row className="post-word"> Major </Row>
          <Row>
            <input
              className="w-75 single-line-input"
              onChange={(event) =>
                dispatch(setPost(['leaserMajor', event.target.value]))
              }
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PostPage1;
