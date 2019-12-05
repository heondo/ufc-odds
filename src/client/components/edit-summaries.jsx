import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { UserContext } from '../context/user-context';
import styled from 'styled-components';
import update from 'immutability-helper';
import SummaryDragItem from '../container/summary-drag-item';

const EditSummaries = props => {
  {
    const { id: seasonID } = props.match.params;
    const [summaries, setSummaries] = useState(null);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
      getSeasonData();
    }, []);

    const getSeasonData = async () => {
      const response = await axios.get(`/api/seasons/${seasonID}`);
      setSummaries(response.data.summaries);
    };

    const moveCard = (dragIndex, hoverIndex) => {
      const dragCard = summaries[dragIndex];
      setSummaries(
        update(summaries, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        })
      );
    };

    return summaries ? (
      <SummariesContainer>
        <div>
          {summaries[0].sport_event.sport_event_context.season.name.replace(/\d{4}\s*$/, '')}
        </div>
        <Divider />
        <DndProvider backend={HTML5Backend}>
          <div>
            {summaries.map((s, index) => (
              <SummaryDragItem
                key={s.id}
                id={s.id}
                index={index}
                moveCard={moveCard}
                competitors={s.sport_event.competitors}
                summaryOrder={s.s_order}
              />
            ))}
          </div>
        </DndProvider>
      </SummariesContainer>
    ) : null;
  }
};

const Divider = styled.div`
  border-bottom: 2px solid grey;
  width: 85%;
  margin: .3rem auto;
`;

const SummariesContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  margin: auto;
  max-width: 768px;
  padding: .5rem;
`;

export default EditSummaries;
