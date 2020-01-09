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

const betAmount = 100;

const isCanceled = statusObject => {
  return (!!(statusObject.status === 'closed' && statusObject.match_status === 'cancelled'));
};

export default function SeasonPage(props) {
  const { id: seasonID } = props.match.params;
  const [summaries, setSummaries] = useState(null);
  const [summariesCount, setSummariesCount] = useState(null);
  const [isEnded, setIsEnded] = useState(null);
  const possibleStages = ['Main Card', 'Prelims', 'Early Prelims'];
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getSeasonData();
  }, []);

  const getSeasonData = async () => {
    try {
      const response = await axios.get(`/api/seasons/${seasonID}`);
      setIsEnded(response.data.isEnded);
      setSummaries(response.data.summaries);
      setSummariesCount(response.data.summariesCount);
    }
    catch(err){
      // console.log(Object.keys(err));
      // if (err.response.data.message === "No data available")
      setIsEnded(false);
      setSummaries([]);
      setSummariesCount(0);
      console.log(err.response.data.message);
    }
  };

  const currentDate = new Date();
  // const seasonDate = summaries && summaries.length ? new Date(summaries[0].sport_event.start_time) : null;
  let seasonDate;
  if (summaries) {
    if (summariesCount && summaries.length) {
      seasonDate = new Date(summaries[0].sport_event.start_time);
    }
    else if (summariesCount && summaries['Main Card']) {
      seasonDate = new Date(summaries['Main Card'][0].sport_event.start_time);
    }
  }

  const isDayBefore = (seasonDate - currentDate) / 1000 < 86400;


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

  const returnFighterWinnings = (bet, winner, competitors, outcomes) => {
    const winnerPercentage = returnWinnerPercentage(winner, competitors, outcomes);
    const payout =  calculateWinnings(winnerPercentage);
    return payout;
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

  const createVenueLocation = venue => {
    const venueString = `${venue.name}`;
    //  - ${venue.city_name}, ${venue.country_name}`;
    return venueString;
  };

  const addPredictionHandler = (index, predictionID, fighterID, stage) => {
    let voteCount;
    if (stage) {
      const {votecount} = summaries[stage][index];
      voteCount = votecount;
    } else {
      const { votecount } = summaries[index];
      voteCount = votecount;
    }
    if (!voteCount || !voteCount[fighterID]) {
      voteCount = {
        ...voteCount,
        [fighterID]: 0
      };
    }
    voteCount[fighterID] += 1;
    let newSummaries;
    if (stage) {
      newSummaries = update(summaries, {
        [stage]: {
          [index]: {
            prediction_id: { $set: predictionID },
            predicted_fighter: { $set: fighterID },
            votecount: { $set: voteCount }
          }
        }
      });
    }
    else {
      newSummaries = update(summaries, {
        [index]: {
          prediction_id: { $set: predictionID },
          predicted_fighter: { $set: fighterID },
          votecount: { $set: voteCount }
        }
      });
    }
    setSummaries(newSummaries);
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
          <div>{summaries[0].sport_event.venue ? summaries[0].sport_event.venue.country_name : null}</div>
          <ArenaName>{createVenueLocation(summaries[0].sport_event.venue)}</ArenaName>
          <div>{moment(summaries[0].sport_event.start_time).format('hh:mm A MMM Do, YYYY')}</div>
          {isEnded && user ? <UsersVotesResults summaries={summaries} isCanceled={isCanceled} /> : null}
          <TotalPredictions returnFighterWinnings={returnFighterWinnings} isEnded={isEnded} summariesArray={summaries} />
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
              scheduledRounds={s.sport_event_status.scheduled_length}
              canceled={isCanceled(s.sport_event_status)}
              weightClass={s.sport_event_status.weight_class}
              isDraw={s.sport_event_status.winner === 'draw'}
              winner={s.sport_event_status.winner_id || null}
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
        <div>{firstFight.sport_event.venue ? firstFight.sport_event.venue.country_name : null}</div>
        <ArenaName>{createVenueLocation(firstFight.sport_event.venue)}</ArenaName>
        <div>{moment(firstFight.sport_event.start_time).format('hh:mm A MMM Do, YYYY')}</div>
        <TotalPredictions returnFighterWinnings={returnFighterWinnings} isEnded={isEnded} summariesArray={flattenedObjectSummaries} />
        <Divider />
        {
          possibleStages.map((stage, i) => {
            if (summaries[stage]) {
              return (
                <div key={`${stage}-i`}>
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
                        stage={stage}
                        seasonID={seasonID}
                        scheduledRounds={s.sport_event_status.scheduled_length}
                        competitors={s.sport_event.competitors}
                        summaryOrder={s.s_order}
                        canceled={isCanceled(s.sport_event_status)}
                        weightClass={s.sport_event_status.weight_class}
                        isDraw={s.sport_event_status.winner === 'draw'}
                        winner={s.sport_event_status.winner_id || null}
                        isDayBefore={isDayBefore}
                        predictionID={s.prediction_id}
                        predictedFighter={s.predicted_fighter}
                        addPredictionHandler={addPredictionHandler}
                        voteCount={s.votecount}
                        statistics={s.statistics}
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



const TotalPredictions = ({ summariesArray, isEnded, returnFighterWinnings }) => {
  const iteratePredictions = (summArray) => {
    const stats = {
      correctPredictions: 0,
      totalPredictions: 0,
      totalFights: 0,
      winningAmount: 0,
      totalMoneyIn: 0
    };
    for (let fight of summArray) {
      // if (fight.predictedFighter)
      if (isCanceled(fight.sport_event_status)) {
        continue;
      }
      if (fight.predicted_fighter) {
        stats.totalPredictions += 1;
        stats.totalMoneyIn += betAmount;
        if (fight.predicted_fighter === fight.sport_event_status.winner_id) {
          stats.correctPredictions += 1;
          const outcomes = fight.markets ? fight.markets[0].outcomes : null;
          stats.winningAmount += returnFighterWinnings(betAmount, fight.sport_event_status.winner_id, fight.sport_event.competitors, outcomes);
        }
      }
      stats.totalFights += 1;
    }
    return {
      ...stats,
      winningAmount: stats.winningAmount.toFixed(2)
    };
  };

  const stats = iteratePredictions(summariesArray);

  if (!isEnded) {
    return (
      <div>
        <Divider />
        <OddsResultsContainer>
          Predicted on {stats.totalPredictions || 0}/{stats.totalFights || 0} fights
        </OddsResultsContainer>
      </div>
    );
  }

  if (!stats.totalPredictions) {
    return null;
  }

  return (
    <div>
      <Divider />
      <OddsResultsContainer>
        On {stats.correctPredictions || 0}/{stats.totalPredictions || 0} predictions ({stats.totalFights ||0} total fights) your purse at the end
        of the night is ${stats.winningAmount} from ${stats.totalMoneyIn} put in.
      </OddsResultsContainer>
    </div>
  );
};

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
  max-width: 576px;
  padding: .5rem;
`;
