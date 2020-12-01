import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { preferencesIcons } from '../../assets/icons/all';
import { WizardFormStep } from '../WizardForm';

interface Preferences {
  female: boolean;
  male: boolean;
  LGBTQ: boolean;
  parking: boolean;
  pets: boolean;
  privateBath: boolean;
  _420: boolean;
  earlyBird: boolean;
  elevator: boolean;
  furnished: boolean;
  grocery: boolean;
  gym: boolean;
  hardwood: boolean;
  livingRoomPeople: boolean;
  nightOwl: boolean;
  noSmoke: boolean;
  patio: boolean;
  pool: boolean;
  washerDryer: boolean;
}

export interface PostPage4Store {
  selectedPreferences: Partial<Preferences>;
}

export const PostPage4InitialStore: PostPage4Store = {
  selectedPreferences: {},
};

const PostPage4: React.FC<WizardFormStep<PostPage4Store>> = ({
  useWizardFormStorage,
}) => {
  const [{ selectedPreferences }, setStore] = useWizardFormStorage<
    PostPage4Store
  >();

  // TODO temporary
  useEffect(() => {
    if (!selectedPreferences) setStore({ selectedPreferences: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
