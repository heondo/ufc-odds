import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {UserContext} from '../context/user-context'
import LoadingCircle from '../container/loading-circle';

export default function AccountPage(props){
  const {user, setUser} = useContext(UserContext);
  const [predictionData, setPredictionData] = useState(true)

  const fetchUserPredictions = async () => {
    try {
      const predictionResponse = await axios.get('/api/users/');
      setPredictionData([]);
    }
    catch(err) {
      setPredictionData([]);
      console.error(err)
    }
  }

  return user && predictionData  ? (
    <AccountContainer>
      <AccountTitle>
        this is your home account page
      </AccountTitle>
      {
        predictionData.length ? (
          <div>
            if prediiction array then here
          </div>
        ) : (
          <div>
            Make predictions for some data
          </div>
        )
      }
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
