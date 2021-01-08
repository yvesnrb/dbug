import { Formik } from 'formik';
import React from 'react';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../components/Button';
import MainNav from '../../components/MainNav';
import TextArea from '../../components/TextArea';
import TwoPaneContainer from '../../components/TwoPaneContainer';
import { useAuth } from '../../hooks/useAuth';
import { useCreateProject } from '../../hooks/useProject';
import { Container, MessageContainer } from './styles';
import bugSpottingImg from '../../assets/bug-spotting.svg';

const NewProject: React.FC = () => {
  const { data } = useAuth();
  const { jwt } = data;
  const create = useCreateProject(jwt);

  return (
    <>
      <MainNav returnHref="/dashboard" />
      {create.data && <Redirect to={`/project/${create.data.id}`} />}

      {create.isError && (
        <MessageContainer>
          <p>
            Looks like we need to do some debugging of our own! Please wait a
            few moments or refresh this page.
          </p>
          <img src={bugSpottingImg} alt="A man looking for bugs" />
        </MessageContainer>
      )}

      <Container hidden={create.isError}>
        <TwoPaneContainer>
          <TwoPaneContainer.LeftPane className="left">
            <h1>New Project</h1>

            <p>
              Give a brief description of something you are trying to create or
              a problem you are trying to solve.
            </p>
          </TwoPaneContainer.LeftPane>

          <TwoPaneContainer.RightPane className="right">
            <Formik
              initialValues={{ body: '' }}
              onSubmit={values => create.mutate(values.body)}
              validationSchema={Yup.object({
                body: Yup.string().min(25).max(500).required(),
              })}
            >
              {formik => (
                <form onSubmit={formik.handleSubmit}>
                  <TextArea
                    label="Project Description"
                    name="body"
                    maxChars={500}
                  />

                  <Button
                    loading={create.isLoading}
                    type="submit"
                    color="primary"
                    small
                  >
                    Post Project
                  </Button>
                </form>
              )}
            </Formik>
          </TwoPaneContainer.RightPane>
        </TwoPaneContainer>
      </Container>
    </>
  );
};

export default NewProject;
