import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay } from "helpers/selectors";



export default function Application(props) {

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    let firstRequest = "http://localhost:8001/api/days";
    let secondRequest = "http://localhost:8001/api/appointments ";
    Promise.all([
      Promise.resolve(axios.get(firstRequest)),
      Promise.resolve(axios.get(secondRequest)),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }));
    });
  });

  const appointmentArray = getAppointmentsForDay(state, state.day.name);

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
          appointmentArray.map(appointment => {
            return (
              appointment.id ?
                < Appointment
                  key={appointment.id}
                  {...appointment} /> :
                < Appointment
                  time={props.time} />
            )
          })
        }

      </section>
    </main >
  );
}
