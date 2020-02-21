import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";



export default function Application(props) {

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      setState({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    });
  }, []);

  //////////////////////////////////////////////////////////////////////
  // DATABASE RESET FOR APPOINTMENTS
  // axios.get("http://localhost:8001/api/debug/reset").then(res => {
  //   return res;
  // })
  //////////////////////////////////////////////////////////////////////


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {
      interview
    })
      .then(response => {
        setState({ ...state, appointments })
      }).catch(error => {
        console.log("SOWYY SERVER ERROR", error)
      })
  };

  function deleteAppointment(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        console.log(response)
      }).catch(error => {
        console.log("SORRY ERRORRRRRR")
      })
  };



  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day);
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
          time={props.time} />
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
      </section>
    </main >
  );
}
