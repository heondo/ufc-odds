import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user-context';
import axios from 'axios';

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

export default function SummaryListItem(props) {
  // const [isPredicting, setIsPredicting] = useState(false);
  const convertName = name => {
    const split = name.split(', ');
    return [split[1], split[0]].join(' ');
  };

  const { user } = useContext(UserContext);

  const submitPrediction = async index => {
    // setIsPredicting(true)
    const fighterID = props.competitors[index].id;
    // necessary things for the database. its own predictionID, summaryID, seasonsID, fighterID,
    try {
      const insertResponse = await axios.post('/api/summaries/predict', {
        seasonID: props.seasonID,
        summaryID: props.id,
        fighterID: props.competitors[index].id
      })
      if (insertResponse.data.success)  {
        // setIsPredicting(false)
        props.addPredictionHandler(props.index, insertResponse.data.id, fighterID)
      }
    }
    catch (err) {
      // setIsPredicting(false);
      console.error(err)
    }
  };

  const weightArray = convertWeightClass(props.weightClass);

  const PredictButton = (innerProps) => {
    if (!user) {
      return null;
    }
    if (props.isDayBefore) {
      if (props.predictedFighter) {
        return (
          <PredictButtonContainer>
            {props.predictedFighter === props.competitors[innerProps.index].id ? 'Your winner' : 'Your loser'}
          </PredictButtonContainer>
        )
      }
      return (
        <PredictButtonContainer>
          Too late
        </PredictButtonContainer>
      )
    }
    if (!props.canceled && !props.isHistory) {
      if (props.predictedFighter) {
        return (
          <PredictButtonContainer>
            {props.predictedFighter === props.competitors[innerProps.index].id ? 'Your winner': 'Your loser'}
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

  return (
    <SummaryContainer canceled={props.canceled}>
      <FighterOne winner={props.winner} fighter={props.competitors[0].id}>
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
      </Middle>
      <FighterTwo winner={props.winner} fighter={props.competitors[1].id}>
        <div>
          {convertName(props.competitors[1].name)}
          {props.isHistory ? <WinnerLoser winner={props.winner} competitors={props.competitors} leftRight="r"/> : null}
        </div>
        <PredictButton index={1} />
      </FighterTwo>
    </SummaryContainer>
  );
}

const PredictButtonContainer = styled.button`
  max-width: 7rem;
  padding: .3rem;
`;

const PoundsContainer = styled.span`
  @media (max-width: 576px) {
    display: none;
  }
`;

const Middle = styled.div`
  font-size: .85em;
  width: 15%;
  margin: auto;
`;

const Fighter = styled.div`
  border: ${props => props.winner === props.fighter ? '2px solid darkgreen' : !props.winner ? null : '2px solid darkred'};
  font-size: .95em;
  width: 42.5%
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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
