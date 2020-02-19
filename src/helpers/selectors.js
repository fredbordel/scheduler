// import { objectTypeAnnotation } from "@babel/types";


export function getAppointmentsForDay(state, singleDay) {
  let result = [];
  const appointmentsForDay = state.days.filter(day => day.name === singleDay)
  if (appointmentsForDay.length > 0) {
    for (let appointment of appointmentsForDay[0].appointments) {
      result.push(state.appointments[appointment])
    }
  }
  return result;
};


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return { ...interview, interviewer: state.interviewers[interview.interviewer] }
};

