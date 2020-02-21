import React from "react";
import axios from "axios";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm"
import { useVisualMode } from "../../hooks/useVisualMode";
import { statement } from "@babel/template";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      }).catch(() => {
        console.log("ERROR OUPSI")
      });
  };

  function deleting(appointmentId) {
    transition(SAVING)
    props.deleteAppointment(appointmentId)
      .then(() => {
        transition(EMPTY)
      }).catch(err => {
        console.log("WOOPS SORRY")
      })
  };


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save} />}
      {mode === SAVING && <Status />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete this appointment?"
        onConfirm={() => deleting(props.id)} />}
      {mode === EDIT && <Form interviewers={props.interviewers}
        interviewer={props.interview} student={props.student} onCancel={() => back(EMPTY)} onSave={save} />}
      {mode === SHOW && (
        <Show
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )
      }
    </article >
  )
};

