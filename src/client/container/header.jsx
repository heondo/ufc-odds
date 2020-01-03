import React, { useState, useContext } from 'react';
import Cookies from 'universal-cookie';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user-context';

const cookies = new Cookies();

const LogoAndText = styled.span`
  display: flex;
  justify-content: center;
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

const DownArrow = styled.i`
  margin: 0 0 10px 5px;
  width: 15px;
  height: 15px;
  padding: 3px;
  background-color: black;
  transition: all ease .5s;
  /* :hover {
    background-color: white;
  } */
`;

const AccountMenu = styled.div`
  display: ${props => props.menuVisible ? 'flex': 'none'};
  position: absolute;
  flex-direction: column;
  color: black;
  background-color: lightgrey;
  margin-top: 4rem;
  margin-right: .5rem;
  z-index: 2;
  padding: .5rem;
  border-radius: 5px;
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
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <LogoAndText>
          <LogoContainer />
          <div>Guesser</div>
        </LogoAndText>
      </Link>
      <LogoAndText>
        {user ? (
          <Link to="/account">
            Account
          </Link>
        ) : (
            <LogoAndText>
              <Link to="/login">
                <div>Login</div>
              </Link>
            </LogoAndText>
          )}
        <DownArrow onClick={toggleMenu}>
          <i className="fas fa-sort-down" />
        </DownArrow>
        <AccountMenu menuVisible={menuVisible}>
          {user ? (
            <Link to="/" onClick={() => {
              window.localStorage.removeItem('userData');
              cookies.remove('token');
              setUser(null);
            }}>
              Signout
            </Link>
          ) : (
              <Link to="/signup" style={{ marginLeft: '1rem' }}>
                <div>Signup</div>
              </Link>
          )}
        </AccountMenu>
      </LogoAndText>
    </HeaderContainer>
  );
}

Header.propTypes = {
  user: PropTypes.object
};
