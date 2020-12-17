import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Toast, { Props as ToastProps } from './index';

export default {
  title: 'Toast',
  component: Toast,
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

const Template: Story<ToastProps> = args => <Toast {...args} />;

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  title: 'You Did It!',
  content:
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis fuga quae quaerat explicabo aspernatur expedita praesentium aliquam repellendus rerum voluptatum.',
};

export const Danger = Template.bind({});
Danger.args = {
  type: 'danger',
  title: 'Something Went Wrong...',
  content:
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis fuga quae quaerat explicabo aspernatur expedita praesentium aliquam repellendus rerum voluptatum.',
};

export const NoContent = Template.bind({});
NoContent.args = {
  type: 'danger',
  title: 'Something Went Wrong...',
};
