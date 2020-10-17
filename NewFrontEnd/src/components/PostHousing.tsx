import React, { useState } from 'react';
import { Row, Container, Button } from 'react-bootstrap';
import PostPage1 from './pages/PostPage1';
import PostPage2 from './pages/PostPage2';
import PostPage3 from './pages/PostPage3';
import PostPage4 from './pages/PostPage4';
import PostPage5 from './pages/PostPage5';
import WizardForm from './WizardForm';

const PostHousing: React.FC<{}> = () => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <Container>
        <Row>
          <Button onClick={() => setShow(true)}>Post A House</Button>
        </Row>
      </Container>
      <WizardForm show={show} setShow={setShow}>
        <PostPage1 />
        <PostPage2 />
        <PostPage3 />
        <PostPage4 />
        <PostPage5 />
      </WizardForm>
    </>
  );
};

export default PostHousing;
