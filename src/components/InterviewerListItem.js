import React from "react";

import "components/InterviewerListItem.scss";

import classnames from "classnames/bind";

export default function InterviewListItem(props) {

  const interviewerClass = classnames("interviewers__item", {
    "interviewer__item--selected": props.selected,
  })

return (
  <li onClick={() => props.setInterviewer(props.name)} 
    className={interviewerClass}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.name}
</li>
)};

