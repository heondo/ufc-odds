import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {UserContext} from '../context/user-context'
import LoadingCircle from '../container/loading-circle';
import AccountsSummaries from '../container/accounts-summaries'

export default function AccountPage(props){
  const {user, setUser} = useContext(UserContext);
  const [predictionData, setPredictionData] = useState(false)

  useEffect(() => {
    fetchUserPredictions();
  }, [])

  const fetchUserPredictions = async () => {
    try {
      const predictionResponse = await axios.get(`/api/users/${user.userID}`);
      setPredictionData(predictionResponse.data.seasons);
    }
    catch(err) {
      setPredictionData([]);
      console.error(err)
    }
  }

  return user && predictionData  ? (
    <AccountContainer>
      <AccountTitle>
        Account
      </AccountTitle>
      <div>
        total prediction results here?
      </div>
      {
        predictionData.length ? (
          predictionData.map(s => {
            return (
              <AccountsSummaries
                key={s.id}
                id={s.id}
                name={s.name}
                startDate={s.start_date}
                eventsArray={s.seasonsummaries}
              />
            )
          })
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
