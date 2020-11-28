import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { filterIcons } from '../assets/icons/all';
import FilterButton from './FilterButton';

const HouseNotFound: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <filterIcons.notFound />
      </Row>
      <Row className="justify-content-center">
        <p className="displayText">
          Oops, it looks like nothing fits your criteria...
        </p>
      </Row>
      <Row className="justify-content-center">
        <p className="displayText">Edit your Criteria & Try again !</p>
      </Row>
      <Row className="justify-content-center">
        <FilterButton name={'Edit Criteria'} />
      </Row>
    </Container>
  );
};

export default HouseNotFound;
