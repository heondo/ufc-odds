import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
  return (
    <HeaderContainer>
      <LogoAndText>
        <LogoContainer />
        <div>Guesser</div>
      </LogoAndText>
      {props.user ? (
        <div>
        Account
        </div>
      ) : (
        <Link to="/signup">
          <div>Signup</div>
        </Link>
      )}
    </HeaderContainer>
  );
}

Header.propTypes = {
  user: PropTypes.object
};
