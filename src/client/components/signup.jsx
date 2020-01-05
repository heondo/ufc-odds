import React, { useState, useContext } from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import styled from 'styled-components';
import { UserContext } from '../context/user-context';

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
  confirmPassword: yup.string().equalTo(yup.ref('password'), 'Passwords must match')
});

export default function SignUp(props) {
  const [usernameTaken, setUsernameTaken] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const submitUserData = async values => {
    try {
      const userSignupResponse = await axios.post('/api/users/signup', { ...values });
      if (userSignupResponse.data.success) {
        const { userID, username } = userSignupResponse.data;
        const userData = {
          userID,
          username
        };
        window.localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
        props.history.push('/');
      }
    } catch (err) {
      if (err.response && err.response.data.error === 'duplicate_username') {
        setUsernameTaken(true);
      }
      console.error(err);
    }
  };

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
        onSubmit={values => {
          setUsernameTaken(false);
          submitUserData(values);
        }}
      >
        <FormContainer onChange={() => { setUsernameTaken(false); }}>
          <InputContainer>
            <InputField name="username" placeholder="username" />
            <UsernameUnavailableError error={usernameTaken}>
              Username unavailable
            </UsernameUnavailableError>
            <ErrorOutput name="username" component="div"/>
          </InputContainer>
          <InputContainer>
            <InputField name="password" placeholder="********" type="password"/>
            <ErrorOutput name="password" component="div" />
          </InputContainer>
          <InputContainer>
            <InputField name="confirmPassword" placeholder="********" type="password" />
            <ErrorOutput name="confirmPassword" component="div" />
          </InputContainer>
          <SubmitButton type="submit">Submit</SubmitButton>
        </FormContainer>
      </Formik>
    </SignUpContainer>
  );
}

const SubmitButton = styled.button`
  padding: .3rem;
  border-radius: 7px;
  position: absolute;
  left: 0;
`;

const InputField = styled(Field)`
  width: 95%;
  padding: .5rem;
  border-radius: 7px;
  &:focus {
    border: 2px groove blue;
  }
`;

const UsernameUnavailableError = styled.div`
  display: ${props => props.error ? 'block' : 'none'}
  position: absolute;
  bottom: -1rem;
  font-size: .8em;
  color: red;
`;

const ErrorOutput = styled(ErrorMessage)`
  position: absolute;
  bottom: -1rem;
  font-size: .8em;
  color: red;
`;

const FormContainer = styled(Form)`
  width: 80%;
  max-width: 25rem;
  position: relative;
  margin: auto;
`;

const InputContainer = styled.div`
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
