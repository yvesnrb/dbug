import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import MainNav, { Props as MainNavProps } from './index';

export default {
  title: 'MainNav',
  component: MainNav,
} as Meta;

const Template: Story<MainNavProps> = args => <MainNav {...args} />;

export const NoIcons = Template.bind({});
NoIcons.args = {
  icons: false,
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  icons: true,
};

export const WithReturn = Template.bind({});
WithReturn.args = {
  returnHref: 'https://www.google.com/',
};

export const NoBackground = Template.bind({});
NoBackground.args = {
  noBackground: true,
};
