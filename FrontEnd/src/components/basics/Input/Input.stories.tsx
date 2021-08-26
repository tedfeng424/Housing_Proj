import React, { ComponentProps } from 'react';
import Input from './Input';
import { miscIcons } from '@icons';
import { StoryTemplate } from '@utils';

export default {
  title: 'Input',
  component: Input,
};

const Template = StoryTemplate<ComponentProps<typeof Input>, typeof Input>(
  Input,
);

export const Default = Template.bind({});
Default.args = {
  icon: { icon: miscIcons.dollar },
  isValid: false,
  isInvalid: false,
  readOnly: false,
};
