import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import UpcomingSeasonItem from '../container/upcoming-season-item';

export default function UpcomingSeasons(props) {
  const [seasons, setSeasons] = useState(null);

  const getSeasons = async () => {
    const response = await axios.get('api/seasons');
    setSeasons(response.data.seasons);
  };

  useEffect(() => {
    getSeasons();
  }, []);

  // const sortEvents = arr => {
  //   const sorted = arr.sort((a, b) => (a.sport_event.start_time) < (b.sport_event.start_time) ? -1 : 1);
  //   return sorted;
  // };

  return seasons ? (
    <SeasonsListContainer>
      {seasons.map(s => (
        <UpcomingSeasonItem
          {...props}
          key={s.id}
          id={s.id}
          name={s.name}
          startDate={s.start_date}
          eventsArray={s.five_round_events}
        />
      ))}
    </SeasonsListContainer>
  ) : (
    <div>
    Not loaded yet
    </div>
  );
}

const SeasonsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 768px;
  padding: .5rem;
`;
