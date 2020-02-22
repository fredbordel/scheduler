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
        day: [...state.day, action.day]
      }
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: [...state.days, action.days],
        appointments: action.appointments
      }
    case SET_INTERVIEW:
      return {
        ...state,
        appointments: [...state.appointments, action.appointments]
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

// export default reducer;
