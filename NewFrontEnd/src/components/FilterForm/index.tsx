import React from 'react';
import Page1, {
  Page1Store,
  page1InitialStore,
  page1Schema,
} from './FilterPage1';
import Page2, {
  Page2Store,
  page2InitialStore,
  page2Schema,
} from './FilterPage2';
import Page3, {
  Page3Store,
  page3InitialStore,
  page3Schema,
} from './FilterPage3';
import Page4, {
  Page4Store,
  page4InitialStore,
  page4Schema,
} from './FilterPage4';
// import Page5, {
//   Page5Store,
//   page5InitialStore,
//   page5Schema,
// } from './FilterPage5';
// import Page6, {
//   Page6Store,
//   page6InitialStore,
//   page6Schema,
// } from './FilterPage6';
import WizardForm from '../WizardForm';

type Store = Page1Store & Page2Store & Page3Store & Page4Store;
// Page5Store &
// Page6Store;

const initialStore = [
  page1InitialStore,
  page2InitialStore,
  page3InitialStore,
  page4InitialStore,
  // page5InitialStore,
  // page6InitialStore,
];

const schemas = [
  page1Schema,
  page2Schema,
  page3Schema,
  page4Schema,
  // page5Schema,
  // page6Schema,
];

interface FilterFormProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ show, setShow }) => (
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
    title="Filter & Match"
    initialStore={initialStore}
    schemas={schemas}
  >
    <Page1 />
    <Page2 />
    <Page3 />
    <Page4 />
    {/*
    <Page5 />
    <Page6 /> */}
  </WizardForm>
);

export default FilterForm;
