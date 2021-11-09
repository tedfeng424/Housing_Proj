import React, { FunctionComponent, useState } from 'react';
import { Form, Col, FormControlProps } from 'react-bootstrap';
import styles from './TextArea.module.scss';
import { Body2 } from '@basics';
import cn from 'classnames';

interface TextAreaProps extends FormControlProps {
  maxLength: number;
  label: string;
  controlId: string;
  defaultContent: string;
  placeHolder?: string;
  className?: string;
}

const TextArea: FunctionComponent<TextAreaProps> = ({
  maxLength,
  label,
  controlId,
  defaultContent,
  readOnly,
  placeHolder = '',
  onChange,
  className,
}) => {
  var [showPlaceHolder, clearPlaceHolder] = useState<boolean>(
    defaultContent.length == 0,
  );
  if (showPlaceHolder) defaultContent = placeHolder;
  var [content, setContent] = useState<string>(defaultContent);
  return (
    <Form.Row className={className}>
      <Form.Group as={Col} controlId={controlId} className="pl-0">
        <Form.Label className={styles.label}>{label}</Form.Label>
        <Form.Control
          readOnly={readOnly}
          as="textarea"
          className={cn(styles.content, {
            [styles.unfilled]: content.length === 0,
            [styles.readOnly]: readOnly,
            [styles.placeHolder]: showPlaceHolder,
          })}
          type="text"
          maxLength={maxLength}
          value={content}
          onClick={() => {
            if (showPlaceHolder) {
              setContent('');
              clearPlaceHolder(false);
            }
          }}
          onChange={(e) => {
            setContent(e.target.value);
            if (onChange) onChange(e);
          }}
        />
        <Body2 className={styles.charCheck}>
          {showPlaceHolder ? 0 : content.length}/{maxLength.toString()}
        </Body2>
      </Form.Group>
    </Form.Row>
  );
};

export default TextArea;
