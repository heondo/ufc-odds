import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function UpcomingSeasonItem(props) {
  return (
    <SeasonItemContainer>
      <h3>{props.name}</h3>
    </SeasonItemContainer>
  );
}

const SeasonItemContainer = styled.div`
  border: 1px solid red;
`;

UpcomingSeasonItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string
};
