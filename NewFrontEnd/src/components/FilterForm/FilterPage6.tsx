import React from 'react';
import { Container, Row, Form } from 'react-bootstrap';
import * as z from 'zod';
import { WizardFormStep } from '../WizardForm';
import ToggleGroup from '../basics/ToggleGroup';

// TODO put in its own file
enum Preference {
  femaleOnly = 'Female only',
  maleOnly = 'Male only',
  coed = 'Co-ed',
  // clean = 'Clean',
  // quiet = 'Quiet',
  partyOk = 'Party OK',
  noParty = 'No party',
  // extrovert = 'Extrovert',
  // introvert = 'Introvert',
  // nightOwl = 'Night owl',
  // earlyBird = 'Early bird',
  _420Friendly = '420 friendly',
  smokeFree = 'Smoke free',
  lgbtqFriendly = 'LGBTQ+ friendly',
  overnightGuestOk = 'Overnight guest OK',
  noOvernightGuest = 'No overnight Guest',
}

export const page6Schema = z.object({
  preferences: z.string().array(),
});

export type Page6Store = z.infer<typeof page6Schema>;

export const page6InitialStore: Page6Store = {
  preferences: [],
};

const FilterPage6: React.FC<WizardFormStep<Page6Store>> = ({
  preferences,
  setStore,
}) => {
  return (
    <Container>
      <Row className="justify-content-center m-2 my-4">
        <div className="post-title">Other requests?</div>
      </Row>

      <Form.Row className="m-2">
        <ToggleGroup
          content={Object.values(Preference)}
          initialSelected={preferences}
          onSelect={({ label, selected }) => {
            if (selected) {
              setStore({ preferences: [...preferences, label] });
            } else {
              setStore({
                preferences: preferences.filter(
                  (preference) => preference !== label,
                ),
              });
            }
          }}
          center
        />
      </Form.Row>
    </Container>
  );
};

export default FilterPage6 as React.FC;
