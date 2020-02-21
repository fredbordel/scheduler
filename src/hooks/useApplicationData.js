import react, { useState, useEffect } from "react";

import axios from "axios";

/////////////////////////////////////////////////////////
//CUSTOM HOOKS THAT OWNS DATA MANAGEMENT.
//RESPONSIBLE FOR PASSING DATA TO OTHER COMPONENTS.
//Not soooo reusable because does really specific things.
/////////////////////////////////////////////////////////

export function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const reducer = (state, action) => {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: ""
        }
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: [],
          appointments: {
            "1": {
              id: 1,
              time: "12pm",
              interview: null
            }
          }
        }
      case SET_INTERVIEW:
        return {
          ...state,
          interviewers: {}
        }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  // const [state, setState] = useState({
  //   day: "",
  //   days: [],
  //   appointments: {
  //     "1": {
  //       id: 1,
  //       time: "12pm",
  //       interview: null
  //     }
  //   },
  //   interviewers: {},
  // });

  /////////////////////////////
  //NEED TO USE DISPATCH BELOW
  //dispatch({type: SET_DAY, day: day})
  /////////////////////////////
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      /////////////////////////////
      //NEED TO USE DISPATCH BELOW
      //dispatch({type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
      /////////////////////////////
      setState({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
    });
  }, []);

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
      /////////////////////////////
      //NEED TO USE DISPATCH BELOW
      //dispatch({type: SET_INTERVIEW, appointments: })
      /////////////////////////////
      .then(response => {
        setState({ ...state, appointments })
      })
  };

  function deleteAppointment(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => { })
  };
  return { state, setDay, bookInterview, deleteAppointment }
};





 //////////////////////////////////////////////////////////////////////
  // DATABASE RESET FOR APPOINTMENTS - Un-comment only when needed.
  // axios.get("http://localhost:8001/api/debug/reset").then(res => {
  //   return res;
  // })
  //////////////////////////////////////////////////////////////////////