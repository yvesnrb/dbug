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
};

export const Disabled = Template.bind({});
Disabled.args = {
  color: 'primary',
  disabled: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  color: 'primary',
  small: true,
};

export const Loading = Template.bind({});
Loading.args = {
  color: 'primary',
  loading: true,
};
