import * as dateFormat from "./dateFormatting";

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
  return {
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
  };
};

export const eventDto = event => {
  return {
    sport: event.sport,
    // host: event.hostName,
    dateOfEvent: dateFormat.getDate(event.dateOfEvent),
    startTime: dateFormat.getTime(event.startTime),
    endTime: dateFormat.getTime(event.endTime),
    currentPlayers: event.currentNumberOfPlayers,
    targetPlayers: event.targetNumberOfPlayers,
    coordinates: [event.locationLatitude, event.locationLongitude],
    description: event.description,
    targetSkillLevel: event.targetSkillLevel
  };
};
