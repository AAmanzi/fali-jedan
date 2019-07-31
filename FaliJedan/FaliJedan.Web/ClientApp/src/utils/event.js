import * as dateFormat from "./dateFormatting";

export const isEventValid = event => {
  const {
    sportId,
    currentNumberOfPlayers,
    targetNumberOfPlayers,
    dateOfEvent,
    startTime,
    endTime,
    locationLatitude,
    locationLongitude
  } = event;

  const dateNow = dateFormat.getDateNow();
  const timeNow = dateFormat.getTime(new Date());

  console.log(event);

  if (sportId === null) {
    return false;
  }

  if (!/^\d+$/.test(currentNumberOfPlayers)) {
    return false;
  }

  if (!/^\d+$/.test(targetNumberOfPlayers)) {
    return false;
  }

  if (currentNumberOfPlayers > targetNumberOfPlayers) {
    return false;
  }

  if (dateOfEvent < dateNow) {
    return false;
  }

  if (dateOfEvent === dateNow && startTime < timeNow) {
    return false;
  }

  if (startTime === "" || endTime === "") {
    return false;
  }

  if (startTime >= endTime) {
    return false;
  }

  if (locationLatitude === null || locationLongitude === null) {
    return false;
  }

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
