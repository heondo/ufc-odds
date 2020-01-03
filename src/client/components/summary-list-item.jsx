import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user-context';
import axios from 'axios';

const ResultContainer = styled.span`
    margin-right: ${props => props.leftRight === 'l' ? '.5rem' : null};
    color: ${props => props.winStatus === 'W' ? 'darkgreen' : 'darkred'}
    margin-left: ${props => props.leftRight === 'r' ? '.5rem' : null};
  `;

const convertWeightClass = weightClass => {
  const charsOnly = weightClass.match(/[a-z_]+/)[0];
  let newString;
  switch (charsOnly) {
    case 'bantamweight':
      newString = ['Bantamweight', '135lbs'];
      break;
    case 'featherweight':
      newString = ['Featherweight', '145lbs'];
      break;
    case 'lightweight':
      newString = ['Lighweight', '155lbs'];
      break;
    case 'welterweight':
      newString = ['Welterweight', '170lbs'];
      break;
    case 'light_heavyweight':
      newString = ['Light Heavyweight', '205lbs'];
      break;
    case 'middleweight':
      newString = ['Middleweight', '185lbs'];
      break;
    case 'heavyweight':
      newString = ['Heavyweight', '265lbs'];
      break;
    case 'flyweight':
      newString = ['Flyweight', '125lbs'];
      break;
    case 'strawweight':
      newString = ['Strawweight', '115lbs'];
      break;
  }
  return newString;
};

const WinnerLoser = props => {
  const { winner, competitors, leftRight } = props;
  const winStatus = !winner ? null : (winner && winner === competitors[props.leftRight === 'l' ? 0 : 1].id) ? 'W' : 'L';
  return (
    <ResultContainer leftRight={leftRight} winStatus={winStatus}>
      {winStatus}
    </ResultContainer>
  );
};

const VoteComponent = props => {
  if (!props.voteCount) {
    return (
      <div>
        No votes
      </div>
    );
  }
  const totalVotes = Object.values(props.voteCount).reduce((a, b) => a + b) || 0;
  const f1Votes = props.voteCount[props.competitors[0].id] || 0;
  const f2Votes = props.voteCount[props.competitors[1].id] || 0;
  const f1Percent = (f1Votes/totalVotes*100).toFixed(0);
  const f2Percent = (f2Votes/totalVotes * 100).toFixed(0);
  return (
    <VoteContainer>
      <VoteDisplay>
        <VoteCountBar percent={f1Percent} moreThan={f1Votes > f2Votes} direction="left"/>
        <VoteDisplay>
          <div> ({f1Votes}/{totalVotes}) </div>
          <MobileDisappear>
            {f1Percent}%
          </MobileDisappear>
        </VoteDisplay>
      </VoteDisplay>
      <VoteDisplay>
        <VoteDisplay>
          <MobileDisappear>
            {f2Percent}%
          </MobileDisappear>
          <div> ({f2Votes}/{totalVotes}) </div>
        </VoteDisplay>
        <VoteCountBar percent={f2Percent} moreThan={f1Votes < f2Votes} direction="right"/>
      </VoteDisplay>
    </VoteContainer>
  );
};

export default function SummaryListItem(props) {
  const [isPredicting, setIsPredicting] = useState(false);
  const convertName = name => {
    const split = name.split(', ');
    return [split[1], split[0]].join(' ');
  };

  const { user } = useContext(UserContext);

  const submitPrediction = async index => {
    setIsPredicting(true);
    const fighterID = props.competitors[index].id;
    // necessary things for the database. its own predictionID, summaryID, seasonsID, fighterID,
    try {
      const insertResponse = await axios.post('/api/summaries/predict', {
        seasonID: props.seasonID,
        summaryID: props.id,
        fighterID: props.competitors[index].id
      });
      if (insertResponse.data.success)  {
        setIsPredicting(false);
        props.addPredictionHandler(props.index, insertResponse.data.id, fighterID);
      }
    }
    catch (err) {
      setIsPredicting(false);
      console.error(err);
    }
  };

  const convertDecision = decision => {
    switch(decision) {
      case 'ko_tko':
        return 'KO/TKO';
      case 'decision_unanimous':
        return 'UD';
      case 'decision_split':
        return 'SD';
      case 'submission':
        return 'SUB';
    }
  };

  const weightArray = convertWeightClass(props.weightClass);

  const PredictButton = (innerProps) => {
    if (!user) {
      return null;
    }
    if (isPredicting) {
      return <MiniLoading />;
    }
    const isYourWinner = props.predictedFighter === props.competitors[innerProps.index].id;
    if (props.isDayBefore) {
      if (props.predictedFighter) {
        return (
          <PredictButtonContainer isYourWinner={isYourWinner}>
            {isYourWinner ? 'Your winner' : 'Your loser'}
          </PredictButtonContainer>
        );
      }
      return null;
    }
    if (!props.canceled && !props.isHistory) {
      if (props.predictedFighter) {
        return (
          <PredictButtonContainer isYourWinner={isYourWinner}>
            {isYourWinner ? 'Your winner': 'Your loser'}
          </PredictButtonContainer>
        );
      }
      return (
        <PredictButtonContainer onClick={() => submitPrediction(innerProps.index)}>
          Predict
        </PredictButtonContainer>
      );
    }
    return null;
  };

  const correctPredictionColor = (fighter) => {
    if (props.isDraw) {
      return 'yellow';
    }
    if (props.winner) {
      if (props.winner === fighter){
        return '#c5e0d8';
      }
      return '#ceabb1';
    }
    return 'white';
  };


  return (
    <SummaryContainer canceled={props.canceled}>
      <FighterOne correctPredictionColor={correctPredictionColor(props.competitors[0].id)} predictedFighter={props.predictedFighter} winner={props.winner} fighter={props.competitors[0].id}>
        <div>
          {props.isHistory && props.winner ? <WinnerLoser winner={props.winner} competitors={props.competitors} leftRight="l"/> : null}
          {convertName(props.competitors[0].name)}
        </div>
        <OddsContainer>
          {props.markets ? props.plusMinusOdds(props.markets[0].outcomes[0].probability) : null}
        </OddsContainer>
        <PredictButton index={0} />
        {props.isHistory && props.winner ? (
          <div>
            via {convertDecision(props.winMethod)} in {props.finalRoundTime} round {props.finalRound}
          </div>
        ) : null}
      </FighterOne>
      <Middle>
        <div>
          <span>
            {weightArray[0]}
          </span>
          <PoundsContainer>
            {` - ` + weightArray[1]}
          </PoundsContainer>
        </div>
        <VoteComponent voteCount={props.voteCount} competitors={props.competitors} />
        <div>
          {props.finalRound ? 'RD:' : null} {props.finalRound} {props.finalRoundTime}
        </div>
        <PredictionResult winner={props.winner} predictedFighter={props.predictedFighter} >
          {
            props.winner ? props.predictedFighter === props.winner ? "Correct" : "Incorrect" : null
          }
        </PredictionResult>
      </Middle>
      <FighterTwo correctPredictionColor={correctPredictionColor(props.competitors[1].id)} winner={props.winner} fighter={props.competitors[1].id}>
        <div>
          {convertName(props.competitors[1].name)}
          {props.isHistory && props.winner ? <WinnerLoser winner={props.winner} competitors={props.competitors} leftRight="r"/> : null}
        </div>
        <OddsContainer>
          {props.markets ? props.plusMinusOdds(props.markets[0].outcomes[1].probability): null}
        </OddsContainer>
        <PredictButton index={1} />
        {props.isHistory && props.winner ? (
          <div>
            via {convertDecision(props.winMethod)} in {props.finalRoundTime} round {props.finalRound}
          </div>
        ) : null}
      </FighterTwo>
    </SummaryContainer>
  );
}

const VoteDisplay = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  align-items: center;
`;

const MobileDisappear = styled.span`
  margin: auto 2px;
  @media(max-width: 576px) {
    display: none;
  }
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PredictButtonContainer = styled.button`
  max-width: 7rem;
  margin: .2rem auto;
  border-radius: 3px;
  background-color: ${props => props.isYourWinner === true ? '#c5e0d8' : props.isYourWinner === false ? '#ceabb1' : 'default'};
  padding: ${props => props.isYourWinner === true || props.isYourWinner === false ? '.3rem': '.3rem'};
  border: 1px solid black;
  border-radius: 4px;
  @media(max-width: 576px){
    font-size: .80em;
  }
`;

const PoundsContainer = styled.span`
  @media (max-width: 576px) {
    display: none;
  }
`;

const OddsContainer = styled.div`
  font-size: .82em;
`;

const PredictionResult = styled.div`
  color: ${props => props.winner === props.predictedFighter ? 'green' : 'red'};
  display: ${props => props.winner ? 'block' :'none'};
  font-size: 1.05rem;
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: .78em;
  width: 25%;
  margin: auto;
`;

const Fighter = styled.div`
  padding: .5rem;
  /* background-color: ${props => props.correctPredictionColor}; */
  font-size: 1em;
  width: 37.5%
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VoteCountBar = styled.span`
  display: inline-block;
  margin: auto 2px;
  height: 4px;
  width: ${props => `${props.percent/40}rem`};
  background-color: ${props => props.moreThan ? 'green' : 'grey'};
  border-radius: ${props => props.direction === "left" ? '2px 0 0 2px': '0 2px 2px 0'};
`;

const FighterOne = styled(Fighter)`
  border-radius: 8px 25px;
`;

const FighterTwo = styled(Fighter)`
  border-radius: 25px 8px;
`;

const SummaryContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  padding: .3rem .7rem;
  text-decoration: ${props => props.canceled ? 'line-through' : null};
  @media(max-width: 767px) {
    font-size: .95em;
  }
`;

const MiniLoading = styled.div`
  border: 3px solid #f3f3f3 !important;
  border-top: 3px solid #3498db !important;
  height: 10px !important;
  border-radius: 50%;
  margin: auto;
  animation: spin .5s linear infinite;
`;

SummaryListItem.propTypes = {
  id: PropTypes.string,
  seasonID: PropTypes.string,
  index: PropTypes.number,
  competitors: PropTypes.array,
  summaryOrder: PropTypes.number,
  canceled: PropTypes.bool,
  weightClass: PropTypes.string,
  isDraw: PropTypes.bool,
  isHistory: PropTypes.bool,
  isDayBefore: PropTypes.bool,
  winner: PropTypes.string,
  predictionID: PropTypes.number,
  predictedFighter: PropTypes.string,
  seasonDate: PropTypes.object,
  addPredictionHandler: PropTypes.func,
  voteCount: PropTypes.object,
  markets: PropTypes.array,
  plusMinusOdds: PropTypes.func,
  winMethod: PropTypes.string,
  finalRound: PropTypes.number,
  finalRoundTime: PropTypes.string
};
