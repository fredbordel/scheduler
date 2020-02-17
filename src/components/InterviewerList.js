import React from "react";
import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss";


export default function InterviewerList(props) {

  const interviewerListItems = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        avatar={interviewer.avatar}
        name={interviewer.name} 
        selected={interviewer.id === props.interviewer}
        setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    );
  });

return (
  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {interviewerListItems}
  </ul>
</section>
)};