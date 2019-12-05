import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SummaryListItem from './summary-list-item';
import styled from 'styled-components';
import { UserContext } from '../context/user-context';

export default function SeasonPage(props) {
  const { id: seasonID } = props.match.params;
  const [summaries, setSummaries] = useState(null);
  const { user, setUser } = useContext(UserContext);

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
        {user.userID === 35 ? (
          <EditButton>
            <Link to={`/edit/${seasonID}`}>
              Edit
            </Link>
          </EditButton>
        ) : (null)}
      </SeasonTitle>
      <div>{createVenueLocation(summaries[0].sport_event.venue)}</div>
      <Divider />
      {summaries.map(s => (
        <SummaryListItem
          key={s.id}
          {...props}
          id={s.id}
          competitors={s.sport_event.competitors}
          summaryOrder={s.s_order}
        />
      ))}
    </SummariesContainer>
  ) : null;
}

const EditButton = styled.div`
  position: absolute;
  right: 1rem;
  top: 0;
`;

const Divider = styled.div`
  border-bottom: 2px solid grey;
  width: 85%;
  margin: .3rem auto;
`;

const SeasonTitle = styled.div`
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  position: relative;
`;

const SummariesContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin: auto;
  max-width: 768px;
  padding: .5rem;
`;