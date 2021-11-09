import React, { ComponentProps } from 'react';
import GooglePlaceAutoComplete from './GooglePlaceAutoComplete';
import { StoryTemplate } from '@utils';

export default {
  title: 'GooglePlaceAutoComplete',
  component: GooglePlaceAutoComplete,
};

const Template = StoryTemplate<
  ComponentProps<typeof GooglePlaceAutoComplete>,
  typeof GooglePlaceAutoComplete
>(GooglePlaceAutoComplete);

export const Default = Template.bind({});
Default.args = {};
