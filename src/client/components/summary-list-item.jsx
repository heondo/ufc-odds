import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user-context';
import axios from 'axios';
// import LoadingCircle from '../container/loading-circle';

const ResultContainer = styled.span`
    margin-right: ${props => props.leftRight === 'l' ? '.5rem' : null};
    color: ${props => props.winStatus === 'W' ? 'darkgreen' : 'darkred'}
    margin-left: ${props => props.leftRight === 'r' ? '.5rem' : null};
    /* border: 3px solid ${props => props.winStatus === 'W' ? 'darkgreen' : 'darkred'}; */
  `;

const convertWeightClass = weightClass => {
  const charsOnly = weightClass.match(/[a-z_]+/)[0];
  let newString;
  switch (charsOnly) {
    case 'bantamweight':
      newString = ['BW', '135lbs'];
      break;
    case 'featherweight':
      newString = ['FW', '145lbs'];
      break;
    case 'lightweight':
      newString = ['LW', '155lbs'];
      break;
    case 'welterweight':
      newString = ['WW', '170lbs'];
      break;
    case 'light_heavyweight':
      newString = ['LHW', '205lbs'];
      break;
    case 'middleweight':
      newString = ['MW', '185lbs'];
      break;
    case 'heavyweight':
      newString = ['HW', '265lbs'];
      break;
    case 'flyweight':
      newString = ['FLW', '125lbs'];
      break;
    case 'strawweight':
      newString = ['SW', '115lbs'];
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
    )
  }
  const totalVotes = Object.values(props.voteCount).reduce((a, b) => a + b) || 0;
  const f1Votes = props.voteCount[props.competitors[0].id] || 0;
  const f2Votes = props.voteCount[props.competitors[1].id] || 0;
  const f1Percent = (f1Votes/totalVotes*100).toFixed(0)
  const f2Percent = (f2Votes/totalVotes * 100).toFixed(0)
  return (
    <VoteContainer>
      <VoteDisplay>
        <VoteCountBar percent={f1Percent} moreThan={f1Votes > f2Votes}/>
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
        <VoteCountBar percent={f2Percent} moreThan={f1Votes < f2Votes}/>
      </VoteDisplay>
    </VoteContainer>
  )
}

export default function SummaryListItem(props) {
  const [isPredicting, setIsPredicting] = useState(false);
  const convertName = name => {
    const split = name.split(', ');
    return [split[1], split[0]].join(' ');
  };

  const { user } = useContext(UserContext);

  const submitPrediction = async index => {
    setIsPredicting(true)
    const fighterID = props.competitors[index].id;
    // necessary things for the database. its own predictionID, summaryID, seasonsID, fighterID,
    try {
      const insertResponse = await axios.post('/api/summaries/predict', {
        seasonID: props.seasonID,
        summaryID: props.id,
        fighterID: props.competitors[index].id
      })
      if (insertResponse.data.success)  {
        setIsPredicting(false)
        props.addPredictionHandler(props.index, insertResponse.data.id, fighterID)
      }
    }
    catch (err) {
      setIsPredicting(false);
      console.error(err)
    }
  };

  const weightArray = convertWeightClass(props.weightClass);

  const PredictButton = (innerProps) => {
    if (!user) {
      return null;
    }
    if (isPredicting) {
      return <MiniLoading />
    }
    const isYourWinner = props.predictedFighter === props.competitors[innerProps.index].id
    if (props.isDayBefore) {
      if (props.predictedFighter) {
        return (
          <PredictButtonContainer isYourWinner={isYourWinner}>
            {isYourWinner ? 'Your winner' : 'Your loser'}
          </PredictButtonContainer>
        )
      }
      return null;
      // (
      //   <PredictButtonContainer>
      //     Too late
      //   </PredictButtonContainer>
      // )
    }
    if (!props.canceled && !props.isHistory) {
      if (props.predictedFighter) {
        return (
          <PredictButtonContainer isYourWinner={isYourWinner}>
            {isYourWinner ? 'Your winner': 'Your loser'}
          </PredictButtonContainer>
        )
      }
      return (
        <PredictButtonContainer onClick={() => submitPrediction(innerProps.index)}>
          Predict
        </PredictButtonContainer>
      )
    }
    return null;
  }

  const correctPrediction = (fighter) => {
    if (props.predictedFighter && props.winner) {
      if (props.predictedFighter === fighter){
        return 'lightgreen';
      }
      return 'pink';
    }
    return 'white'
  }

  return (
    <SummaryContainer canceled={props.canceled}>
      <FighterOne correctPrediction={correctPrediction(props.competitors[0].id)} predictedFighter={props.predictedFighter} winner={props.winner} fighter={props.competitors[0].id}>
        <div>
          {props.isHistory ? <WinnerLoser winner={props.winner} competitors={props.competitors} leftRight="l"/> : null}
          {convertName(props.competitors[0].name)}
        </div>
        <PredictButton index={0}>
          Predict
        </PredictButton>
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
      </Middle>
      <FighterTwo correctPrediction={correctPrediction(props.competitors[1].id)} winner={props.winner} fighter={props.competitors[1].id}>
        <div>
          {convertName(props.competitors[1].name)}
          {props.isHistory ? <WinnerLoser winner={props.winner} competitors={props.competitors} leftRight="r"/> : null}
        </div>
        <PredictButton index={1} />
      </FighterTwo>
    </SummaryContainer>
  );
}

const VoteDisplay = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  align-items: center;
`

const MobileDisappear = styled.span`
  margin: auto 2px;
  @media(max-width: 576px) {
    display: none;
  }
`

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
`

const PredictButtonContainer = styled.button`
  max-width: 7rem;
  margin: .2rem auto;
  border-radius: 3px;
  background-color: ${props => props.isYourWinner === true ? 'lightgreen' : props.isYourWinner === false ? 'rgb(247, 148, 148)' : 'default'};
  padding: ${props => props.isYourWinner === true || props.isYourWinner === false ? '.3rem': '.3rem'};
  border: ${props => props.isYourWinner === true ? '1px solid green' : props.isYourWinner === false ? '1px solid red' : '1px solid grey'};
  @media(max-width: 576px){
    font-size: .75em;
  }
`;

const PoundsContainer = styled.span`
  @media (max-width: 576px) {
    display: none;
  }
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
  border: ${props => props.winner === props.fighter ? '2px solid darkgreen' : !props.winner ? null : '2px solid darkred'};
  background-color: ${props => props.correctPrediction};
  font-size: .95em;
  width: 37.5%
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VoteCountBar = styled.span`
  display: inline-block;
  margin: auto 2px;
  height: 3px;
  width: ${props => `${props.percent/40}rem`};
  background-color: ${props => props.moreThan ? 'green' : 'grey'};
`//${props => props.moreThan ? 'green' : 'grey'};

const FighterOne = styled(Fighter)`
`;

const FighterTwo = styled(Fighter)`
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
  border: 3px solid #f3f3f3 !important; /* Light grey */
  border-top: 3px solid #3498db !important; /* Blue */
  width: 10px !important;
  height: 10px !important;
  border-radius: 50%;
  margin: auto;
  animation: spin .5s linear infinite;
`

SummaryListItem.propTypes = {
  id: PropTypes.string,
  seasonID: PropTypes.string,
  index: PropTypes.number,
  competitors: PropTypes.array,
  summaryOrder: PropTypes.number,
  canceled: PropTypes.bool,
  weightClass: PropTypes.string,
  isHistory: PropTypes.bool,
  winner: PropTypes.string,
  predictionID: PropTypes.number,
  predictedFighter: PropTypes.string,
  seasonDate: PropTypes.object,
  addPredictionHandler: PropTypes.func,
  voteCount: PropTypes.object
};
