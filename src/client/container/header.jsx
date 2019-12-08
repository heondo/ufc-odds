import React, { useState, useContext } from 'react';
import Cookies from 'universal-cookie';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user-context';

const cookies = new Cookies();

const LogoAndText = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const HeaderContainer = styled.div`
  background-color: black;
  color: white;
  padding: .5rem 2rem .5rem 1rem;
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
`;

const LogoContainer = styled.div`
  width: 8rem;
  height: 6.5rem;
  background-image: url("assets/ufc-logo.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export default function Header(props) {
  const { user, setUser } = useContext(UserContext);
  return (
    <HeaderContainer>
      <Link to="/">
        <LogoAndText>
          <LogoContainer />
          <div>Guesser</div>
        </LogoAndText>
      </Link>
      {user ? (
        <div onClick={() => {
          window.localStorage.removeItem('userData');
          cookies.remove('token')
          setUser(null);
        }}>
            Signout
        </div>
      ) : (
        <LogoAndText>
          <Link to="/login">
            <div>Login</div>
          </Link>
          <Link to="/signup" style={{ marginLeft: '1rem' }}>
            <div>Signup</div>
          </Link>
        </LogoAndText>
      )}
    </HeaderContainer>
  );
}

Header.propTypes = {
  user: PropTypes.object
};
