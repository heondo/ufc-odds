import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {colors} from '../context/theme-context';

export default function FightStatistics(props){
  return (
    <FightStatsContainer>
      {props.statsHidden ? (
        <div>
          Statistics
        </div>
      ) : null}
      {
        props.statsHidden ? null : (
          <RoundStatistics periods={props.periods} fighterOneTotals={props.fighterOneTotals} fighterTwoTotals={props.fighterTwoTotals}/>
        )
      }
      <div onClick={props.toggleStatsHidden}>
        {
          props.statsHidden ? (<i className="fas fa-sort-down" />) : (<i className="fas fa-sort-up" />)
        }
      </div>
    </FightStatsContainer>
  );
}

const RoundStatistics = props => {
  const moreLessOrEven = (num1, num2) => {
    if (num1 === num2) {
      return 'even';
    }
    if (num1 > num2) {
      return 'more';
    }
    return 'less';
  };

  return (
    <div>
      {
        props.periods.map(round => {
          const { statistics: statisticsOne } = round.competitors[0];
          const { statistics: statisticsTwo } = round.competitors[1];
          return (
            <div>
              <RoundLabel>
                ROUND {round.number}
              </RoundLabel>
              <RoundStatsTable>
                <table cellspacing="0">
                  <tbody>
                    <tr>
                      <StatNumber more={moreLessOrEven(statisticsOne.knockdowns, statisticsTwo.knockdowns)}>
                        {statisticsOne.knockdowns || 0}
                      </StatNumber>
                      <StatType>
                        Knockdowns
                      </StatType>
                      <StatNumber more={moreLessOrEven(statisticsTwo.knockdowns, statisticsOne.knockdowns)}>
                        {statisticsTwo.knockdowns || 0}
                      </StatNumber>
                    </tr>
                    <tr>
                      <StatNumber more={moreLessOrEven(statisticsOne.significant_strikes, statisticsTwo.significant_strikes)}>
                        {statisticsOne.significant_strikes || 0}
                      </StatNumber>
                      <StatType>
                        Significant Strikes
                      </StatType>
                      <StatNumber more={moreLessOrEven(statisticsTwo.significant_strikes, statisticsOne.significant_strikes)}>
                        {statisticsTwo.significant_strikes || 0}
                      </StatNumber>
                    </tr>
                    <tr>
                      <StatNumber more={moreLessOrEven(statisticsOne.submission_attempts, statisticsTwo.submission_attempts)}>
                        {statisticsOne.submission_attempts || 0}
                      </StatNumber>
                      <StatType>
                        Submission Attempts
                      </StatType>
                      <StatNumber more={moreLessOrEven(statisticsTwo.submission_attempts, statisticsOne.submission_attempts)}>
                        {statisticsTwo.submission_attempts || 0}
                      </StatNumber>
                    </tr>
                    <tr>
                      <StatNumber more={moreLessOrEven(statisticsOne.takedowns, statisticsTwo.takedowns)}>
                        {statisticsOne.takedowns || 0}
                      </StatNumber>
                      <StatType>
                        Takedowns
                      </StatType>
                      <StatNumber more={moreLessOrEven(statisticsTwo.takedowns, statisticsOne.takedowns)}>
                        {statisticsTwo.takedowns || 0}
                      </StatNumber>
                    </tr>
                    <tr>
                      <StatNumber more={moreLessOrEven(statisticsOne.total_strikes, statisticsTwo.total_strikes)}>
                        {statisticsOne.total_strikes || 0}
                      </StatNumber>
                      <StatType>
                        Total Strikes
                      </StatType>
                      <StatNumber more={moreLessOrEven(statisticsTwo.total_strikes, statisticsOne.total_strikes)}>
                        {statisticsTwo.total_strikes || 0}
                      </StatNumber>
                    </tr>
                  </tbody>
                </table>
              </RoundStatsTable>
            </div>
          );
        })
      }
      <RoundLabel>
        TOTALS
      </RoundLabel>
      <RoundStatsTable>
        <table cellspacing="0">
          <tbody>
            <tr>
              <td>
                {props.fighterOneTotals.knockdowns}
              </td>
              <StatType>
                Knockdowns
              </StatType>
              <td>
                {props.fighterTwoTotals.knockdowns}
              </td>
            </tr>
            <tr>
              <td>
                {props.fighterOneTotals.significant_strike_percentage}
              </td>
              <StatType>
                Sig. Strike Percentage
              </StatType>
              <td>
                {props.fighterTwoTotals.significant_strike_percentage}
              </td>
            </tr>
            <tr>
              <td>
                {props.fighterOneTotals.significant_strikes}
              </td>
              <StatType>
                Significant Strikes
              </StatType>
              <td>
                {props.fighterTwoTotals.significant_strikes}
              </td>
            </tr>
            <tr>
              <td>
                {props.fighterOneTotals.significant_strikes_attempted}
              </td>
              <StatType>
                Sig. Strikes Attempted
              </StatType>
              <td>
                {props.fighterTwoTotals.significant_strikes_attempted}
              </td>
            </tr>
            <tr>
              <td>
                {props.fighterOneTotals.submission_attempts}
              </td>
              <StatType>
                Submission Attempts
              </StatType>
              <td>
                {props.fighterTwoTotals.submission_attempts}
              </td>
            </tr>
            <tr>
              <td>
                {props.fighterOneTotals.takedown_percentage}
              </td>
              <StatType>
                Takedown Percentage
              </StatType>
              <td>
                {props.fighterTwoTotals.takedown_percentage}
              </td>
            </tr>
            <tr>
              <td>
                {props.fighterOneTotals.takedowns}
              </td>
              <StatType>
                Takedowns
              </StatType>
              <td>
                {props.fighterTwoTotals.takedowns}
              </td>
            </tr>
            <tr>
              <td>
                {props.fighterOneTotals.takedowns_attempted}
              </td>
              <StatType>
                Takedowns Attempted
              </StatType>
              <td>
                {props.fighterTwoTotals.takedowns_attempted}
              </td>
            </tr>
            <tr>
              <td>
                {props.fighterOneTotals.total_strike_percentage}
              </td>
              <StatType>
                Total Strike Percentage
              </StatType>
              <td>
                {props.fighterTwoTotals.total_strike_percentage}
              </td>
            </tr>
            <tr>
              <td>
                {props.fighterOneTotals.total_strikes}
              </td>
              <StatType>
                Total Strikes
              </StatType>
              <td>
                {props.fighterTwoTotals.total_strikes}
              </td>
            </tr>
            <tr>
              <td>
                {props.fighterOneTotals.total_strikes_attempted}
              </td>
              <StatType>
                Total Strikes Attempted
              </StatType>
              <td>
                {props.fighterTwoTotals.total_strikes_attempted}
              </td>
            </tr>
          </tbody>
        </table>
      </RoundStatsTable>
    </div>
  );
};


const StatNumber = styled.td`
  font-size: .9rem;
  color: ${props => props.more === 'even' ? 'black' : props.more === 'more' ? colors.s2Col3 : colors.pCol2 };
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
    td {
      border-bottom: 1px solid black;
    }
    /*  */
  }
  tbody {
    tr:last-child {
      td {
        border-bottom: none;
      }
    }
  }
  /* tr:nth-child(odd) {
    background-color: ${colors.s2Col0};
  }; */
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
