export const isEventValid = event => {
  // TODO
  return true;
};

export const newEvent = (
  sportId,
  currentNumberOfPlayers,
  targetNumberOfPlayers,
  targetSkillLevel,
  isInstantJoin,
  dateOfEvent,
  startTime,
  endTime,
  locationLatitude,
  locationLongitude
) => {
  let eventStart = dateOfEvent + "T" + startTime;
  let eventEnd = dateOfEvent + "T" + endTime;

  if (dateOfEvent === "") {
    eventStart = null;
    eventEnd = null;
  }

  if (startTime === "") {
    eventStart = null;
  }

  if (endTime === "") {
    eventEnd = null;
  }

  return {
    sportId,
    currentNumberOfPlayers,
    targetNumberOfPlayers,
    targetSkillLevel,
    isInstantJoin,
    eventStart,
    eventEnd,
    locationLatitude,
    locationLongitude
  };
};
