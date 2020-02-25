import React, {useState} from 'react';
import SummaryPredictions from './summary-predictions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export default function AccountsSummaries(props) {
  const GeneratePredictionTotals = innerProps => {
    let correct = 0;
    let total = 0;
    if (innerProps.eventsArray) {
      innerProps.eventsArray.forEach(e => {
        if (e.predictedFighter === e.sportEventStatus.winner_id) {
          correct += 1;
        }
        total += 1;
      });
    }
    return (
      <div>
        {correct}/{total}
      </div>
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
          const {markets, sportEvent, sportEventStatus, predictedFighter} = p;
          const {competitors} = sportEvent;
          const {winner_id: winner} = sportEventStatus;
          const outcomes = markets ? markets[0].outcomes : null;
          const selectedFighterPerc = predictedFighter ? props.returnWinnerPercentage(predictedFighter, competitors, outcomes) : null; // can be winners odds
          const selectedFighterOdds = selectedFighterPerc ? props.plusMinusOdds(selectedFighterPerc) : null;
          const winningsIfWinner = winner ? props.calculateWinnings(props.returnWinnerPercentage(winner, competitors, outcomes)) : null;
          console.log(selectedFighterPerc, selectedFighterOdds, winningsIfWinner)
          return (
            <SummaryPredictions
              key={p.summaryID}
              competitors={competitors}
              predictedFighter={p.predictedFighter}
              winner={winner}
              selectedFighterPerc={selectedFighterPerc}
              selectedFighterOdds={selectedFighterOdds}
              winningsIfWinner={winningsIfWinner}
              // markets={p.markets ? p.markets[0].outcomes : null}
            />
          );
        })
      ) : (
        null
      )}
    </SeasonsContainer>
  );
}

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
  plusMinusOdds: PropTypes.func
};
