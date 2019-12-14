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
      })
    }
    return (
      <div>
        {correct}/{total}
      </div>
    )
  }

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
          )
        })
      ) : (
        <div>
          NA
        </div>
      )}
    </SeasonsContainer>
  )
}

const SeasonName = styled.div`
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`

const SeasonsContainer = styled.div`
`

AccountsSummaries.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  startDate: PropTypes.string,
  eventsArray: PropTypes.array
}
