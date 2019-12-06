import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const convertWeightClass = weightClass => {
  const charsOnly = weightClass.match(/[a-z_]+/)[0];
  console.log(charsOnly);
  let newString;
  switch (charsOnly) {
    case 'bantamweight':
      newString = 'BW - 135lbs';
      break;
    case 'featherweight':
      newString = 'FW - 145lbs';
      break;
    case 'lightweight':
      newString = 'LW - 155lbs';
      break;
    case 'welterweight':
      newString = 'WW = 170lbs';
      break;
    case 'light_heavyweight':
      newString = 'LHW - 205lbs';
      break;
    case 'middleweight':
      newString = 'MW - 185lbs';
      break;
    case 'heavyweight':
      newString = 'HW - 265lbs';
      break;
    case 'flyweight':
      newString = 'FLW - 125lbs';
      break;
    case 'strawweight':
      newString = 'SW - 115lbs';
      break;
  }
  return newString;
  // if (weightClass.includes('146'))
};

export default function SummaryListItem(props) {
  const convertName = name => {
    const split = name.split(', ');
    return [split[1], split[0]].join(' ');
  };

  return (
    <SummaryContainer canceled={props.canceled}>
      <FighterOne>{convertName(props.competitors[0].name)}</FighterOne>
      <Middle>{convertWeightClass(props.weightClass)}</Middle>
      <FighterTwo>{convertName(props.competitors[1].name)}</FighterTwo>
    </SummaryContainer>
  );
}

const Middle = styled.div`
  /* flex-basis: 1; */
  width: 15%;
  margin: auto;
`;

const Fighter = styled.div`
  /* flex-basis: 1; */
  width: 42.5%
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
  text-align: center;
  justify-content: center;
  padding: .3rem .7rem;
  text-decoration: ${props => props.canceled ? 'line-through' : null};
  @media(max-width: 767px) {
    font-size: .95em;
  }
`;

SummaryListItem.propTypes = {
  id: PropTypes.string,
  competitors: PropTypes.array,
  summaryOrder: PropTypes.number,
  canceled: PropTypes.bool,
  weightClass: PropTypes.string
};
