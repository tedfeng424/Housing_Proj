import React, { ComponentProps } from 'react';
import Amenities from './Amenities';
import { StoryTemplate } from '@utils';

export default {
  title: 'Amenities',
  component: Amenities,
};

const Template = StoryTemplate<
  ComponentProps<typeof Amenities>,
  typeof Amenities
>(Amenities);

export const Default = Template.bind({});
