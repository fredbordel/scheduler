import React from "react";
import axios from "axios";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm"
import Error from "components/Appointment/Error"
import { useVisualMode } from "../../hooks/useVisualMode";
import { statement } from "@babel/template";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE"

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
        transition(ERROR_SAVE)
        console.log("ERROR IN THE SAVE FUNCTION")
      });
  };

  function deleting(appointmentId) {
    transition(SAVING)
    props.deleteAppointment(appointmentId)
      .then(() => {
        transition(EMPTY)
      }).catch(err => {
        transition(ERROR_DELETE)
        console.log("ERROR IN THE DELETING FUNCTION")
      })
  };


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save} />}
      {mode === SAVING && <Status />}
      {mode === ERROR_SAVE && <Error />}
      {mode === ERROR_DELETE && <Error />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete this appointment?"
        onConfirm={() => deleting(props.id)} />}
      {mode === EDIT && <Form interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id} name={props.interview.student} onCancel={() => back(EMPTY)} onSave={save} />}
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

