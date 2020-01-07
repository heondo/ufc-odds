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
    <RoundContainer>
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
              <Divider />
            </div>
          );
        })
      }
      <div>
        <RoundLabel>
          TOTALS
        </RoundLabel>
        <RoundStatsTable>
          <table cellspacing="0">
            <tbody>
              <tr>
                <StatNumber more={moreLessOrEven(props.fighterOneTotals.knockdowns, props.fighterTwoTotals.knockdowns)}>
                  {props.fighterOneTotals.knockdowns}
                </StatNumber>
                <StatType>
                  Knockdowns
                </StatType>
                <StatNumber more={moreLessOrEven(props.fighterTwoTotals.knockdowns, props.fighterOneTotals.knockdowns)}>
                  {props.fighterTwoTotals.knockdowns}
                </StatNumber>
              </tr>
              <tr>
                <StatNumber more={moreLessOrEven(props.fighterOneTotals.significant_strike_percentage, props.fighterTwoTotals.significant_strike_percentage)}>
                  {props.fighterOneTotals.significant_strike_percentage}
                </StatNumber>
                <StatType>
                  Sig. Strike Percentage
                </StatType>
                <StatNumber more={moreLessOrEven(props.fighterTwoTotals.significant_strike_percentage, props.fighterOneTotals.significant_strike_percentage)}>
                  {props.fighterTwoTotals.significant_strike_percentage}
                </StatNumber>
              </tr>
              <tr>
                <StatNumber more={moreLessOrEven(props.fighterOneTotals.significant_strikes, props.fighterTwoTotals.significant_strikes)}>
                  {props.fighterOneTotals.significant_strikes}
                </StatNumber>
                <StatType>
                  Significant Strikes
                </StatType>
                <StatNumber more={moreLessOrEven(props.fighterTwoTotals.significant_strikes, props.fighterOneTotals.significant_strikes)}>
                  {props.fighterTwoTotals.significant_strikes}
                </StatNumber>
              </tr>
              <tr>
                <StatNumber more={moreLessOrEven(props.fighterOneTotals.significant_strikes_attempted, props.fighterTwoTotals.significant_strikes_attempted)}>
                  {props.fighterOneTotals.significant_strikes_attempted}
                </StatNumber>
                <StatType>
                  Sig. Strikes Attempted
                </StatType>
                <StatNumber more={moreLessOrEven(props.fighterTwoTotals.significant_strikes_attempted, props.fighterOneTotals.significant_strikes_attempted)}>
                  {props.fighterTwoTotals.significant_strikes_attempted}
                </StatNumber>
              </tr>
              <tr>
                <StatNumber more={moreLessOrEven(props.fighterOneTotals.submission_attempts, props.fighterTwoTotals.submission_attempts)}>
                  {props.fighterOneTotals.submission_attempts}
                </StatNumber>
                <StatType>
                  Submission Attempts
                </StatType>
                <StatNumber more={moreLessOrEven(props.fighterTwoTotals.submission_attempts, props.fighterOneTotals.submission_attempts)}>
                  {props.fighterTwoTotals.submission_attempts}
                </StatNumber>
              </tr>
              <tr>
                <StatNumber more={moreLessOrEven(props.fighterOneTotals.takedown_percentage, props.fighterTwoTotals.takedown_percentage)}>
                  {props.fighterOneTotals.takedown_percentage}
                </StatNumber>
                <StatType>
                  Takedown Percentage
                </StatType>
                <StatNumber more={moreLessOrEven(props.fighterTwoTotals.takedown_percentage, props.fighterOneTotals.takedown_percentage)}>
                  {props.fighterTwoTotals.takedown_percentage}
                </StatNumber>
              </tr>
              <tr>
                <StatNumber more={moreLessOrEven(props.fighterOneTotals.takedowns, props.fighterTwoTotals.takedowns)}>
                  {props.fighterOneTotals.takedowns}
                </StatNumber>
                <StatType>
                  Takedowns
                </StatType>
                <StatNumber more={moreLessOrEven(props.fighterTwoTotals.takedowns, props.fighterOneTotals.takedowns)}>
                  {props.fighterTwoTotals.takedowns}
                </StatNumber>
              </tr>
              <tr>
                <StatNumber more={moreLessOrEven(props.fighterOneTotals.takedowns_attempted, props.fighterTwoTotals.takedowns_attempted)}>
                  {props.fighterOneTotals.takedowns_attempted}
                </StatNumber>
                <StatType>
                  Takedowns Attempted
                </StatType>
                <StatNumber more={moreLessOrEven(props.fighterTwoTotals.takedowns_attempted, props.fighterOneTotals.takedowns_attempted)}>
                  {props.fighterTwoTotals.takedowns_attempted}
                </StatNumber>
              </tr>
              <tr>
                <StatNumber more={moreLessOrEven(props.fighterOneTotals.total_strike_percentage, props.fighterTwoTotals.total_strike_percentage)}>
                  {props.fighterOneTotals.total_strike_percentage}
                </StatNumber>
                <StatType>
                  Total Strike Percentage
                </StatType>
                <StatNumber more={moreLessOrEven(props.fighterTwoTotals.total_strike_percentage, props.fighterOneTotals.total_strike_percentage)}>
                  {props.fighterTwoTotals.total_strike_percentage}
                </StatNumber>
              </tr>
              <tr>
                <StatNumber more={moreLessOrEven(props.fighterOneTotals.total_strikes, props.fighterTwoTotals.total_strikes)}>
                  {props.fighterOneTotals.total_strikes}
                </StatNumber>
                <StatType>
                  Total Strikes
                </StatType>
                <StatNumber more={moreLessOrEven(props.fighterTwoTotals.total_strikes, props.fighterOneTotals.total_strikes)}>
                  {props.fighterTwoTotals.total_strikes}
                </StatNumber>
              </tr>
              <tr>
                <StatNumber more={moreLessOrEven(props.fighterOneTotals.total_strikes_attempted, props.fighterTwoTotals.total_strikes_attempted)}>
                  {props.fighterOneTotals.total_strikes_attempted}
                </StatNumber>
                <StatType>
                  Total Strikes Attempted
                </StatType>
                <StatNumber more={moreLessOrEven(props.fighterTwoTotals.total_strikes_attempted, props.fighterOneTotals.total_strikes_attempted)}>
                  {props.fighterTwoTotals.total_strikes_attempted}
                </StatNumber>
              </tr>
            </tbody>
          </table>
        </RoundStatsTable>
      </div>
    </RoundContainer>
  );
};

const RoundContainer = styled.div`
  background-color: white;
  color: black;
  border-radius: 3px;
`;

const StatNumber = styled.td`
  font-size: .92rem;
  color: ${props => props.more === 'even' ? 'black' : props.more === 'more' ? colors.s2Col3 : colors.pCol2 };
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
