import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import { Link } from 'react-router-dom';
import moment from 'moment';
// import SummaryListItem from './summary-list-item';
import styled from 'styled-components';
import { UserContext } from '../context/user-context';
import LoadingCircle from '../container/loading-circle';
import SeasonSummaryItem from '../container/new-fight-summary';

export default function SeasonPage(props) {
  const { id: seasonID } = props.match.params;
  const betAmount = 10;
  const [summaries, setSummaries] = useState(null);
  const [summariesCount, setSummariesCount] = useState(null);
  const possibleStages = ['Main Card', 'Prelims', 'Early Prelims'];
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getSeasonData();
  }, []);

  const getSeasonData = async () => {
    try {
      const response = await axios.get(`/api/seasons/${seasonID}`);
      setSummaries(response.data.summaries);
      setSummariesCount(response.data.summariesCount);
    }
    catch(err){
      // console.log(Object.keys(err));
      console.log(err.response.data.message);
      if (err.response.data.message === "No data available"){
        setSummaries([]);
        setSummariesCount(0);
      }
    }
  };

  const currentDate = new Date();
  const seasonDate = summaries && summaries.length ? new Date(summaries[0].sport_event.start_time) : null;

  const isDayBefore = (seasonDate - currentDate) / 1000 < 86400;

  const isHistory = !summaries ? null : seasonDate < currentDate;

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

  const calculateWinnings = percentage => {
    // configure logic to calculate payout for betting on a particular percentage odds thing
    const odds = plusMinusOdds(percentage);
    const payout = odds >= 0 ? betAmount * (odds / 100) + betAmount : betAmount / ((-1 * odds) / 100) + betAmount;
    return payout;
  };

  const percentToOdds = percentage => {
    const odds = percentage >= 50 ? (-(percentage) / (100 - percentage) * 100).toFixed(0) : (((100 - percentage) / percentage) * 100).toFixed(0);
    return odds;
  };

  const plusMinusOdds = percentage => {
    const odds = percentToOdds(percentage);
    return odds > 0 ? `+${odds}` : odds;
  };

  const TotalPredictions = ({ summariesArray }) => {
    let correct = 0;
    let passedFights = 0;
    let winnings = 0;
    let inputMoney = 0;
    if (!summariesArray || !summariesArray.length) {
      return null;
    }
    if (!isHistory) {
      return null;
    }
    for (let j in summariesArray) {
      if (!summariesArray[j].sport_event_status.winner) {
        continue;
      }
      if (summariesArray[j].predicted_fighter === summariesArray[j].sport_event_status.winner_id) {
        // this is the winning conditional, if you win, find the winners probabilities in outcome.
        const { outcomes } = summariesArray[j].markets ? summariesArray[j].markets[0] : null;
        const predictedPercentage = returnWinnerPercentage(summariesArray[j].sport_event_status.winner_id, summariesArray[j].sport_event.competitors, outcomes);
        const payout = calculateWinnings(predictedPercentage);
        winnings += payout;
        correct += 1;
      }
      if (summariesArray[j].predicted_fighter && !isCanceled(summariesArray[j].sport_event_status)) {
        passedFights += 1;
        inputMoney += betAmount;
      }
    }
    if (!inputMoney) {
      return null;
    }
    const percentageChange = (winnings * 100 / inputMoney - 100).toFixed(2);
    return (
      <OddsResultsContainer>
        <div>
          ${inputMoney} in, ${winnings.toFixed(2)} in yo pocket
        </div>
        <div>
          Good for {percentageChange > 0 ? '+' : '-'}{percentageChange}% of initial earnings
        </div>
      </OddsResultsContainer>
    );
  };

  const createVenueLocation = venue => {
    const venueString = `${venue.name}`;
    //  - ${venue.city_name}, ${venue.country_name}`;
    return venueString;
  };

  const addPredictionHandler = (index, predictionID, fighterID) => {
    let {votecount: voteCount} = summaries[index];
    if (!voteCount || !voteCount[fighterID]) {
      voteCount = {
        ...voteCount,
        [fighterID]: 0
      };
    }
    voteCount[fighterID] += 1;
    const newSummaries = update(summaries, {
      [index]: {
        prediction_id: {$set: predictionID},
        predicted_fighter: {$set: fighterID},
        votecount: {$set: voteCount}
      }
    });
    setSummaries(newSummaries);
  };

  const isCanceled = statusObject => {
    return (!!(statusObject.status === 'closed' && statusObject.match_status === 'cancelled'));
  };

  if (!summaries) {
    return <LoadingCircle />;
  }

  if (summariesCount === 0) {
    return (
      <SummariesContainer>
        No fights to display
      </SummariesContainer>
    );
  }

  if (summariesCount) {
    if (summaries.length) {
      return (
        <SummariesContainer>
          <SeasonTitle>
            {summaries[0].sport_event.sport_event_context.season.name.replace(/\d{4}\s*$/, '')}
            {user && user.userID === 35 ? (
              <EditButton>
                <Link to={`/edit/${seasonID}`}>
                  Edit
                </Link>
              </EditButton>
            ) : (null)}
          </SeasonTitle>
          <div>{summaries[0].sport_event.venue.country_name}</div>
          <ArenaName>{createVenueLocation(summaries[0].sport_event.venue)}</ArenaName>
          <div>{moment(summaries[0].sport_event.start_time).format('hh:mm A MMM Do, YYYY')}</div>
          {isHistory && user ? <UsersVotesResults summaries={summaries} isCanceled={isCanceled} /> : null}
          <TotalPredictions summariesArray={summaries} />
          <Divider />
          {summaries.map((s, i) => (
            <SeasonSummaryItem
              key={s.id}
              {...props}
              id={s.id}
              index={i}
              seasonID={seasonID}
              competitors={s.sport_event.competitors}
              summaryOrder={s.s_order}
              canceled={isCanceled(s.sport_event_status)}
              weightClass={s.sport_event_status.weight_class}
              isDraw={s.sport_event_status.winner === 'draw'}
              winner={s.sport_event_status.winner_id || null}
              isHistory={isHistory}
              isDayBefore={isDayBefore}
              predictionID={s.prediction_id}
              predictedFighter={s.predicted_fighter}
              addPredictionHandler={addPredictionHandler}
              voteCount={s.votecount}
              markets={s.markets}
              plusMinusOdds={plusMinusOdds}
              winMethod={s.sport_event_status.method}
              finalRound={s.sport_event_status.final_round}
              finalRoundTime={s.sport_event_status.final_round_length}
            />
          ))
          }
        </SummariesContainer>
      );
    }
    const flattenedObjectSummaries = Object.values(summaries).reduce((a, b) => [...a, ...b]);
    const firstFight = flattenedObjectSummaries[0];
    // console.log(Object.values(summaries));
    return (
      <SummariesContainer>
        <SeasonTitle>
          {firstFight.sport_event.sport_event_context.season.name.replace(/\d{4}\s*$/, '')}
          {user && user.userID === 35 ? (
            <EditButton>
              <Link to={`/edit/${seasonID}`}>
                  Edit
              </Link>
            </EditButton>
          ) : (null)}
        </SeasonTitle>
        <div>{firstFight.sport_event.venue.country_name}</div>
        <ArenaName>{createVenueLocation(firstFight.sport_event.venue)}</ArenaName>
        <div>{moment(firstFight.sport_event.start_time).format('hh:mm A MMM Do, YYYY')}</div>
        {isHistory && user ? <UsersVotesResults summaries={flattenedObjectSummaries} isCanceled={isCanceled} /> : null}
        <TotalPredictions summariesArray={flattenedObjectSummaries} />
        <Divider />
        {
          possibleStages.map(stage => {
            if (summaries[stage]) {
              return (
                <div>
                  <StageText>
                    {stage.toUpperCase()}
                  </StageText>
                  {
                    summaries[stage].map((s, i) => (
                      <SeasonSummaryItem
                        key={s.id}
                        {...props}
                        id={s.id}
                        index={i}
                        seasonID={seasonID}
                        competitors={s.sport_event.competitors}
                        summaryOrder={s.s_order}
                        canceled={isCanceled(s.sport_event_status)}
                        weightClass={s.sport_event_status.weight_class}
                        isDraw={s.sport_event_status.winner === 'draw'}
                        winner={s.sport_event_status.winner_id || null}
                        isHistory={isHistory}
                        isDayBefore={isDayBefore}
                        predictionID={s.prediction_id}
                        predictedFighter={s.predicted_fighter}
                        addPredictionHandler={addPredictionHandler}
                        voteCount={s.votecount}
                        markets={s.markets}
                        plusMinusOdds={plusMinusOdds}
                        winMethod={s.sport_event_status.method}
                        finalRound={s.sport_event_status.final_round}
                        finalRoundTime={s.sport_event_status.final_round_length}
                      />
                    ))
                  }
                </div>
              );
            }
          })
        }
      </SummariesContainer>
    );
  }

  return (
    <SummariesContainer>
      Nothing to show here
    </SummariesContainer>
  );

}

const UsersVotesResults = (props) => {
  let nonCanceledFightLength = 0;
  let correctPredictions = 0;
  let totalPredictions = 0;
  props.summaries.forEach(sum => {
    if (!props.isCanceled(sum.sport_event_status)){
      nonCanceledFightLength += 1;
      if (sum.prediction_id) {
        totalPredictions += 1;
        const realWinnerID = sum.sport_event_status.winner_id;
        if (realWinnerID && sum.predicted_fighter === realWinnerID){
          correctPredictions += 1;
        }
      }
    }
  });
  return (
    <div>
      <Divider style={{maxWidth: '300px', margin: '2px auto'}}/>
      <div>Your Prediction Results</div>
      {correctPredictions}/{totalPredictions} on your predictions <span> out of {nonCanceledFightLength} fights</span>
    </div>
  );
};

const StageText = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;

const ArenaName = styled.div`
  font-style: italic;
`;

const OddsResultsContainer = styled.div`
  font-size: .92em;
`;

const EditButton = styled.div`
  position: absolute;
  right: 1rem;
  top: 0;
`;

const Divider = styled.div`
  border-bottom: 2px solid grey;
  width: 85%;
  margin: .3rem auto;
`;

const SeasonTitle = styled.div`
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  position: relative;
`;

const SummariesContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin: auto;
  max-width: 768px;
  padding: .5rem;
`;
