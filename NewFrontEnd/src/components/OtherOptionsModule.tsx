import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { preferencesIcons } from '../assets/icons/all';

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
// Should place this else where when combining everying
const tempStyle = {
  'font-family': 'Roboto Slab',
  'font-style': 'normal',
  'font-weight': 'normal',
  'font-size': '20px',
  'line-height': '26px',
  color: '#A6623F',
};

const OtherOptions: React.FC<{}> = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const [preferences, setPreferences] = useState<Preferences>({
    female: false,
    male: false,
    LGBTQ: false,
    parking: false,
    pets: false,
    privateBath: false,
    _420: false,
    earlyBird: false,
    elevator: false,
    furnished: false,
    grocery: false,
    gym: false,
    hardwood: false,
    livingRoomPeople: false,
    nightOwl: false,
    noSmoke: false,
    patio: false,
    pool: false,
    washerDryer: false,
  });

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
    <Modal show={show} onHide={handleClose}>
      <p className="text-center" style={tempStyle}>
        ...other requests
      </p>
      <svg
        width="460"
        height="19"
        viewBox="0 0 460 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="460" height="19" rx="9.5" fill="#FDF4F0" /> {/* lighter */}
        <rect width="375" height="19" rx="9.5" fill="#E7936D" /> {/* darker */}
      </svg>
      <br />
      <br />

      {objs.map((key: keyof Preferences) => {
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

        // ripped from Filter
        return (
          <Button
            className="btn-filter"
            onClick={() => {
              setPreferences({
                ...preferences,
                [key]: !preferences[key],
              });
            }}
          >
            {preferences[key] ? (
              <PreferenceIconChosenTagName className="d-block" />
            ) : (
              <PreferenceIconNotChosenTagName className="d-block" />
            )}
          </Button>
        );
      })}
    </Modal>
  );
};

export default OtherOptions;
