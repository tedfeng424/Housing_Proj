import React from 'react';
import Page1, { Page1Store, page1InitialStore, page1Schema } from './Page1';
import Page2, { Page2Store, page2InitialStore, page2Schema } from './Page2';
import WizardForm from '../WizardForm';

type Store = Page1Store & Page2Store;

const initialStore = [page1InitialStore, page2InitialStore];

const schemas = [page1Schema, page2Schema];

interface NewUserSetupProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

// TODO only show PostPage1 for first time user
const NewUserSetup: React.FC<NewUserSetupProps> = ({ show, setShow }) => (
  <WizardForm<Store>
    show={show}
    setShow={setShow}
    onSubmit={(n) => {
      console.log('clicked');
      console.log(n);

      // TODO query the create_user endpoint

      return true;
    }}
    title="Set up your account"
    initialStore={initialStore}
    schemas={schemas}
  >
    <Page1 />
    <Page2 />
  </WizardForm>
);

export default NewUserSetup;
