import React, {useState} from 'react';
import SummaryPredictions from './summary-predictions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export default function AccountSummaryItem(props) {
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
          return (
            <SummaryPredictions
              key={p.summaryID}
              competitors={p.sportEvent.competitors}
              predictedFighter={p.predictedFighter}
              winner={p.sportEventStatus.winner_id}
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
  display: block;
  text-align: center;
  border: 1px solid #4d4d4d;
  box-shadow: 2px 2px 3px #7A7A7A;
  margin: .2rem 0;
  padding: .5rem .7rem;
  @media(max-width: 767px) {
    font-size: .95em;
  }
  overflow: ${props => props.statsHidden ? null : "hidden"}
  max-height: ${props => props.statsHidden ? '400px' : '1300px'};
  transition: max-height .5s cubic-bezier(1, 0, 0, 1);
`;

AccountSummaryItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  startDate: PropTypes.string,
  eventsArray: PropTypes.array
};
