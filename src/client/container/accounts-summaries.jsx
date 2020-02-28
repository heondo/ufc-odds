import React, {useState} from 'react';
import SummaryPredictions from './summary-predictions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export default function AccountsSummaries(props) {
  const selectedOddsAndWinnings = (event) => {
    const {markets, sportEvent, sportEventStatus, predictedFighter} = event;
          const {competitors} = sportEvent;
          const outcomes = markets ? markets[0].outcomes : null;
          const selectedFighterPerc = predictedFighter ? props.returnWinnerPercentage(predictedFighter, competitors, outcomes) : null; // can be winners odds
          const selectedFighterOdds = selectedFighterPerc ? props.plusMinusOdds(selectedFighterPerc) : null;
          const selectedFighterWinnings = predictedFighter ? props.calculateWinnings(props.returnWinnerPercentage(predictedFighter, competitors, outcomes)) : null;
          return [selectedFighterOdds, selectedFighterWinnings];
  }

  const GeneratePredictionTotals = innerProps => {
    let correct = 0;
    let total = 0;
    let totalWinnings = null;
    if (innerProps.eventsArray) {
      innerProps.eventsArray.forEach(e => {
        const [selectedFighterOdds, selectedFighterWinnings] = selectedOddsAndWinnings(e);
        if (e.sportEventStatus.winner_id) {
          if (e.predictedFighter === e.sportEventStatus.winner_id) {
            correct += 1;
            totalWinnings += selectedFighterWinnings - props.betAmount;
          } else {
            totalWinnings -= props.betAmount;
          }
        }
        total += 1;
      });
    };

    if (totalWinnings) {
      if (totalWinnings > 0) {
        totalWinnings = `+$${totalWinnings.toFixed(2)}`
      } else {
        totalWinnings = `-$${totalWinnings.toFixed(2)}`
      }
    }
    return (
      <BetTotals>
        <span>{correct}/{total}</span>
        <span>{totalWinnings ? totalWinnings : null}</span>
      </BetTotals>
    );
  };

  return (
    <SeasonsContainer>
      <SeasonName>
        <Link to={`/season/${props.id}`}>
          {props.name}
        </Link>
      </SeasonName>
      <GeneratePredictionTotals eventsArray={props.eventsArray}/>
      {props.eventsArray ? (
        props.eventsArray.map(p => {
          const [selectedFighterOdds, winningsIfWinner] = selectedOddsAndWinnings(p);
          const {sportEvent, sportEventStatus} = p;
          const {competitors} = sportEvent;
          const {winner_id: winner} = sportEventStatus;
          return (
            <SummaryPredictions
              key={p.summaryID}
              competitors={competitors}
              predictedFighter={p.predictedFighter}
              winner={winner}
              selectedFighterOdds={selectedFighterOdds}
              winningsIfWinner={winningsIfWinner}
              betAmount={props.betAmount}
            />
          );
        })
      ) : (
        null
      )}
    </SeasonsContainer>
  );
}

const BetTotals = styled.div`
  display: flex;
  span {
    margin-right: .5rem;
  }
`


const SeasonName = styled.div`
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const SeasonsContainer = styled.div`
`;

AccountsSummaries.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  startDate: PropTypes.string,
  eventsArray: PropTypes.array,
  returnWinnerPercentage:PropTypes.func,
  calculateWinnings:PropTypes.func,
  plusMinusOdds: PropTypes.func,
  betAmount: PropTypes.number
};
