import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {UserContext} from '../context/user-context';
import LoadingCircle from '../container/loading-circle';
import AccountsSummaries from '../container/accounts-summaries';

export default function AccountPage(props){
  const {user, setUser} = useContext(UserContext);
  const [predictionData, setPredictionData] = useState(false);
  const betAmount = 10;

  const accuracyText = (percentage) => {
    if (percentage < .25){
      return `I definitely wouldn't bet with an accuracy of ${percentage*100}%`;
    }
    if (percentage < .5){
      return `You could try your luck with a ${percentage*100}% accuracy`;
    }
    if (percentage < .75){
      return `Not bad try your luck you're doing ${percentage*100}%`;
    }
    else {
      return `Sell the house. Go to Vegas and good luck: ${percentage*100}%`;
    }
  };

  const returnWinnerPercentage = (winner, competitors, outcomes) => {
    // I need the sportEvents competitors, get the index for the predictedCompetitor, get the odds for that fighter
    if (!outcomes) {
      return 50;
    }
    let winnerIndex;
    competitors.forEach((c, i) => {
      if (c.id === winner) {
        winnerIndex = i;
      }
    });
    // so i have 0 or 1
    return outcomes[winnerIndex].probability;
  };

  const percentToOdds = percentage => {
    const odds = percentage >= 50 ? (-(percentage) / (100 - percentage) * 100).toFixed(0) : (((100 - percentage) / percentage) * 100).toFixed(0);
    return odds;
  };

  const plusMinusOdds = percentage => {
    const odds = percentToOdds(percentage);
    return odds > 0 ? `+${odds}` : odds;
  };

  const calculateWinnings = percentage => {
    // configure logic to calculate payout for betting on a particular percentage odds thing
    const odds = plusMinusOdds(percentage);
    const payout = odds >= 0 ? betAmount * (odds / 100) + betAmount : betAmount / ((-1*odds)/100) + betAmount;
    return payout;
  };

  const TotalPredictions = ({seasonsArray}) => {
    let correct = 0;
    let passedFights = 0;
    let winnings = 0;
    let inputMoney = 0;
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
          // this is the winning conditional, if you win, find the winners probabilities in outcome.
          const {outcomes} = seasonSummaries[j].markets ? seasonSummaries[j].markets[0] : null;
          const predictedPercentage = returnWinnerPercentage(seasonSummaries[j].sportEventStatus.winner_id, seasonSummaries[j].sportEvent.competitors , outcomes);
          const payout = calculateWinnings(predictedPercentage);
          winnings += payout;
          correct += 1;
        }
        passedFights += 1;
        inputMoney += betAmount;
      }
    }
    const percentageChange = (winnings * 100 / inputMoney).toFixed(2);
    return (
      <div>
        <div>
          You have made {passedFights} bets with {correct} predictions
        </div>
        <div>
          That is ${inputMoney} in, ${winnings.toFixed(2)} {winnings < inputMoney ? 'left' : 'total in winnings'}.
          Good for {percentageChange}% of initial earnings
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchUserPredictions();
  }, []);

  const fetchUserPredictions = async () => {
    try {
      const predictionResponse = await axios.get(`/api/users/${user.userID}`);
      setPredictionData(predictionResponse.data.seasons);
    }
    catch(err) {
      setPredictionData([]);
      console.error(err);
    }
  };

  return user && predictionData  ? (
    <AccountContainer>
      <AccountTitle>
        PROFILE
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
            );
          })
        ) : (
          <div>
            Make predictions for some data
          </div>
        )
      }
    </AccountContainer>
  ) : <LoadingCircle />;
}


const AccountContainer = styled.div`
  display: flex;
  /* text-align: center; */
  flex-direction: column;
  margin: auto;
  max-width: 768px;
  padding: .5rem;
`;

const AccountTitle = styled.div`
  text-align: start;
  font-size: 2em;
  font-style: italic;
  font-weight: bold;
  position: relative;
`;
