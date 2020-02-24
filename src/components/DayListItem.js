import React, { useEffect } from "react";
import "components/DayListItem.scss";
import classnames from "classnames/bind";



export default function DayListItem(props) {

  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return `${spots} spot remaining`;
    } else if (spots === 2) {
      return `${spots} spots remaining`;
    } else {
      return `${spots} spots remaining`;
    }
  };

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  return (
    <li onClick={() => props.setDay(props.name)}
      className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}




