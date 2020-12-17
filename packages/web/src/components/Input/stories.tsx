import React from 'react';
import { Formik, Form } from 'formik';
import { Story, Meta } from '@storybook/react/types-6-0';
import * as Yup from 'yup';
import Input, { Props as InputProps } from './index';

const formSchema = Yup.object({
  testInput: Yup.string().email(),
});

export default {
  title: 'Input',
  component: Input,
  decorators: [
    (ThisStory: React.FC) => (
      <Formik
        initialValues={{ testInput: '' }}
        // eslint-disable-next-line no-console
        onSubmit={values => console.table(values)}
        validationSchema={formSchema}
      >
        <Form
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ThisStory />
          <button style={{ marginLeft: '10px' }} type="submit">
            submit test form
          </button>
        </Form>
      </Formik>
    ),
  ],
  argTypes: {
    name: {
      control: { type: null },
    },
  },
} as Meta;

const Template: Story<InputProps> = args => <Input {...args} />;

export const Default = Template.bind({});
Template.args = {
  name: 'testInput',
};
