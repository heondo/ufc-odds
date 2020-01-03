import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user-context';
import axios from 'axios';
import Dropdown, {MenuItem} from '../components/Dropdown';
import { Button, ButtonGroup, ButtonToolbar } from '../components/Buttons';
import LoadingCircle from './loading-circle';

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
      newString = ['Lightweight', '155lbs'];
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

const fighterIDtoName = (fighter, competitors) => {
  for (let i of competitors) {
    if (i.id === fighter) {
      return convertName(i.name);
    }
  }
  return null;
};

const convertName = name => {
  const split = name.split(', ');
  return [split[1], split[0]].join(' ');
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
  const f1Percent = (f1Votes / totalVotes * 100).toFixed(0);
  const f2Percent = (f2Votes / totalVotes * 100).toFixed(0);

  return (
    <VoteContainer>
      <VoteDisplay>
        <VoteDisplay>
          <div>
            {f1Percent}%
            <MobileDisappear>({f1Votes}/{totalVotes})</MobileDisappear>
          </div>
        </VoteDisplay>
        <VoteBarContainer>
          <VoteCountBar percent={f1Percent} moreThan={f1Votes > f2Votes} direction="left" />
        </VoteBarContainer>
      </VoteDisplay>
      <div>
        Community Votes
      </div>
      <VoteDisplay>
      <VoteBarContainer>
        <VoteCountBar percent={f2Percent} moreThan={f1Votes < f2Votes} direction="right" />
      </VoteBarContainer>
        <VoteDisplay>
          <div>
            <MobileDisappear>({f2Votes}/{totalVotes})</MobileDisappear>
            {f2Percent}%
          </div>
        </VoteDisplay>
      </VoteDisplay>
    </VoteContainer>
  );
};

const PredictOnFighter = props => {

  const [selectedFighter, setSelectedFighter] = useState(null);

  if (props.isDayBefore) {
    return null;
  }
  return (
    <>
    <DropdownContainer>
      <Dropdown
        onSelect={(eventKey) => {
          setSelectedFighter(eventKey);
        }}
      >
        <Dropdown.Toggle
          btnStyle="flat"
        >
          {selectedFighter !== null ? convertName(props.competitors[selectedFighter].name) : 'Predict on your fighter'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <MenuItem
            eventKey={0}
              active={selectedFighter === 0}
          >
            {convertName(props.competitors[0].name)}
          </MenuItem>
          <MenuItem
            eventKey={1}
              active={selectedFighter === 1}
          >
            {convertName(props.competitors[1].name)}
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    </DropdownContainer>
      {
        selectedFighter !== null ? (
          <Button onClick={() => {
            props.submitPrediction(selectedFighter);
          }}>
            Submit
          </Button>
        ) : null
      }
    </>
  );
};

export default function SeasonSummaryItem(props){
  const [isPredicting, setIsPredicting] = useState(false);
  const weightClass = convertWeightClass(props.weightClass);

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
      if (insertResponse.data.success) {
        setIsPredicting(false);
        props.addPredictionHandler(props.index, insertResponse.data.id, fighterID);
      }
    }
    catch (err) {
      setIsPredicting(false);
      console.error(err);
    }
  };

  return (
    <SummaryContainer canceled={props.canceled}>
      <FightersContainer>
        <span>{convertName(props.competitors[0].name)}</span>
        {' vs '}
        <span>{convertName(props.competitors[1].name)}</span>
      </FightersContainer>
      <WeightClass>
        <em>{weightClass[0].toUpperCase()}</em> - {weightClass[1]}
      </WeightClass>
      <VoteComponent voteCount={props.voteCount} competitors={props.competitors} />
      {
        props.predictedFighter ? (
          <div>
            Your pick: {fighterIDtoName(props.predictedFighter, props.competitors)}
          </div>
        ) : isPredicting ? <MiniLoading />
        : (
              <PredictOnFighter
                isDayBefore={props.isDayBefore}
                competitors={props.competitors}
                submitPrediction={submitPrediction}
              />
            )
}
    </SummaryContainer>
  );
}

const DropdownContainer = styled.span`
  margin: auto .5rem auto auto;
`;

const VoteBarContainer = styled.div`
  width: 2.5rem;
  display: flex;
  align-items: center;
`;

const VoteCountBar = styled.span`
  display: inline-block;
  margin: auto 2px;
  height: 4px;
  width: ${props => `${props.percent / 40}rem`};
  background-color: ${props => props.moreThan ? 'green' : 'grey'};
  border-radius: ${props => props.direction === "left" ? '2px 0 0 2px' : '0 2px 2px 0'};
`;

const VoteDisplay = styled.div`
  display: flex;
  font-size: .9rem;
  /* flex-direction: row; */
  justify-content: center;
  align-items: center;
`;

const MobileDisappear = styled.span`
  margin: auto 2px;
  @media(max-width: 576px) {
    display: none;
  };
`;

const VoteContainer = styled.div`
  display: flex;
  justify-content: center;
  /* justify-content: space-between; */
`;

// const VotesContainer = styled.div`
//   display: flex;
//   flex-direction: center;
//   justify-content: center;
// `

const WeightClass = styled.div`
  font-size: .85rem;
`;

const FightersContainer = styled.div`
  font-size: 1.03rem;
`;

const SummaryContainer = styled.div`
  /* display: flex; */
  display: block;
  text-align: start;
  border: 1px solid grey;
  border-radius: 5px;
  margin: .2rem 0;
  /* justify-content: start; */
  padding: .3rem .7rem;
  text-decoration: ${props => props.canceled ? 'line-through' : null};
  @media(max-width: 767px) {
    font-size: .95em;
  }
`;

const MiniLoading = styled.div`
  border: 3px solid #f3f3f3 !important;
  position: absolute;
  border-top: 3px solid #3498db !important;
  height: 10px !important;
  width: 10px !important;
  border-radius: 50%;
  margin: auto;
  animation: spin .5s linear infinite;
`;

PredictOnFighter.propTypes = {
  isDayBefore: PropTypes.bool,
  competitors: PropTypes.array,
  submitPrediction: PropTypes.func
};


SeasonSummaryItem.propTypes = {
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
