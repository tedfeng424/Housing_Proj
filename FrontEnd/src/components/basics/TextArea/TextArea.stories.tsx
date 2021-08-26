import React, { ComponentProps } from 'react';
import TextArea from './TextArea';
import { StoryTemplate } from '@utils';

export default {
  title: 'TextArea',
  component: TextArea,
};

const Template = StoryTemplate<
  ComponentProps<typeof TextArea>,
  typeof TextArea
>(TextArea);

export const DefaultWithPlaceHolder = Template.bind({});
DefaultWithPlaceHolder.args = {
  maxLength: 20,
  label: 'Jurassic Park is Better than Jurassic World',
  controlId: 'thesis',
  defaultContent: '',
  placeHolder: 'This is a placeholder',
  readOnly: false,
};

export const Default = Template.bind({});
Default.args = {
  maxLength: 80,
  label: 'Jurassic Park is Better than Jurassic World',
  controlId: 'thesis',
  defaultContent: 'No need to explain',
  readOnly: false,
};
