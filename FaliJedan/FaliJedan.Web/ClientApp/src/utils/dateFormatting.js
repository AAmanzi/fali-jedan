export const getDateNow = () => {
  const date = new Date();
  return (
    date.getFullYear().toString() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, 0) +
    "-" +
    date
      .getDate()
      .toString()
      .padStart(2, 0)
  );
};

export const getDate = dateString => {
  const date = new Date(dateString);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  return day + "." + month + "." + year;
};

export const getFormattedDate = dateString => {
  const date = new Date(dateString);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  return year + "-" + month + "-" + day;
};

export const getTime = dateString => {
  const date = new Date(dateString);

  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return hours + ":" + minutes;
};
