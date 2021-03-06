import React, { useState, useContext } from "react";
import Cookies from "universal-cookie";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user-context";
import Dropdown, { DropdownButton, MenuItem } from "../components/Dropdown";

const cookies = new Cookies();

export default function Header(props) {
  const { user, setUser } = useContext(UserContext);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <LogoAndText>
          <LogoContainer />
          <HeaderTitle>BETTER</HeaderTitle>
        </LogoAndText>
      </Link>
      <DropdownContainer>
        <Dropdown.Toggle btnStyle="flat">Profile</Dropdown.Toggle>
        <Dropdown.Menu>
          {user ? (
            <>
              <MenuItem>
                <Link to="/account" onClick={closeMenu}>
                  Account
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/"
                  onClick={() => {
                    window.localStorage.removeItem("userData");
                    cookies.remove("token");
                    setUser(null);
                    closeMenu();
                  }}
                >
                  Signout
                </Link>
              </MenuItem>
            </>
          ) : (
            <MenuItem>
              <Link to="/login" onClick={closeMenu}>
                <div>Login</div>
              </Link>
            </MenuItem>
          )}
        </Dropdown.Menu>
      </DropdownContainer>
    </HeaderContainer>
  );
}

const DropdownContainer = styled(Dropdown)``;

const LogoAndText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.div`
  background-color: black;
  color: white;
  padding: 0.5rem 2rem 0.5rem 1rem;
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
`;

const HeaderTitle = styled.h2`
  font-style: italic;
  font-weight: bolder;
`;

const DownArrow = styled.i`
  margin: 0 0 10px 5px;
  width: 15px;
  height: 15px;
  padding: 3px;
  background-color: black;
  transition: all ease 0.5s;
  /* :hover {
    background-color: white;
  } */
`;

const AccountMenu = styled.div`
  display: ${(props) => (props.menuVisible ? "flex" : "none")};
  position: absolute;
  flex-direction: column;
  color: black;
  background-color: #dcdcdc;
  margin-top: 36px;
  margin-right: 0.5rem;
  z-index: 2;
  padding: 0.5rem;
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
