import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user-context';
import axios from 'axios';
import Dropdown, {MenuItem} from '../components/Dropdown';
import { Button, ButtonGroup, ButtonToolbar } from '../components/Buttons';
import FightStatistics from './fight-statistics';
import LoadingCircle from './loading-circle';
import {colors} from '../context/theme-context';

const convertWeightClass = weightClass => {
  const charsOnly = weightClass.match(/[a-z_]+/)[0];
  let newString;
  switch (charsOnly) {
  case 'bantamweight':
    newString = ['Bantamweight', '135 lbs'];
    break;
  case 'featherweight':
    newString = ['Featherweight', '145 lbs'];
    break;
  case 'lightweight':
    newString = ['Lightweight', '155 lbs'];
    break;
  case 'welterweight':
    newString = ['Welterweight', '170 lbs'];
    break;
  case 'light_heavyweight':
    newString = ['Light Heavyweight', '205 lbs'];
    break;
  case 'middleweight':
    newString = ['Middleweight', '185 lbs'];
    break;
  case 'heavyweight':
    newString = ['Heavyweight', '265 lbs'];
    break;
  case 'flyweight':
    newString = ['Flyweight', '125 lbs'];
    break;
  case 'strawweight':
    newString = ['Strawweight', '115 lbs'];
    break;
  }
  return newString;
};

const fighterIDtoName = (fighter, competitors) => {
  for (let i of competitors) {
    if (i.id === fighter) {
      return convertName(i.name);
    }
  }
  return null;
};

const convertName = (name, upper) => {
  const split = name.split(', ');
  const newName = [split[1], split[0]].join(' ');
  return upper ? newName.toUpperCase() : newName;
};

const VoteComponent = props => {
  if (!props.voteCount) {
    return (
      <div style={{
        margin: '.3rem'
      }}>
        No votes
      </div>
    );
  }
  const totalVotes = Object.values(props.voteCount).reduce((a, b) => a + b) || 0;
  const f1Votes = props.voteCount[props.competitors[0].id] || 0;
  const f2Votes = props.voteCount[props.competitors[1].id] || 0;
  const f1Percent = (f1Votes / totalVotes * 100).toFixed(0);
  const f2Percent = (f2Votes / totalVotes * 100).toFixed(0);

  return (
    <VoteContainer>
      <VoteDisplay>
        <VoteDisplay>
          <div>
            {f1Percent}%
            <MobileDisappear>({f1Votes}/{totalVotes})</MobileDisappear>
          </div>
        </VoteDisplay>
        <VoteBarContainer direction="left">
          <VoteCountBar percent={f1Percent} moreThan={f1Votes > f2Votes} direction="left" />
        </VoteBarContainer>
      </VoteDisplay>
      <TotalVotesText>
        Total Votes
      </TotalVotesText>
      <VoteDisplay>
        <VoteBarContainer direction="right">
          <VoteCountBar percent={f2Percent} moreThan={f1Votes < f2Votes} direction="right" />
        </VoteBarContainer>
        <VoteDisplay>
          <div>
            <MobileDisappear>({f2Votes}/{totalVotes})</MobileDisappear>
            {f2Percent}%
          </div>
        </VoteDisplay>
      </VoteDisplay>
    </VoteContainer>
  );
};

const PredictOnFighter = props => {

  const [selectedFighter, setSelectedFighter] = useState(null);

  if (props.isDayBefore) {
    return null;
  }
  return (
    <>
    <DropdownContainer>
      <Dropdown
        onSelect={(eventKey) => {
          setSelectedFighter(eventKey);
        }}
      >
        <Dropdown.Toggle
          btnStyle="flat"
        >
          {selectedFighter !== null ? convertName(props.competitors[selectedFighter].name) : 'Predict on your fighter'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <MenuItem
            eventKey={0}
            active={selectedFighter === 0}
          >
            {convertName(props.competitors[0].name)} {props.fighterOdds ? props.fighterOdds[0] : null}
          </MenuItem>
          <MenuItem
            eventKey={1}
            active={selectedFighter === 1}
          >
            {convertName(props.competitors[1].name)} {props.fighterOdds ? props.fighterOdds[1] : null}
          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    </DropdownContainer>
      {
        selectedFighter !== null ? (
          <Button onClick={() => {
            props.submitPrediction(selectedFighter);
          }}>
            Submit
          </Button>
        ) : null
      }
    </>
  );
};

export default function SeasonSummaryItem(props){
  const [isPredicting, setIsPredicting] = useState(false);
  const [statsHidden, setStatsHidden] = useState(true);

  const weightClass = convertWeightClass(props.weightClass);

  const submitPrediction = async index => {
    setIsPredicting(true);
    const fighterID = props.competitors[index].id;
    // necessary things for the database. its own predictionID, summaryID, seasonsID, fighterID,
    try {
      const insertResponse = await axios.post('/api/summaries/predict', {
        seasonID: props.seasonID,
        summaryID: props.id,
        fighterID: props.competitors[index].id
      });
      if (insertResponse.data.success) {
        setIsPredicting(false);
        props.addPredictionHandler(props.index, insertResponse.data.id, fighterID, props.stage);
      }
    }
    catch (err) {
      setIsPredicting(false);
      console.error(err);
    }
  };

  const toggleStatsHidden = () => {
    setStatsHidden(!statsHidden);
  };


  const fighterIDtoOdds = (id, competitors, odds) => {
    for (let i in competitors){
      if (id === competitors[i].id) {
        return odds ? `(${odds[i]})` : null;
      }
    }
    return null;
  };

  const convertDecision = decision => {
    switch (decision) {
    case 'ko_tko':
      return 'KO/TKO';
    case 'tko_doctors_stoppage':
      return 'TKO (Doctor Stoppage)';
    case 'decision_unanimous':
      return 'Unanimous Decision';
    case 'decision_split':
      return 'Split Decision';
    case 'submission':
      return 'Submission';
    }
  };

  const fighterOdds = props.markets ? [
    props.plusMinusOdds(props.markets[0].outcomes[0].probability),
    props.plusMinusOdds(props.markets[0].outcomes[1].probability)
  ] : null;

  const conditionalWinDescription = (winMethod, finalRound, finalRoundTime) => {
    switch (winMethod) {
    case 'decision_split':
    case 'decision_unanimous':
      return `via ${convertDecision(winMethod)}`;
    case 'tko_doctors_stoppage':
    case 'ko_tko':
    case 'submission':
      return `via ${convertDecision(winMethod)} at ${finalRoundTime} of RD ${finalRound}`;
    default:
      return null;
    }
  };

  const WinnerDescription = () => {
    return (
      <div>
        {props.isDraw ? "Draw" : null}
        <div>
          {conditionalWinDescription(props.winMethod, props.finalRound, props.finalRoundTime)}
        </div>
      </div>
    );
  };

  return (
    <SummaryContainer statsHidden={statsHidden}>
      <FightersContainer canceled={props.canceled}>
        <FighterNames direction="left">
          {
            !props.winner ? null : props.winner === props.competitors[0].id ? (
              <WinLossText type="W">
                W
              </WinLossText>
            ) : (
              <WinLossText type="L">
                  L
              </WinLossText>
            )
          }
          <FighterName>
            {convertName(props.competitors[0].name, true)}
          </FighterName>
        </FighterNames>
        <VSContainer>
          {' vs '}
        </VSContainer>
        <FighterNames direction="right">
          <FighterName>
            {convertName(props.competitors[1].name, true)}
          </FighterName>
          {
            !props.winner ? null : props.winner === props.competitors[1].id ? (
              <WinLossText type="W">
                W
              </WinLossText>
            ) : (
              <WinLossText type="L">
                L
              </WinLossText>
            )
          }
        </FighterNames>
      </FightersContainer>
      <WeightClass canceled={props.canceled}>
        <div>
          <em>{weightClass[0]}</em> - {weightClass[1]}
        </div>
        <div>
          {props.scheduledRounds} Rounds
        </div>
      </WeightClass>
      <VoteComponent voteCount={props.voteCount} competitors={props.competitors} />
      {
        props.predictedFighter ? (
          <UserPickedFighter winner={props.winner} predictedFighter={props.predictedFighter}>
            Your pick: {fighterIDtoName(props.predictedFighter, props.competitors)} {fighterIDtoOdds(props.predictedFighter, props.competitors, fighterOdds)}
          </UserPickedFighter>
        ) : isPredicting ? <MiniLoading />
          : (
            <PredictOnFighter
              isDayBefore={props.isDayBefore}
              competitors={props.competitors}
              submitPrediction={submitPrediction}
              fighterOdds={fighterOdds}
            />
          )
      }
      {
        props.winner || props.winMethod ? (
          <WinnerDescription />
        ) : null
      }
      {
        props.statistics ? (
          <FightStatistics
            periods={props.statistics.periods}
            fighterOneTotals={props.statistics.totals.competitors[0].statistics}
            fighterTwoTotals={props.statistics.totals.competitors[1].statistics}
            toggleStatsHidden={toggleStatsHidden}
            statsHidden={statsHidden}
          />
        ) : null
      }
    </SummaryContainer>
  );
}

const WinLossText = styled.span`
  color: ${props => props.type === "W" ? colors.s2Col3 : colors.pCol0}
  font-size: 1.06rem;
`;

const FighterName = styled.div`
  margin: auto .4rem;
`;

const VSContainer = styled.div`
  width: 1rem;
  margin: auto;
`;

const FighterNames = styled.div`
  font-weight: bold;
  width: 15rem;
  display: flex;
  align-items: center;
  justify-content: ${props => props.direction === "left" ? "flex-end": "flex-start"};
`;

const FightersContainer = styled.div`
  font-size: 1.03rem;
  display: flex;
  justify-content: center;
  text-decoration: ${props => props.canceled ? 'line-through' : null};
`;

const UserPickedFighter = styled.div`
  padding: .3rem;
  border: 1px solid grey;
  border-radius: 3px;
  margin-bottom: .3rem;
  background-color: lightgrey;
  /* background-color: ${props => !props.winner ? 'lightgrey' : props.winner === props.predictedFighter ? colors.pCol2 : colors.s1Col1}; */
`;

const TotalVotesText = styled.div`
  margin: auto .3rem;
`;

const DropdownContainer = styled.span`
  margin: auto .5rem auto auto;
`;

const VoteBarContainer = styled.div`
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: ${props => props.direction === "left" ? 'flex-end' : 'flex-start'};
`;

const VoteCountBar = styled.span`
  display: inline-block;
  margin: auto 2px;
  height: 4px;
  width: ${props => `${props.percent / 25}rem`};
  background-color: ${props => props.moreThan ? colors.pCol2 : colors.s2Col2};
  border-radius: ${props => props.direction === "left" ? '2px 0 0 2px' : '0 2px 2px 0'};
`;

const VoteDisplay = styled.div`
  display: flex;
  font-size: .9rem;
  justify-content: center;
  align-items: center;
`;

const MobileDisappear = styled.span`
  margin: auto 2px;
  @media(max-width: 576px) {
    display: none;
  };
`;

const VoteContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: .5rem auto;
`;

const WeightClass = styled.div`
  font-size: .85rem;
  text-decoration: ${props => props.canceled ? 'line-through' : null};
`;

const SummaryContainer = styled.div`
  display: block;
  text-align: center;
  border: 1px solid grey;
  border-radius: 5px;
  margin: .2rem 0;
  padding: .3rem .7rem;
  @media(max-width: 767px) {
    font-size: .95em;
  }
  /* overflow: hidden; */
  overflow: ${props => props.statsHidden ? null : "hidden"}
  max-height: ${props => props.statsHidden ? '400px': '1300px'};
  transition: max-height .5s cubic-bezier(1, 0, 0, 1);
  /* background-color: lightgre  ; */
`;

const MiniLoading = styled.div`
  border: 3px solid #f3f3f3 !important;
  border-top: 3px solid #3498db !important;
  height: 10px !important;
  width: 10px !important;
  border-radius: 50%;
  margin: auto;
  animation: spin .5s linear infinite;
`;

PredictOnFighter.propTypes = {
  isDayBefore: PropTypes.bool,
  competitors: PropTypes.array,
  submitPrediction: PropTypes.func,
  fighterOdds: PropTypes.array
};

SeasonSummaryItem.propTypes = {
  id: PropTypes.string,
  seasonID: PropTypes.string,
  index: PropTypes.number,
  scheduledRounds: PropTypes.number,
  competitors: PropTypes.array,
  summaryOrder: PropTypes.number,
  canceled: PropTypes.bool,
  weightClass: PropTypes.string,
  isDraw: PropTypes.bool,
  isDayBefore: PropTypes.bool,
  statistics: PropTypes.object,
  winner: PropTypes.string,
  predictionID: PropTypes.number,
  predictedFighter: PropTypes.string,
  seasonDate: PropTypes.object,
  addPredictionHandler: PropTypes.func,
  voteCount: PropTypes.object,
  markets: PropTypes.array,
  plusMinusOdds: PropTypes.func,
  winMethod: PropTypes.string,
  finalRound: PropTypes.number,
  finalRoundTime: PropTypes.string,
  stage: PropTypes.string
};
