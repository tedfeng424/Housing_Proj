import React, { FunctionComponent } from 'react';
import RadioButton, { RadioButtonProps } from './RadioButton';
import { Row, Col } from 'react-bootstrap';

export interface RadioGroupProps {
  buttonProps: RadioButtonProps[];
}

const RadioGroup: FunctionComponent<RadioGroupProps> = ({ buttonProps }) => {
  return (
    <Row className="w-100">
      {buttonProps.map((props) => (
        <Col xs={4} lg={3}>
          <RadioButton {...props} />
        </Col>
      ))}
    </Row>
  );
};

export default RadioGroup;
