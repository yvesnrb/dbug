import React from 'react';
import { Formik, Form } from 'formik';
import { Story, Meta } from '@storybook/react/types-6-0';
import * as Yup from 'yup';
import TextArea, { Props as TextAreaProps } from './index';

const formSchema = Yup.object({
  testInput: Yup.string()
    .min(1, 'Please type at least one character')
    .max(500, 'Please type less than 500 characters'),
});

export default {
  title: 'TextArea',
  component: TextArea,
  decorators: [
    (ThisStory: React.FC) => (
      <Formik
        initialValues={{ testInput: '' }}
        // eslint-disable-next-line no-console
        onSubmit={values => console.table(values)}
        validationSchema={formSchema}
      >
        <Form>
          <ThisStory />
        </Form>
      </Formik>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: {
      control: { type: null },
    },
  },
} as Meta;

const Template: Story<TextAreaProps> = args => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'testInput',
  label: 'This is the label',
  placeholder: 'This is the placeholder',
  maxChars: 500,
};
