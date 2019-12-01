import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const convertName = name => {
  const split = name.split(', ');
  return [split[1], split[0]].join(' ');
};

export default function UpcomingSeasonItem(props) {

  const Fights = fightProps => {
    return (
      <div>
        {props.eventsArray.map(e => {
          return (
            <FighterNames key={e.id}>
              {convertName(e.sport_event.competitors[0].name)} vs {convertName(e.sport_event.competitors[1].name)}
            </FighterNames>);
        })}
      </div>
    );
  };

  return (
    <SeasonItemContainer>
      <SeasonName>{props.name.replace(/\d{4}\s*$/, '')}</SeasonName>
      <div>
        {moment(props.startDate).format('MMM Do YY')}
      </div>
      <div>Five Round Events</div>
      <Fights />
    </SeasonItemContainer>
  );
}

const SeasonName = styled.div`
  font-size: 1.2em;
  font-weight: bold;
`;

const SeasonItemContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  padding: .3rem;
  border: 1px solid red;
`;

const FighterNames = styled.div`
  font-size: .9em;
  display: flex;
  justify-content: center;
`;

UpcomingSeasonItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  eventsArray: PropTypes.array
};
