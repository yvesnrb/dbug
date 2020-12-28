import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import api from '../../services/api';
import MainNav from '../../components/MainNav';
import TwoPaneContainer from '../../components/TwoPaneContainer';
import { Container } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

interface FormValues {
  meet?: string;
  discord?: string;
  zoom?: string;
  minOne?: boolean | undefined;
}

type FormKeys = 'meet' | 'discord' | 'zoom' | 'minOne';

const Contact: React.FC = () => {
  const {
    data: { jwt, user },
    updateContact,
  } = useAuth();
  const [loading, setLoading] = useState(false);

  const formInitialValues = {
    meet: '',
    discord: '',
    zoom: '',
    minOne: undefined,
  };

  const validationSchema = Yup.object({
    meet: Yup.string().email('Please enter a valid email'),
    discord: Yup.string().matches(/^((.{2,32})#\d{4})/, {
      message: 'Please enter a valid Discord handle',
    }),
    zoom: Yup.string()
      .min(2, 'Zoom username must be at least 2 characters')
      .max(20, 'Zoom username must be at most 20 characters'),
    minOne: Yup.bool().when(['meet', 'discord', 'zoom'], {
      is: (meet: string, discord: string, zoom: string) =>
        !meet && !discord && !zoom,
      then: Yup.bool().required('Please fill at least one contact').strict(),
      otherwise: Yup.bool().strict(),
    }),
  });

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      const contact = {} as FormValues;

      Object.entries(values).forEach(([key, value]) => {
        if (values[key as FormKeys]) contact[key as FormKeys] = value;
      });

      setLoading(true);
      const { data } = await api.post('/contacts', contact, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setLoading(false);
      updateContact(data);
    },
    [jwt, updateContact],
  );

  return (
    <>
      {user.contact_id ? <Redirect to="/dashboard" /> : null}

      <MainNav returnHref="/signout" />

      <Container>
        <TwoPaneContainer>
          <TwoPaneContainer.LeftPane className="left">
            <h1>Almost There!</h1>

            <p>
              Fill out at least one contact information so other programmers
              know where to find you. Don&apos;t worry, this information will
              only ever be shared with people you request.
            </p>
          </TwoPaneContainer.LeftPane>

          <TwoPaneContainer.RightPane className="right">
            <Formik
              initialValues={formInitialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {formik => (
                <form onSubmit={formik.handleSubmit}>
                  <Input label="Google Meet Email" name="meet" />

                  <Input label="Discord Handle" name="discord" />

                  <Input label="Zoom Username" name="zoom" />

                  <Button loading={loading} type="submit" color="primary" small>
                    Let&apos;s Go!
                  </Button>
                  <p>{formik.errors.minOne}</p>
                </form>
              )}
            </Formik>
          </TwoPaneContainer.RightPane>
        </TwoPaneContainer>
      </Container>
    </>
  );
};

export default Contact;
