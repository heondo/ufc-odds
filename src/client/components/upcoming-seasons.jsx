import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import UpcomingSeasonItem from '../container/upcoming-season-item';

export default function UpcomingSeasons(props) {
  const [seasons, setSeasons] = useState(null);
  // const [seasonsLoaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get('api/seasons');
      console.log(response);
      setSeasons(response.data.seasons);
    })();
  }, []);

  return seasons ? (
    <SeasonsListContainer>
      {seasons.map(s => <UpcomingSeasonItem key={s.id} id={s.id} name={s.name} startDate={s.start_date} endDate={s.end_date} />)}
    </SeasonsListContainer>
  ) : <div>Not loaded yet</div>;
}

const SeasonsListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
