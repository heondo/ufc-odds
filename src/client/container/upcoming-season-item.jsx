import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

export default function UpcomingSeasonItem(props) {
  const convertName = name => {
    const split = name.split(', ');
    return [split[1], split[0]].join(' ');
  };

  const Fights = () => {
    return (
      <div>
        {props.eventsArray.map(e => {
          if (e.match_status !== 'cancelled') {
            return (
              <FighterNames key={e.id}>
                {convertName(e.sport_event.competitors[0].name)} vs {convertName(e.sport_event.competitors[1].name)}
              </FighterNames>);
          }
        })}
      </div>
    );
  };

  return (
    <SeasonItemContainer onClick={() => props.history.push(`/season/${props.id}`)}>
      <SeasonName>{props.name.replace(/\d{4}\s*$/, '')}</SeasonName>
      <SeasonDate>{moment(props.startDate).format('MMM Do, YYYY')}</SeasonDate>
      {
        props.eventsArray.length ? <FiveRoundHeader>5 Round Fights</FiveRoundHeader> : undefined
      }
      <Fights />
      <Arrow><i className="fas fa-caret-right"></i></Arrow>
    </SeasonItemContainer>
  );
}

const Arrow = styled.div`
  position: absolute;
  right: .3rem;
`;

const SeasonName = styled.div`
  font-size: 1.2em;
  font-weight: bold;
`;

const FiveRoundHeader = styled.div`
  font-size: .85em;
  font-weight: bold;
`;

const SeasonDate = styled.div`
  font-size: .95em;
  font-style: italic;
`;

const SeasonItemContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  padding: .3rem;
  border: 1px solid lightgrey;
  position: relative;
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
