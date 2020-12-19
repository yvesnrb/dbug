import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import PopOver, { Props as PopOverProps } from './index';

export default {
  title: 'PopOver',
  component: PopOver,
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template: Story<PopOverProps> = args => <PopOver {...args} />;

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  content: 'Lorem ipsum',
  children: 'hover me',
};

export const Danger = Template.bind({});
Danger.args = {
  type: 'danger',
  content: 'Lorem ipsum',
  children: 'hover me',
};
