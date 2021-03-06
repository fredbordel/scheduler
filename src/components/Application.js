import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import useApplicationData from "../hooks/useApplicationData"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

///////////////////////////////////////////////////////
//HERE IS THE HIGHER KINGDOM OF MY SCHEDULER... WELCOME.
///////////////////////////////////////////////////////

export default function Application() {

  const {
    state,
    setDay,
    bookInterview,
    deleteAppointment
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day);
  // Create schedule variable that will hold appointement list and that will
  // be references further down.
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      appointment.id ?
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          deleteAppointment={deleteAppointment}
        />
        :
        < Appointment
          time={state.time} />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {
          schedule
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main >
  );
};
