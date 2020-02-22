import { actions } from "@storybook/addon-actions";

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {

  console.log("HERE INSIDE REDUCER FUNCTION")

  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        // Used syntax below from Dom's example
        day: action.day
      }
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: [...state.days, ...action.days],
        appointments: action.appointments,
        interviewers: action.interviewers
      }
    case SET_INTERVIEW:
      return {
        ...state,
        appointments: action.appointments
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

// export default reducer;
