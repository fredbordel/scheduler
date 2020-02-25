import react, { useState, useEffect, useReducer } from "react";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_DAYS
} from "reducers/application";
import axios from "axios";

//////////////////////////////////////////////////////////
//CUSTOM HOOKS THAT OWNS DATA MANAGEMENT.
//RESPONSIBLE FOR PASSING DATA TO OTHER COMPONENTS.
//Not really reusable because does really specific things.
//////////////////////////////////////////////////////////

export default function useApplicationData() {


  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {},
    spots: 0
  });


  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      /////////////////////////////
      //NEED TO USE DISPATCH BELOW
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })
      /////////////////////////////
      // setState({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    });
  }, []);



  const setDay = day => dispatch({ type: SET_DAY, day });

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
        dispatch({ type: SET_INTERVIEW, appointments })
        // dispatch({ type: SET_SPOTS, spots })
        axios.get("http://localhost:8001/api/days")
          .then(res => {
            dispatch({ type: SET_DAYS, days: res.data })
          })
      })
  }

  function deleteAppointment(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => { })
      .then(response => {
        axios.get("http://localhost:8001/api/days")
          .then(res => {
            dispatch({ type: SET_DAYS, days: res.data })
          })
      })
  };
  return { state, setDay, bookInterview, deleteAppointment }
};





//////////////////////////////////////////////////////////////////////
// DATABASE RESET FOR APPOINTMENTS - Un - comment only when needed.
// axios.get("http://localhost:8001/api/debug/reset").then(res => {
//   return res;
// })
  //////////////////////////////////////////////////////////////////////