import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryListItem from './summary-list-item';
import styled from 'styled-components';

export default function SeasonPage(props) {
  const { id: seasonID } = props.match.params;
  const [summaries, setSummaries] = useState(null);

  useEffect(() => {
    getSeasonData();
  }, []);

  const getSeasonData = async () => {
    const response = await axios.get(`/api/seasons/${seasonID}`);
    setSummaries(response.data.summaries);
  };

  const createVenueLocation = venue => {
    const venueString = `${venue.name} - ${venue.city_name}, ${venue.country_name}`;
    return venueString;
  };

  return summaries && summaries.length ? (
    <SummariesContainer>
      <SeasonTitle>
        {summaries[0].sport_event.sport_event_context.season.name.replace(/\d{4}\s*$/, '')}
      </SeasonTitle>
      <div>{createVenueLocation(summaries[0].sport_event.venue)}</div>
      {summaries.map(s => (
        <SummaryListItem
          key={s.id}
          {...props}
          id={s.id}
          competitors={s.sport_event.competitors}

        />
      ))}
    </SummariesContainer>
  ) : null;
}

const SeasonTitle = styled.div`
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
`;

const SummariesContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin: auto;
  max-width: 768px;
`;
