import React, { FunctionComponent } from 'react';
import RadioToggle, { RadioToggleProps } from './RadioToggle';
import { Row, Col } from 'react-bootstrap';

export interface RadioToggleGroupProps {
  toggleProps: RadioToggleProps[];
}

const RadioToggleGroup: FunctionComponent<RadioToggleGroupProps> = ({
  toggleProps,
}) => {
  return (
    <Row className="w-100">
      {toggleProps.map((props) => (
        <Col xs={4} lg={3}>
          <RadioToggle {...props} />
        </Col>
      ))}
    </Row>
  );
};

export default RadioToggleGroup;
