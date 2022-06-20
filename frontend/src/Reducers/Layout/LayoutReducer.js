import { TOGGLE_SIDEBAR } from "../../constants/Layout/LayoutConstants";

export const LayoutReducer = (state = { isSidebarOpened: true }, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, isSidebarOpened: !state.isSidebarOpened };
    default: {
      return state;
      //   throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
