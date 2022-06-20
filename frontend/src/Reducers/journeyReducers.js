import {
  JOURNEY_LIST_REQUEST,
  JOURNEY_LIST_SUCCESS,
  JOURNEY_LIST_FAIL,
  JOURNEY_DETAILS_REQUEST,
  JOURNEY_DETAILS_SUCCESS,
  JOURNEY_DETAILS_FAIL,
  JOURNEY_UPDATE_REQUEST,
  JOURNEY_UPDATE_SUCCESS,
  JOURNEY_UPDATE_FAIL,
} from "../constants/journeyConstants";

export const journeyListReducer = (state = { journeys: [] }, action) => {
  switch (action.type) {
    case JOURNEY_LIST_REQUEST:
      return { loading: true, journeys: [] };
    case JOURNEY_LIST_SUCCESS:
      return {
        loading: false,
        journeys: action.payload.journeys,
        pendingJourneyCount: action.payload.pendingJourneyCount,
        acceptedJourneyCount: action.payload.acceptedJourneyCount,
        rejectedJourneyCount: action.payload.rejectedJourneyCount,
      };
    case JOURNEY_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const journeyUpdateReducers = (state = { journey: {} }, action) => {
  switch (action.type) {
    case JOURNEY_UPDATE_REQUEST:
      return { loading: true };
    case JOURNEY_UPDATE_SUCCESS:
      return { loading: false, success: true, journey: action.payload };
    case JOURNEY_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const journeyDetailsReducer = (state = { journeys: [] }, action) => {
  switch (action.type) {
    case JOURNEY_DETAILS_REQUEST:
      return { loading: true, journeys: [] };
    case JOURNEY_DETAILS_SUCCESS:
      return { loading: false, journeys: action.payload };
    case JOURNEY_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
