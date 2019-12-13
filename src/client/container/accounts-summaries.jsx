import React from 'react';
import SummaryPredictions from './summary-predictions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export default function AccountsSummaries(props) {
  return (
    <SeasonsContainer>
      <Link to={`/season/${props.id}`}>
        <SeasonName>
          {props.name}
        </SeasonName>
      </Link>
      {props.eventsArray ? (
        props.eventsArray.map(p => (
          <SummaryPredictions
          key={p.summaryID}
          competitors={p.sportEvent.competitors}
          predictedFighter={p.predictedFighter}
          winner={p.sportEventStatus.winner}
          />
        ))
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
