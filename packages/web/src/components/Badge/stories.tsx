import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Badge, { Props as BadgeProps } from './index';

export default {
  title: 'Badge',
  component: Badge,
  decorators: [
    (ThisStory: React.FC) => (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ThisStory />
      </div>
    ),
  ],
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
  children: <p>im a badge</p>,
};

export const LightColor = Template.bind({});
LightColor.args = {
  color: '#fff',
  textDark: true,
  children: <p>im a badge</p>,
};

export const Small = Template.bind({});
Small.args = {
  color: '#fff',
  textDark: true,
  size: 'small',
  children: <p>im a badge</p>,
};

export const Large = Template.bind({});
Small.args = {
  color: '#fff',
  textDark: true,
  size: 'large',
  children: <p>im a badge</p>,
};

export const Disabled = Template.bind({});
Disabled.args = {
  color: '#fff',
  textDark: true,
  size: 'small',
  disabled: true,
  children: <p>im a badge</p>,
};
