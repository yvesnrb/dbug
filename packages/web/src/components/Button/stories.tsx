import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button, { Props as ButtonProps } from './index';

export default {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  children: 'Im a button!',
};

export const Disabled = Template.bind({});
Disabled.args = {
  color: 'primary',
  disabled: true,
  children: 'Im a button!',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  children: 'Im a button!',
};

export const Small = Template.bind({});
Small.args = {
  color: 'primary',
  small: true,
  children: 'Im a button!',
};

export const Loading = Template.bind({});
Loading.args = {
  color: 'primary',
  loading: true,
  children: 'Im a button!',
};
