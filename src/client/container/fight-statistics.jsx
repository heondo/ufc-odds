import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {colors} from '../context/theme-context';

const moreLessOrEven = (num1, num2) => {
  if (num1 === num2) {
    return 'even';
  }
  if (num1 > num2) {
    return 'more';
  }
  return 'less';
};

const convertStat = stat => {
  switch(stat){
  case 'knockdowns':
    return 'Knockdowns';
  case 'total_strikes_attempted':
    return 'Total Strikes ATT';
  case 'total_strikes':
    return 'Total Strikes';
  case 'significant_strikes_attempted':
    return 'Significant Strikes ATT';
  case 'significant_strikes':
    return 'Significant Strikes';
  case 'takedowns_attempted':
    return 'Takedowns ATT';
  case 'takedowns':
    return 'Takedowns';
  case 'submission_attempts':
    return 'Submission ATTs';
  case 'total_strike_percentage':
    return 'Total Strike %';
  case 'significant_strike_percentage':
    return 'Significant Strike %';
  case 'takedown_percentage':
    return 'Takedown %';
  default:
    return stat;
  }
};

export default function FightStatistics(props){
  return (
    <FightStatsContainer>
      {
        props.statsHidden ? null : (
          <RoundStatistics periods={props.periods} fighterOneTotals={props.fighterOneTotals} fighterTwoTotals={props.fighterTwoTotals}/>
        )
      }
      {props.statsHidden ? (
        <OpenStatistics onClick={props.toggleStatsHidden}>
          <span>
            <div>
              Statistics
            </div>
            <div>
              <i style={{marginBottom: '.25rem'}}className="fas fa-sort-down" />
            </div>
          </span>
        </OpenStatistics>
      ) : (
        <OpenStatistics onClick={props.toggleStatsHidden}>
          <span>
            <div>
                Statistics
            </div>
            <div>
              <i className="fas fa-sort-up" />
            </div>
          </span>
        </OpenStatistics>
      )
      }
    </FightStatsContainer>
  );
}

const TableStatistics = ({ statsObjectOne, statsObjectTwo, roundNumber, total}) => {
  const keys = Object.keys(statsObjectOne);
  console.log(keys);
  return (
    <div>
      <RoundLabel>
        {!total ? "ROUND" : null} {roundNumber}
      </RoundLabel>
      <RoundStatsTable>
        <table cellSpacing="0">
          <tbody>
            {
              keys.map(key => (
                <tr>
                  <StatNumber more={moreLessOrEven(statsObjectOne[key], statsObjectTwo[key])}>
                    {statsObjectOne[key]}
                  </StatNumber>
                  <StatType>
                    {convertStat(key)}
                  </StatType>
                  <StatNumber more={moreLessOrEven(statsObjectTwo[key], statsObjectOne[key])}>
                    {statsObjectTwo[key]}
                  </StatNumber>
                </tr>
              ))
            }
          </tbody>
        </table>
      </RoundStatsTable>
      {
        total ? null : <Divider />
      }
    </div>
  );
};


const RoundStatistics = props => {

  return (
    <RoundContainer>
      {
        props.periods.map(round => {
          const { statistics: roundStatisticsOne } = round.competitors[0];
          const { statistics: roundStatisticsTwo } = round.competitors[1];
          return (
            <TableStatistics key={round.number} roundNumber={round.number} statsObjectOne={roundStatisticsOne} statsObjectTwo={roundStatisticsTwo} total={false}/>
          );
        })
      }
      <TableStatistics key="totalStats" roundNumber="Totals" statsObjectOne={props.fighterOneTotals} statsObjectTwo={props.fighterTwoTotals} total={true}/>
    </RoundContainer>
  );
};

const OpenStatistics = styled.div`
  display: flex;
  justify-content: center;
  margin: .3rem auto;
  /* background-color: white; */
  span {
    display: flex;
    background-color: #DCDCDC;
    color: black;
    border-radius: 3px;
    padding: .3rem .6rem;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #BDBDBD;
    };
    transition: all .2s ease;
    div:first-child {
      margin-right: .5rem;
    };
  };
`;

const RoundContainer = styled.div`
  background-color: #BDBDBD;
  color: black;
  border-radius: 3px;
`;

const StatNumber = styled.td`
  font-size: .92rem;
  color: ${props => props.more === 'even' ? '2#02020' : props.more === 'more' ? colors.s2Col3 : colors.pCol2 };
  font-weight: 600;
`;

const RoundLabel = styled.div`
  font-size: 1.03rem;
  font-weight: bold;
`;

const StatType = styled.td`
  width: 13rem;
`;

const RoundStatsTable = styled.div`
  display: flex;
  justify-content: center;
  tr {
    text-decoration: none !important;
    td {
      border-bottom: 1px solid black;
    }
  }
  tbody {
    tr:last-child {
      td {
        border-bottom: none;
      }
    }
  }
`;

const Divider = styled.div`
  border-bottom: 2px solid grey;
  margin: .3rem auto;
`;

// TODO: make the stats transition when you hide or unhide the section. Bug happening here....

const FightStatsContainer = styled.div`

`;

FightStatistics.propTypes = {
  periods: PropTypes.array,
  fighterOneTotals: PropTypes.object,
  fighterTwoTotals: PropTypes.object,
  statsHidden: PropTypes.bool,
  toggleStatsHidden: PropTypes.func
};
