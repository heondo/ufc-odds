import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {UserContext} from '../context/user-context'
import LoadingCircle from '../container/loading-circle';
import AccountsSummaries from '../container/accounts-summaries'

export default function AccountPage(props){
  const {user, setUser} = useContext(UserContext);
  const [predictionData, setPredictionData] = useState(false)

  const TotalPredictions = ({seasonsArray}) => {
    let correct = 0;
    let passedFights = 0;
    for (let i = 0; i < seasonsArray.length; i++){
      if (!seasonsArray[i].seasonsummaries){
        continue;
      }
      if (!seasonsArray[[i]].seasonsummaries[0].sportEventStatus.winner){
        continue;
      }
      const seasonSummaries = seasonsArray[i].seasonsummaries;
      for (let j in seasonSummaries){
        if (seasonSummaries[j].predictedFighter === seasonSummaries[j].sportEventStatus.winner_id){
          correct += 1;
        }
        passedFights += 1;
      }
    }
    return (
      <div>
        {correct}/{passedFights} so far
        <div>
          thats not bad, for a percentage of {(correct*100/passedFights).toFixed(2)}%
        </div>
      </div>
    )
  }

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
      <TotalPredictions seasonsArray={predictionData}/>
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
