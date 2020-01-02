import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user-context';
import axios from 'axios';

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
    )
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
          <div>{f1Percent}% ({f1Votes}/{totalVotes}) </div>
        </VoteDisplay>
        <VoteCountBar percent={f1Percent} moreThan={f1Votes > f2Votes} direction="left" />
      </VoteDisplay>
      <div>
        Community Votes
      </div>
      <VoteDisplay>
      <VoteCountBar percent={f2Percent} moreThan={f1Votes < f2Votes} direction="right" />
        <VoteDisplay>
          <div> ({f2Votes}/{totalVotes}) {f2Percent}%</div>
        </VoteDisplay>
      </VoteDisplay>
    </VoteContainer>
  )
}

export default function SeasonSummaryItem(props){
  const weightClass = convertWeightClass(props.weightClass);

  return (
    <SummaryContainer canceled={props.canceled}>
      <FightersContainer>
        <span>{convertName(props.competitors[0].name)}</span>
        {' vs '}
        <span>{convertName(props.competitors[1].name)}</span>
      </FightersContainer>
      <WeightClass>
        {weightClass[0].toUpperCase()} - {weightClass[1]}
      </WeightClass>
      <VoteComponent voteCount={props.voteCount} competitors={props.competitors} />
    </SummaryContainer>
  )
}

const VoteCountBar = styled.span`
  display: inline-block;
  margin: auto 2px;
  height: 4px;
  width: ${props => `${props.percent / 40}rem`};
  background-color: ${props => props.moreThan ? 'green' : 'grey'};
  border-radius: ${props => props.direction === "left" ? '2px 0 0 2px' : '0 2px 2px 0'};
`

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
  justify-content: center;
  /* justify-content: space-between; */
`

// const VotesContainer = styled.div`
//   display: flex;
//   flex-direction: center;
//   justify-content: center;
// `

const WeightClass = styled.div`
  font-size: .85rem;
`

const FightersContainer = styled.div`
  font-size: 1.03rem;
`

const SummaryContainer = styled.div`
  /* display: flex; */
  display: block;
  text-align: start;
  /* justify-content: start; */
  padding: .3rem .7rem;
  text-decoration: ${props => props.canceled ? 'line-through' : null};
  @media(max-width: 767px) {
    font-size: .95em;
  }
`;


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
