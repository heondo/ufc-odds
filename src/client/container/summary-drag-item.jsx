/* eslint-disable react/display-name */
import React, { useImperativeHandle, useRef } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import styled from 'styled-components';

const ItemTypes = {
  SUMMARY: 'summary'
};

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
  text-decoration: ${props => props.canceled ? 'line-through' : null};
  @media(max-width: 767px) {
    font-size: .95em;
  }
`;

const CanceledCheck = styled.input`
  margin-right: 8px;
`;

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  color: 'black',
  cursor: 'move'
};

const convertName = name => {
  const split = name.split(', ');
  return [split[1], split[0]].join(' ');
};

const SummaryDragItem = React.forwardRef(
  ({ index, canceled, editFightCancel, competitors, isDragging, connectDragSource, connectDropTarget }, ref) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    const opacity = isDragging ? 0 : 1;
    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current
    }));
    const editHandle = () => {
      editFightCancel(index, canceled);
    };
    return (
      <SummaryContainer canceled={canceled} ref={elementRef} style={{ ...style, opacity }}>
        <CanceledCheck onChange={editHandle} type="checkbox" checked={canceled} />
        <FighterOne>{convertName(competitors[0].name)}</FighterOne>
        <Middle>vs</Middle>
        <FighterTwo>{convertName(competitors[1].name)}</FighterTwo>
      </SummaryContainer>
    );
  }
);

export default DropTarget(
  ItemTypes.SUMMARY,
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }
      // node = HTML Div element from imperative API
      const node = component.getNode();
      if (!node) {
        return null;
      }
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    ItemTypes.SUMMARY,
    {
      beginDrag: props => ({
        id: props.id,
        index: props.index
      })
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(SummaryDragItem)
);
