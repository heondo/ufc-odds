import React from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import UserContext from '../context/user-context';

function equalTo(ref, msg) {
  return yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg,
    params: {
      reference: ref.path
    },
    test: function (value) {
      return value === this.resolve(ref);
    }
  });
}
yup.addMethod(yup.string, 'equalTo', equalTo);

const validationSchema = yup.object().shape({
  username: yup.string().min(6, 'Username must be at least 6 characters long').max(32, 'Username limited to 32 characters').required('Username Required'),
  password: yup.string().min(8, 'Password must be at least 6 characters long').max(32, 'Password limited to 32 characters')
    .matches(/\d/, 'One digit required').matches(/[A-Z]/, 'One capital letter required').matches(/[a-z]/, 'One lowercase letter required').required('Password Required'),
  confirmPassword: yup.string().equalTo('password', 'Passwords must match')
});

export default function SignUp(props) {
  return (
    <SignUpContainer>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form>
          <InputContainer>
            <InputField name="username" placeholder="username" />
            <ErrorOutput name="username" component="div"/>
          </InputContainer>
          <InputContainer>
            <InputField name="password" placeholder="password" />
            <ErrorOutput name="password" component="div" />
          </InputContainer>
          <InputContainer>
            <InputField name="confirmPassword" placeholder="confirmPassword" />
            <ErrorOutput name="confirmPassword" component="div" />
          </InputContainer>
        </Form>
      </Formik>
    </SignUpContainer>
  );
}

const InputField = styled(Field)`
  width: 100%;
  padding: .5rem;
  border-radius: 7px;
  &:focus {
    border: 2px groove blue;
  }
`;

const ErrorOutput = styled(ErrorMessage)`
  position: absolute;
  bottom: -1rem;
  font-size: .8em;
  color: red;
`;

const InputContainer = styled.div`
  max-width: 25rem;
  position: relative;
  margin: .5rem auto 1.5rem auto;
`;

const Divider = styled.div`
  border-bottom: 2px solid grey;
  width: 85%;
  margin: .3rem auto;
`;

const SignUpContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin: auto;
  max-width: 768px;
  padding: .5rem;
`;
