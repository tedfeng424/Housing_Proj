import React from 'react';
import PostPage1, { PostPage1Store } from './PostPage1';
import PostPage2 from './PostPage2';
import PostPage3 from './PostPage3';
import PostPage4 from './PostPage4';
import PostPage5 from './PostPage5';
import PostPage6 from './PostPage6';
import WizardForm from '../WizardForm';

type WizardFormStorage = PostPage1Store;

interface PathProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

// TODO only show PostPage1 for first time user
const HousingPost: React.FC<PathProps> = ({ show, setShow }) => (
  <WizardForm<WizardFormStorage>
    show={show}
    setShow={setShow}
    onSubmit={(n) => {
      console.log(n);
      return true;
    }}
  >
    <PostPage1 />
    <PostPage2 />
    <PostPage3 />
    <PostPage4 />
    <PostPage5 />
    <PostPage6 setShow={setShow} />
  </WizardForm>
);

export default HousingPost;
