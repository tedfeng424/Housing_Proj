import React from 'react';
import PostPage1, { PostPage1Store } from './PostPage1';
import PostPage2, { PostPage2Store } from './PostPage2';
import PostPage3, { PostPage3Store } from './PostPage3';
import PostPage4, { PostPage4Store } from './PostPage4';
import PostPage5, { PostPage5Store } from './PostPage5';
import PostPage6, { PostPage6Store } from './PostPage6';
import WizardForm from '../WizardForm';

type Store = PostPage1Store &
  PostPage2Store &
  PostPage3Store &
  PostPage4Store &
  PostPage5Store &
  PostPage6Store;

interface PathProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

// TODO only show PostPage1 for first time user
const HousingPost: React.FC<PathProps> = ({ show, setShow }) => (
  <WizardForm<Store>
    show={show}
    setShow={setShow}
    onSubmit={(n) => {
      console.log('clicked');
      console.log(n);
      // dispatch(
      //   userPost(() => postHousing(FormMation(pictures, posts))),
      // ); // TODO
      return true;
    }}
    validateOnlyAtSubmit // TODO temporary
  >
    <PostPage1 />
    <PostPage2 />
    <PostPage3 />
    <PostPage4 />
    <PostPage5 />
    <PostPage6 />
  </WizardForm>
);

export default HousingPost;
