import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import FilterForm from './FilterForm';
import {
  roomTypeIcons,
  filterIcons,
  preferencesIcons,
} from '../assets/icons/all';
import { intervalOptions, yearMonths } from '../assets/constants';
import { moveInSelect } from '../assets/utils/index';
import {
  FilterModel,
  PreferenceLiteralType,
  Preferences,
  RoomLiteralType,
} from '../assets/models/FilterModel';
import { searchHousingPosts } from '../redux/slices/housing';
import { selectShowFilter, setShow } from '../redux/slices/filter';

type RoomType = { [P in RoomLiteralType]: boolean };

interface Price {
  minimum: number;
  maximum: number;
}

const Separator: React.FC<React.HTMLAttributes<JSX.Element>> = () => (
  <div className="d-flex justify-content-center my-5">
    <div className="separator" />
  </div>
);

const formatRequest = (
  pref: Preferences,
  rt: RoomType,
  earlyInterval: string,
  earlyMonth: string,
  lateInterval: string,
  lateMonth: string,
  monthCount: number,
  minute: number,
  price: Price,
): FilterModel => {
  const roomSelections: RoomLiteralType[] = [
    'single',
    'double',
    'triple',
    'livingRoom',
    'suite',
    'studio',
  ];
  const otherPrefs: PreferenceLiteralType[] = [
    'female',
    'male',
    'lgbtq',
    'pets',
    '_420',
  ];
  const facilities: PreferenceLiteralType[] = ['parking', 'privateBath'];
  const roomResult: RoomLiteralType[] = [];
  const selectedRooms = roomSelections.reduce((result, roomSelection) => {
    if (rt[roomSelection]) {
      result.push(roomSelection);
    }
    return roomResult;
  }, roomResult);
  const selectedOther = otherPrefs.reduce<PreferenceLiteralType[]>(
    (otherResult, otherPref) => {
      if (pref[otherPref]) {
        otherResult.push(otherPref);
      }
      return otherResult;
    },
    [],
  );
  const selectedFac = facilities.reduce<PreferenceLiteralType[]>(
    (facResult, otherPref) => {
      if (pref[otherPref]) {
        facResult.push(otherPref);
      }
      return facResult;
    },
    [],
  );
  return {
    distance: `${minute} mins`,
    roomType: selectedRooms,
    earlyInterval,
    earlyMonth,
    lateInterval,
    lateMonth,
    stayPeriod: monthCount,
    priceMin: price.minimum,
    priceMax: price.maximum,
    other: selectedOther,
    facilities: selectedFac,
  };
};

const Filter: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const showFilter = useSelector(selectShowFilter);
  const setShowFilter = (value: boolean) => dispatch(setShow(value));

  return (
    <>
      {/* Header in the home page */}
      <div className="filter-launch-pad">
        <filterIcons.hello className="disappear-on-sm" />
        <filterIcons.arrow className="disappear-on-sm" />
        <Button onClick={() => setShowFilter(true)}>Find your place</Button>
        <filterIcons.arrow className="disappear-on-sm" />
        <filterIcons.loveHouse className="disappear-on-sm" />
      </div>

      {/* The filter itself */}
      <FilterForm show={showFilter} setShow={setShowFilter} />
    </>
  );
};

export default Filter;
