import React from "react";
import DayListItem from "components/DayListItem";

const dayListItems = function (props) {

  props.days.map(day => {
    return <DayListItem
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay} />
  })
  return (
    <ul>
      {dayListItems}
    </ul>
  )
};


