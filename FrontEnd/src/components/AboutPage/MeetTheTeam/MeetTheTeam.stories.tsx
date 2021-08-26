import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react';
import MeetTheTeam from './MeetTheTeam';

export default {
  title: 'AboutPage/MeetTheTeam',
  component: MeetTheTeam,
};

const Template: Story<ComponentProps<typeof MeetTheTeam>> = (args) => (
  <MeetTheTeam {...args} />
);

export const Default = Template.bind({});
