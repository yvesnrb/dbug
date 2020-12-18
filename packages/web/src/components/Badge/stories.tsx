import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Badge, { Props as BadgeProps } from './index';

export default {
  title: 'Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: { type: 'color' },
    },
  },
} as Meta;

const Template: Story<BadgeProps> = args => <Badge {...args} />;

export const DarkColor = Template.bind({});
DarkColor.args = {
  color: '#000',
  textDark: false,
  children: 'im a badge',
};

export const LightColor = Template.bind({});
LightColor.args = {
  color: '#fff',
  textDark: true,
  children: 'im a badge',
};

export const Small = Template.bind({});
Small.args = {
  color: '#fff',
  textDark: true,
  size: 'small',
  children: 'im a badge',
};

export const Large = Template.bind({});
Large.args = {
  color: '#fff',
  textDark: true,
  size: 'large',
  children: 'im a badge',
};

export const Disabled = Template.bind({});
Disabled.args = {
  color: '#fff',
  textDark: true,
  size: 'small',
  disabled: true,
  children: 'im a badge',
};
