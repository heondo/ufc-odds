import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../context/theme-context';

const convertName = name => {
  const split = name.split(', ');
  return [split[1], split[0]].join(' ');
};

export default function SummaryPredictions(props){
  // so for this page, if there is a markets object I want to see if the user got it right. Calculate the winnings and display
  // given winner id, predicted fighter ID, match indeces for it and use market functions from before

  const PotentialWinnings = () => {
    let text;
    let color = null;
    if (!props.winner) {
      text = props.selectedFighterOdds;
    }
    else if (props.predictedFighter === props.winner) {
      color = 'correct'
      text = '+' + props.winningsIfWinner.toFixed(2)
    } else {
      color = 'incorrect'
      text = '-' + props.betAmount.toFixed(2);
    }
    return (
      <div className={`winnings ${color}`}>
        {
          text
        }
      </div>
    )
  }


  return (
    <SummaryContainer>
      <FighterNames>
        <FighterOne winner={props.winner} competitorID={props.competitors[0].id} predictedFighter={props.predictedFighter}>
          {convertName(props.competitors[0].name)}
        </FighterOne>
        <Middle> - </Middle>
        <FighterTwo winner={props.winner} competitorID={props.competitors[1].id} predictedFighter={props.predictedFighter}>
          {convertName(props.competitors[1].name)}
        </FighterTwo>
      </FighterNames>
      <PotentialWinnings></PotentialWinnings>
    </SummaryContainer>
  );
}

const Middle = styled.div`
  width: 5%;
`;

const Fighter = styled.div`
  /* border: ${props => props.winner ? props.winner === props.competitorID ? ' 1px solid #498a77;' : '1px solid #bd6574' : 'none'}; */
  text-decoration: ${props => props.predictedFighter === props.competitorID ? 'underline' : null};
  font-weight: ${props => props.predictedFighter === props.competitorID ? '600' : 'inherit'};
  width: 47.5%;
  padding: .2rem;
`;

const FighterOne = styled(Fighter)`
  text-align: start;
`;

const FighterTwo = styled(Fighter)`
  text-align: end;
`;

const FighterNames = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  /* justify-content: space-between; */
`;

const SummaryContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  /* justify-content: center; */
  margin: .2rem auto;
  @media(max-width: 767px) {
    font-size: .95em;
  }
  .correct {
    color: ${colors.s2Col3};
  }

  .incorrect {
    color: ${colors.pCol0};
  }

  .winnings {
    margin-left: .5rem;
  }
`;

SummaryPredictions.propTypes = {
  competitors: PropTypes.array,
  predictedFighter: PropTypes.string,
  winner: PropTypes.string,
  selectedFighterOdds:PropTypes.string,
  winningsIfWinner:PropTypes.number,
  betAmount: PropTypes.number
};
