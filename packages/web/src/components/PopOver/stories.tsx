import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import PopOver, { Props as PopOverProps } from './index';

export default {
  title: 'PopOver',
  component: PopOver,
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

const Template: Story<PopOverProps> = args => <PopOver {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'success',
  content: 'Lorem ipsum',
  children: <p>hover me</p>,
};
