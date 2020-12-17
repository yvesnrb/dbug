import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Spinner, { Props as SpinnerProps } from './index';

export default {
  title: 'Spinner',
  component: Spinner,
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
} as Meta;

const Template: Story<SpinnerProps> = args => <Spinner {...args} />;

export const Light = Template.bind({});
Light.args = {
  color: 'light',
};

export const Dark = Template.bind({});
Dark.args = {
  color: 'dark',
};

export const Small = Template.bind({});
Small.args = {
  color: 'light',
  small: true,
};
