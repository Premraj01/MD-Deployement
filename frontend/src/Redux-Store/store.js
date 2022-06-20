import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { adminLoginReducer } from "../Reducers/adminReducer";
import { LayoutReducer } from "../Reducers/Layout/LayoutReducer";
import {
  journeyDetailsReducer,
  journeyListReducer,
  journeyUpdateReducers,
} from "../Reducers/journeyReducers";
import {
  carListReducer,
  carDetailsReducer,
  carReadingReducer,
  carAddMaintenanceReducer,
  carUpdateReducer,
  carRegisterReducer,
  carFormReducer,
  carMaintenanceDetailsReducer,
  carUpdateMaintenanceReducer,
} from "../Reducers/carReducers";
import {
  driverDetailsReducer,
  driverRegisterReducer,
  driversListReducer,
  driverUpdateReducers,
} from "../Reducers/driverReducers";
import {
  expenseListReducer,
  updateDepartmentReducer,
} from "../Reducers/expenseReducers";

const reducer = combineReducers({
  adminLogin: adminLoginReducer,
  journeyList: journeyListReducer,
  journeyDetails: journeyDetailsReducer,
  journeyUpdate: journeyUpdateReducers,
  driversList: driversListReducer,
  driverRegister: driverRegisterReducer,
  driverDetails: driverDetailsReducer,
  driverUpdate: driverUpdateReducers,
  carRegister: carRegisterReducer,
  carList: carListReducer,
  carDetails: carDetailsReducer,
  carReading: carReadingReducer,
  carUpdate: carUpdateReducer,
  carAddMaintenance: carAddMaintenanceReducer,
  carForm: carFormReducer,
  carMaintenanceDetails: carMaintenanceDetailsReducer,
  carUpdateMaintenance: carUpdateMaintenanceReducer,
  expenseList: expenseListReducer,
  updateDepartment: updateDepartmentReducer,
  layout: LayoutReducer,
  adminLogin: adminLoginReducer,
});

const adminInfoFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const initialState = {
  adminLogin: {
    adminInfo: adminInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
