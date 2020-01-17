import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styled from 'styled-components';
import update from 'immutability-helper';
import SummaryDragItem from '../container/summary-drag-item';

const EditSummaries = props => {
  {
    const { id: seasonID } = props.match.params;
    const [summaries, setSummaries] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
      getSeasonData();
    }, []);

    const handleSubmitChanges = async function () {
      setIsSubmitting(true);
      try {
        const axiosBody = {
          seasonID,
          newOrder: summaries.map((s, i) => ({
            sportEventID: s.id,
            sortOrder: i,
            sportEventStatus: s.sport_event_status
          }))
        };
        const sendOrderData = await axios.post('/api/summaries/reorder', axiosBody);
        if (sendOrderData.data.success) {
          setIsSubmitting(false);
        }
      } catch (err) {
        setIsSubmitting(false);
        console.error(err);
      }
    };

    const getSeasonData = async () => {
      try {
        const response = await axios.get(`/api/seasons/${seasonID}`);
        if (response.data.summaries && !response.data.summaries.length) {
          return setSummaries(Object.values(response.data.summaries).reduce((a, b) => [...a, ...b]));
        }
        setSummaries(response.data.summaries);
      } catch (err) {
        console.error(err);
      }
    };

    const editFightCancel = (index, currentCancelValue) => {
      if (!currentCancelValue) { // if its false, or not cancelled;
        setSummaries(update(summaries, {
          [index]: {
            sport_event_status: {
              status: { $set: 'closed' },
              match_status: { $set: 'cancelled' }
            }
          }
        }));
      } else { // if the fight is going from cancelled to uncancelled
        const startTime = new Date(summaries[index].sport_event.start_time);
        const nowTime = new Date();
        if (startTime > nowTime) {
          setSummaries(update(summaries, {
            [index]: {
              sport_event_status: {
                status: { $set: 'not_started' },
                match_status: { $set: 'not_started' }
              }
            }
          }));
        } else {
          setSummaries(update(summaries, {
            [index]: {
              sport_event_status: {
                status: { $set: 'closed' },
                match_status: { $set: 'ended' }
              }
            }
          }));
        }
      }
      // if (nowTime > startTime) { // fights that have happened
      // I want to say the
      // }
      // console.log(startTime > nowTime);
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

    const isCanceled = statusObject => {
      return (!!(statusObject.status === 'closed' && statusObject.match_status === 'cancelled'));
    };

    return summaries ? (
      <SummariesContainer>
        <div>
          {summaries[0].sport_event.sport_event_context.season.name.replace(/\d{4}\s*$/, '')}
        </div>
        <CanceledHeader>
          canceled
        </CanceledHeader>
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
                canceled={isCanceled(s.sport_event_status)}
                summaryOrder={s.s_order}
                editFightCancel={editFightCancel}
              />
            ))}
          </div>
        </DndProvider>
        {!isSubmitting ? (
          <SubmitChanges onClick={handleSubmitChanges}>
            Save
          </SubmitChanges>
        ) : <div>saving</div>}
      </SummariesContainer>
    ) : null;
  }
};

const SubmitChanges = styled.button`
  padding: .5rem;
`;

const CanceledHeader = styled.div`
  position: absolute;
  left: 0;
  top: .5rem
`;

const Divider = styled.div`
  border-bottom: 2px solid grey;
  width: 85%;
  margin: .3rem auto;
`;

const SummariesContainer = styled.div`
  display: flex;
  text-align: center;
  position: relative;
  flex-direction: column;
  color: black;
  margin: auto;
  max-width: 768px;
  padding: .5rem;
`;

export default EditSummaries;
