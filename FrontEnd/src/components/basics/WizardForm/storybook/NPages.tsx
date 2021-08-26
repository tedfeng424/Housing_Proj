import React, { FunctionComponent } from 'react';
import * as z from 'zod';
import { Container, Row, Col } from 'react-bootstrap';
import { Input, WizardForm } from '@basics';
import { runNTimes } from '@utils';

interface PageProps {
  numInputs: number;
}

const Page: FunctionComponent<PageProps> = ({ numInputs }) => (
  <Container>
    <Row className="justify-content-center m-2">
      {runNTimes(numInputs, () => (
        <Col md={12}>
          <Input label="Label" type="text" required placeholder="Field..." />
        </Col>
      ))}
    </Row>
  </Container>
);

const newPageSchema = () => z.object({ field1: z.string() });

type Store = z.infer<ReturnType<typeof newPageSchema>>;

interface NPagesProps {
  numPages: number;
  numInputs: number;
}

const NPages: FunctionComponent<NPagesProps> = ({ numPages, numInputs }) => {
  const schemas = runNTimes(numPages, newPageSchema);
  const initialStore = runNTimes(numPages, () => ({
    field1: '',
  }));
  const pageTitles = runNTimes(numPages, () => 'Example Page Title');

  return (
    <WizardForm<Store>
      show={true}
      onHide={() => {}}
      onSubmit={() => true}
      title="Example Title Here"
      pageTitles={pageTitles}
      initialStore={initialStore}
      schemas={schemas}
    >
      {runNTimes(numPages, () => (
        <Page numInputs={numInputs} />
      ))}
    </WizardForm>
  );
};

export default NPages;
