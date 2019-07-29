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

export const eventDto = dto => {
  return {
    sport: dto.event.sport,
    host: dto.host,
    dateOfEvent: dateFormat.getDate(dto.event.dateOfEvent),
    startTime: dateFormat.getTime(dto.event.startTime),
    endTime: dateFormat.getTime(dto.event.endTime),
    currentPlayers: dto.event.currentNumberOfPlayers,
    targetPlayers: dto.event.targetNumberOfPlayers,
    coordinates: [dto.event.locationLatitude, dto.event.locationLongitude],
    description: dto.event.description,
    targetSkillLevel: dto.event.targetSkillLevel
  };
};
