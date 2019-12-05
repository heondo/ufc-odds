import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { UserContext } from '../context/user-context';

const validationSchema = yup.object().shape({
  username: yup.string().required('* Required'),
  password: yup.string().required('* Required')
});

export default function Login(props) {
  const { user, setUser } = useContext(UserContext);
  const [loginFailed, setLoginFailed] = useState(false);

  const submitLogin = async values => {
    try {
      const loginResponse = await axios.post('/api/users/login', values);
      const userData = {
        userID: loginResponse.data.userID,
        username: loginResponse.data.username
      };
      window.localStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);
      props.history.push('/');
    } catch (err) {
      if (err.response && err.response.data.error === 'failed_credentials') {
        setLoginFailed(true);
      }
    }
  };

  return (
    <LoginContainer>
      <h2>Login</h2>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={submitLogin}
      >
        <FormContainer onChange={() => { setLoginFailed(false); }}>
          <InputContainer>
            <InputField name="username" placeholder="username" />
            <ErrorOutput name="username" component="div" />
          </InputContainer>
          <InputContainer>
            <InputField name="password" placeholder="password" type="password" />
            <ErrorOutput name="password" component="div" />
            <LoginFailError error={loginFailed}>Login Failed</LoginFailError>
          </InputContainer>
          <SubmitButton type="submit">
              Submit
          </SubmitButton>
        </FormContainer>
      </Formik>
    </LoginContainer>
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

const LoginFailError = styled.div`
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

const LoginContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin: auto;
  max-width: 768px;
  padding: .5rem;
`;
