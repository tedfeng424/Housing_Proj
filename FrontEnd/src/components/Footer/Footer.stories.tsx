import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import Footer from './Footer';
import { StoryTemplate } from '@utils';

export default {
  title: 'Footer',
  component: Footer,
};

const Template = StoryTemplate<ComponentProps<typeof Footer>, typeof Footer>(
  Footer,
);

export const Default = Template.bind({});
