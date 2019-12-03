import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function SummaryListItem(props) {
  const convertName = name => {
    const split = name.split(', ');
    return [split[1], split[0]].join(' ');
  };

  return (
    <SummaryContainer>
      <FighterOne>{convertName(props.competitors[0].name)}</FighterOne>
      <Middle>vs</Middle>
      <FighterTwo>{convertName(props.competitors[1].name)}</FighterTwo>
    </SummaryContainer>
  );
}

const Middle = styled.div`
  width: 10%;
  margin: auto;
`;

const Fighter = styled.div`
  width: 45%
  display: flex;
`;

const FighterOne = styled(Fighter)`
  justify-content: start;
`;

const FighterTwo = styled(Fighter)`
  justify-content: end;
`;

const SummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: .3rem .7rem;
`;

SummaryListItem.propTypes = {
  id: PropTypes.string,
  competitors: PropTypes.array
};
