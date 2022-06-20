import moment from "moment";

export const displayDateFormate = (date) => {
  let formattedDate = "";
  if (date) {
    formattedDate = moment(date).format("MMM Do YYYY");
  }
  return formattedDate;
};

export const dateFormate = (date) => {
  let formattedDate = "";
  if (date) {
    formattedDate = moment(date).toISOString();
  }
  return formattedDate;
};
