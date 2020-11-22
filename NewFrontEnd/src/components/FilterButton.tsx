import React from 'react';
import Button from 'react-bootstrap/Button';
import { setShow } from '../redux/slices/filter';
import { useDispatch } from 'react-redux';
const FilterButton: React.FC<{
  name: string;
}> = ({ name }) => {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(setShow(true));
      }}
      className="filter-launch-button"
    >
      {name}
    </Button>
  );
};

export default FilterButton;
