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
