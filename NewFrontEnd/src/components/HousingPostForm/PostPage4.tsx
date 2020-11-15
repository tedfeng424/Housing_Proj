import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { preferencesIcons } from '../../assets/icons/all';
import { Container, Row, Col } from 'react-bootstrap';
import { setPost, selectPost } from '../../redux/slices/posting';
import { useSelector, useDispatch } from 'react-redux';

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

const facilties: Array<keyof Preferences> = [
  'parking',
  'privateBath',
  'elevator',
  'gym',
  'hardwood',
  'grocery',
  'patio',
  'pool',
  'washerDryer',
  'furnished',
];

const other: Array<keyof Preferences> = [
  'female',
  'male',
  'pets',
  'LGBTQ',
  '_420',
  'earlyBird',
  'livingRoomPeople',
  'nightOwl',
  'noSmoke',
];

const OtherOptions: React.FC<{}> = () => {
  const currentPost = useSelector(selectPost);
  const dispatch = useDispatch();
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
  // dispatch preferences to store
  useEffect(() => {
    dispatch(
      setPost(['facilities', facilties.filter((pref) => preferences[pref])]),
    );
    dispatch(setPost(['other', other.filter((pref) => preferences[pref])]));
  }, [preferences]);

  return (
    <Container>
      <Row>
        <Col>
          <span className="post-title">..other requests~</span>
        </Col>
      </Row>
      <Row>
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
            <Col md={5}>
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
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default OtherOptions;
