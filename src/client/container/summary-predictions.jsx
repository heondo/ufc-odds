import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const convertName = name => {
  const split = name.split(', ');
  return [split[1], split[0]].join(' ');
};

export default function SummaryPredictions(props){
  return (
    <SummaryContainer>
      <FighterNames>
        <FighterOne winner={props.winner} competitorID={props.competitors[0].id} predictedFighter={props.predictedFighter}>
          {convertName(props.competitors[0].name)}
        </FighterOne>
        <Middle> - </Middle>
        <FighterTwo winner={props.winner} competitorID={props.competitors[1].id} predictedFighter={props.predictedFighter}>
          {convertName(props.competitors[1].name)}
        </FighterTwo>
      </FighterNames>
    </SummaryContainer>
  );
}

const Middle = styled.div`
  width: 5%;
`;

const Fighter = styled.div`
  border: ${props => props.winner ? props.winner === props.competitorID ? ' 1px solid #498a77;' : '1px solid #bd6574' : 'none'};
  color: ${props => props.predictedFighter === props.competitorID ? '#498a77;' : '#bd6574'};
  width: 47.5%;
  /* padding: .2rem; */
`;

const FighterOne = styled(Fighter)`
  text-align: start;
`;

const FighterTwo = styled(Fighter)`
  text-align: end;
`;

const FighterNames = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  /* justify-content: space-between; */
`;

const SummaryContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin: .2rem auto;
  @media(max-width: 767px) {
    font-size: .95em;
  }
`;

SummaryPredictions.propTypes = {
  competitors: PropTypes.array,
  predictedFighter: PropTypes.string,
  winner: PropTypes.string
};
