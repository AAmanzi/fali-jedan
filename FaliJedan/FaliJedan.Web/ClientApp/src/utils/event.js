import * as dateFormat from "./dateFormatting";
import { ERROR } from "../constants";

export const getEventError = event => {
  const {
    sportId,
    currentNumberOfPlayers,
    targetNumberOfPlayers,
    eventStart,
    eventEnd,
    locationLatitude,
    locationLongitude
  } = event;

  const dateNow = dateFormat.getDateNow();
  const timeNow = dateFormat.getTime(new Date());

  if (sportId === null || eventStart === null || eventEnd === null) {
    return ERROR.isNull;
  }

  if (!/^\d+$/.test(currentNumberOfPlayers)) {
    return ERROR.notNumber;
  }

  if (!/^\d+$/.test(targetNumberOfPlayers)) {
    return ERROR.notNumber;
  }

  if (currentNumberOfPlayers > targetNumberOfPlayers) {
    return ERROR.numberDifference;
  }

  if (eventStart < dateNow) {
    return ERROR.dateLessThanNow;
  }

  if (eventStart === dateNow && eventStart < timeNow) {
    return ERROR.dateLessThanNow;
  }

  if (eventStart >= eventEnd) {
    return ERROR.timeDifference;
  }

  if (locationLatitude === null || locationLongitude === null) {
    return ERROR.isNull;
  }

  return undefined;
};

export const handleEventFormError = error => {
  switch (error) {
    case ERROR.isNull:
      alert("Some required fields are missing!");
      break;
    case ERROR.notNumber:
      alert("Invalid number of current/target players!");
      break;
    case ERROR.numberDifference:
      alert("There can't be more current than target players!");
      break;
    case ERROR.dateLessThanNow:
      alert("You cannot create an event occurring before now!");
      break;
    case ERROR.timeDifference:
      alert("An event cannot end before it has begun!");
      break;
    default:
      return;
  }
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

export const eventDto = dto => {
  return {
    sport: dto.event.sport,
    host: dto.host,
    dateOfEvent: dateFormat.getDate(dto.event.eventStart),
    startTime: dateFormat.getTime(dto.event.eventStart),
    endTime: dateFormat.getTime(dto.event.eventEnd),
    currentPlayers: dto.event.currentNumberOfPlayers,
    targetPlayers: dto.event.targetNumberOfPlayers,
    coordinates: [dto.event.locationLatitude, dto.event.locationLongitude],
    description: dto.event.description,
    targetSkillLevel: dto.event.targetSkillLevel,
  };
};
