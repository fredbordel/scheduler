import React from "react";

import DayListItem from "components/DayListItem";


// Take in 3 props: days(array), day(string), setDay(function)
export default function DayList(props) {

  const dayListItems = props.days.map(day => {
      return <DayListItem 
            name={day.name} 
            spots={day.spots} 
            selected={day.name === props.day}
            setDay={props.setDay}  />
})
  return (
    <ul>
      {dayListItems}
    </ul>
  )
};

