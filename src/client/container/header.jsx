import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background-color: black;
  color: white;
  padding: .5rem 0;
  display: flex;
  height: 4rem;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 10rem;
  height: 10rem;
  background-image: url("assets/ufc-logo.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default function Header(props) {
  return (
    <HeaderContainer>
      <LogoContainer /> Guesser
    </HeaderContainer>
  );
}
