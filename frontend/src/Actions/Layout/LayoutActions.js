import { TOGGLE_SIDEBAR } from "../../constants/Layout/LayoutConstants";

export const toggleSidebar = () => async (dispatch) => {
  dispatch({
    type: TOGGLE_SIDEBAR,
  });
};
