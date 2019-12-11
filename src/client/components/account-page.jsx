import React, {useState, useContext} from 'react';
import styled from 'styled-components'
import {UserContext} from '../context/user-context'
import LoadingCircle from '../container/loading-circle';

export default function AccountPage(props){
  const {user, setUser} = useContext(UserContext);
  return user ? (
    <AccountContainer>
      <AccountTitle>
        this is your home account page
      </AccountTitle>
    </AccountContainer>
  ) : <LoadingCircle />
}


const AccountContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin: auto;
  max-width: 768px;
  padding: .5rem;
`;

const AccountTitle = styled.div`
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  position: relative;
`;
