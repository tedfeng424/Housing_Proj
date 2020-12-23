import React from 'react';
import Button from 'react-bootstrap/Button';
import * as z from 'zod';
import { preferencesIcons } from '../../assets/icons/all';
import { WizardFormStep } from '../WizardForm';

// TODO eventually copy this over to the FilterModel file
const partialPreferences = z.object({
  female: z.boolean(),
  male: z.boolean(),
  LGBTQ: z.boolean(),
  parking: z.boolean(),
  pets: z.boolean(),
  privateBath: z.boolean(),
  _420: z.boolean(),
  earlyBird: z.boolean(),
  elevator: z.boolean(),
  furnished: z.boolean(),
  grocery: z.boolean(),
  gym: z.boolean(),
  hardwood: z.boolean(),
  livingRoomPeople: z.boolean(),
  nightOwl: z.boolean(),
  noSmoke: z.boolean(),
  patio: z.boolean(),
  pool: z.boolean(),
  washerDryer: z.boolean(),
});

type Preferences = z.infer<typeof partialPreferences>;

export const page4Schema = z.object({
  selectedPreferences: partialPreferences.partial(),
});

export type Page4Store = z.infer<typeof page4Schema>;

export const page4InitialStore: Page4Store = {
  selectedPreferences: {},
};

const PostPage4: React.FC<WizardFormStep<Page4Store>> = ({
  selectedPreferences,
  validations,
  setStore,
}) => {
  const objs: Array<keyof Preferences> = [
    'female',
    'male',
    'parking',
    'pets',
    'LGBTQ',
    'privateBath',
    '_420',
    'earlyBird',
    'elevator',
    'furnished',
    'grocery',
    'gym',
    'hardwood',
    'livingRoomPeople',
    'nightOwl',
    'noSmoke',
    'patio',
    'pool',
    'washerDryer',
  ];

  return (
    <div className="d-flex flex-wrap justify-content-center mx-3">
      {selectedPreferences &&
        objs.map((key: keyof Preferences) => {
          // Typescript bullshit
          const PreferencesChosenIconKey: keyof typeof preferencesIcons = `${key}Chosen` as keyof typeof preferencesIcons;
          const PreferencesNotChosenIconKey: keyof typeof preferencesIcons = key as keyof typeof preferencesIcons;
          const PreferenceIconChosenTagName: React.FunctionComponent<
            React.SVGProps<SVGSVGElement> & {
              title?: string | undefined;
            }
          > = preferencesIcons[PreferencesChosenIconKey];
          const PreferenceIconNotChosenTagName: React.FunctionComponent<
            React.SVGProps<SVGSVGElement> & {
              title?: string | undefined;
            }
          > = preferencesIcons[PreferencesNotChosenIconKey];

          return (
            <Button
              variant="no-show"
              onClick={() => {
                setStore({
                  selectedPreferences: {
                    ...selectedPreferences,
                    [key]: selectedPreferences
                      ? !selectedPreferences[key]
                      : true,
                  },
                });
              }}
            >
              {selectedPreferences[key] ? (
                <PreferenceIconChosenTagName className="d-block" />
              ) : (
                <PreferenceIconNotChosenTagName className="d-block" />
              )}
            </Button>
          );
        })}
    </div>
  );
};

export default PostPage4 as React.FC;
