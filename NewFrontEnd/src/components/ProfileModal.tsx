import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormCheck,
  Modal,
  Row,
} from 'react-bootstrap';
import { miscIcons, profileIcons } from '../assets/icons/all';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../redux/slices/auth';
import { logout } from '../redux/slices/auth';
import Image from 'react-bootstrap/Image';

const nonSelectStyle = 'profile-word-sub';
const selectStyle = 'profile-word-sub profile-word-sub-selected';
const nonSelectBg = 'profile-word-sub-bg';
const SelectBg = 'profile-word-sub-bg profile-word-sub-bg-selected';

interface PathProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const phoneFormat = (phone: string, previousPhone: string) => {
  const phoneRegex = /\d+/;
  const charArray = [];
  const limit = 14;
  var i;
  for (i = 0; i < Math.min(phone.length, limit); i++) {
    if (phone[i].match(phoneRegex)) {
      charArray.push(phone[i]);
    }
  }
  if (
    previousPhone.length > phone.length && // if it is a delete operation
    phone.length > 0 && // if it is non empty
    !previousPhone[previousPhone.length - 1].match(phoneRegex)
  ) {
    charArray.pop();
  }
  const bracket = charArray.length >= 3;
  const space = charArray.length > 3;
  const horizontal = charArray.length > 6;
  if (horizontal) {
    charArray.splice(6, 0, '-');
  }
  if (space) {
    charArray.splice(3, 0, ' ');
  }
  if (bracket) {
    charArray.splice(0, 0, '(');
    charArray.splice(4, 0, ')');
  }
  return charArray.join('');
};

const dummyUser = {
  name: '',
  email: '',
  token: '',
  description: '',
  major: '',
  schoolYear: '',
  phone: '',
};

// use this before implementing pulling user-created posts from BE
const dummyPosts = [
  {
    name: 'Const Verde Village',
    roomType: 'Single',
    price: '$800',
  },
];

const ProfileModal: React.FC<PathProps> = ({ show, setShow }) => {
  const userSelected = useSelector(selectUser) || dummyUser;
  console.log(userSelected);
  const dispatch = useDispatch();

  const [editPosts, setEditPosts] = useState(false);
  return (
    <Modal
      dialogClassName="profile-form-modal-dialog"
      show={show}
      onHide={() => setShow(false)}
      centered
    >
      <div className="h-100 w-100">
        {/* TODO add border-radius to top and bottom rows */}
        <div className="profile-form-top-bar">
          <Button
            variant="no-show"
            className="mr-auto"
            onClick={() => setShow(false)}
          >
            <miscIcons.orangeX />
          </Button>
          <div className="mx-auto justify-content-center">
            <span className="title" onClick={() => setEditPosts(false)}>
              Edit Profile
            </span>
            <span className="title mx-5">|</span>
            <span className="title" onClick={() => setEditPosts(true)}>
              Manage My Posts
            </span>
          </div>
        </div>

        {/* TODO <div className="d-flex align-items-center justify-content-around h-100"> */}
        <div className="profile-form-middle">
          <Container>
            <Row>
              <Col md={4} className="profile-info align-self-center">
                <div className="profile-wrap mb-2">
                  <Image
                    src={
                      'https://houseit.s3.us-east-2.amazonaws.com/ambar%40ucsd.edu/profile/Mask+Group-1.jpg'
                    }
                    roundedCircle
                    className="profile-icon"
                  />
                </div>
                <div className="profile-name">Jacob Jones</div>
                <div className="profile-verified">
                  <profileIcons.tickMark />
                  UCSD Email Verified
                </div>
                <div className="profile-wrap">
                  <Button
                    className="profile-sign-out"
                    variant="no-show"
                    onClick={() => {
                      dispatch(logout());
                      setShow(false);
                    }}
                  >
                    Log Out
                  </Button>
                </div>
              </Col>
              {!editPosts ? (
                <Col md={8} className="h-100">
                  <Form.Row className="justify-content-center m-2 mt-4">
                    <Form.Group as={Col} controlId="profileEmail">
                      <Form.Label className="profile-form-label">
                        School Email
                      </Form.Label>
                      <Form.Control
                        className="single-line-input"
                        type="email"
                        disabled
                        value={userSelected.email}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="profilePhone">
                      <Form.Label className="profile-form-label">
                        Phone
                      </Form.Label>
                      <Form.Control
                        className="single-line-input"
                        type="text"
                        value={userSelected.phone}
                        onChange={(event) => {
                          const previousPhone = userSelected.phone;
                          dispatch(
                            setUser({
                              ...userSelected,
                              phone: phoneFormat(
                                event.target.value,
                                previousPhone,
                              ),
                            }),
                          );
                        }}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row className="m-2 px-0">
                    <Form.Group as={Col} controlId="profileSchoolYear">
                      <Form.Label className="profile-form-label">
                        School year
                      </Form.Label>
                      <Form.Row className="profile-year-row pl-1">
                        {[
                          'First',
                          'Sophomore',
                          'Junior',
                          'Senior',
                          'Fifth',
                          'Grad',
                        ].map((year) => (
                          <Form.Group
                            controlId={`profileSchoolYear${year}`}
                            className={
                              userSelected.schoolYear === year
                                ? SelectBg
                                : nonSelectBg
                            }
                          >
                            <Form.Label
                              className={
                                userSelected.schoolYear === year
                                  ? selectStyle
                                  : nonSelectStyle
                              }
                              onClick={() => {
                                dispatch(
                                  setUser({
                                    ...userSelected,
                                    schoolYear: year,
                                  }),
                                );
                              }}
                            >
                              {year}
                            </Form.Label>
                          </Form.Group>
                        ))}
                      </Form.Row>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row className="m-2">
                    <Form.Group as={Col} controlId="profileMajor">
                      <Form.Label className="profile-form-label">
                        Major
                      </Form.Label>
                      <Form.Control
                        className="single-line-input"
                        type="text"
                        value={userSelected.major}
                        onChange={(event) =>
                          dispatch(
                            setUser({
                              ...userSelected,
                              major: event.target.value,
                            }),
                          )
                        }
                      ></Form.Control>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row className="m-2">
                    <Form.Group as={Col} controlId="profileBio">
                      <Form.Label className="profile-form-bio">
                        Tell us about yourself in a short bio
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        className="single-line-input profile-bio-text"
                        type="text"
                        maxLength={600}
                        onChange={(event) =>
                          dispatch(
                            setUser({
                              ...userSelected,
                              description: event.target.value,
                            }),
                          )
                        }
                      ></Form.Control>
                      <span className="profile-char-check">
                        {userSelected.description.length}/600
                      </span>
                    </Form.Group>
                  </Form.Row>
                </Col>
              ) : (
                <Col md={8} className="profile-posts-list">
                  {dummyPosts.length == 0 ? (
                    <div className="profile-no-posts-text">
                      You don't have any housing posts yet.
                      <br />
                      Are you looking for your Bookmarks instead?
                    </div>
                  ) : (
                    dummyPosts.map((post) => (
                      <div className="m-2 profile-mypost">
                        <Image
                          src={
                            'https://houseit.s3.us-east-2.amazonaws.com/test0.png'
                          }
                          className="profile-mypost-picture"
                        />

                        <div className="profile-mypost-info">
                          <div className="profile-mypost-title">
                            {post.name}
                          </div>
                          <div className="profile-mypost-details mt-1">
                            {post.roomType} | {post.price}
                          </div>

                          <div className="mt-auto profile-mypost-actions">
                            <Button variant="secondary">
                              Mark as occupied
                            </Button>
                            <div className="ml-auto profile-mypost-edit">
                              Edit this post
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </Col>
              )}
            </Row>
          </Container>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
