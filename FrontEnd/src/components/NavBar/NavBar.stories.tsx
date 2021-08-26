import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import NavBar from './NavBar';

export default {
  title: 'NavBar',
  component: NavBar,
};

const Template: Story<ComponentProps<typeof NavBar>> = (args) => (
  <NavBar {...args} />
);

export const Default = Template.bind({});
