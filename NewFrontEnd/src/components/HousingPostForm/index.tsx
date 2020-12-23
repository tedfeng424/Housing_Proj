import React from 'react';
import Page1, { Page1Store, page1InitialStore, page1Schema } from './PostPage1';
import Page2, { Page2Store, page2InitialStore, page2Schema } from './PostPage2';
import Page3, { Page3Store, page3InitialStore, page3Schema } from './PostPage3';
import Page4, { PostPage4Store } from './PostPage4';
import Page5, { PostPage5Store } from './PostPage5';
import Page6, { PostPage6Store } from './PostPage6';
import WizardForm from '../WizardForm';

type Store = Page1Store &
  Page2Store &
  Page3Store &
  Page4Store &
  Page5Store &
  Page6Store;

const initialStore = [
  page1InitialStore,
  page2InitialStore,
  page3InitialStore,
  page4InitialStore,
  page5InitialStore,
  page6InitialStore,
];

const schemas = [
  page1Schema,
  page2Schema,
  page3Schema,
  page4Schema,
  page5Schema,
  page6Schema,
];

interface HousingPostProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

// TODO only show PostPage1 for first time user
const HousingPost: React.FC<HousingPostProps> = ({ show, setShow }) => (
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
    initialStore={[{}]}
    schemas={[]}
  >
    <Page1 />
    <Page2 />
    <Page3 />
    <Page4 />
    <Page5 />
    <Page6 />
  </WizardForm>
);

export default HousingPost;
