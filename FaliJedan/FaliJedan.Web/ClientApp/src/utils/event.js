export const isEventValid = event => {
  // TODO
  return true;
};

export const newEvent = (
  sport,
  currentNumberOfPlayers,
  targetNumberOfPlayers,
  skillLevel,
  isInstantJoin,
  date,
  startTime,
  endTime,
  coordinates
) => {
  return {
    sport,
    currentNumberOfPlayers,
    targetNumberOfPlayers,
    skillLevel,
    isInstantJoin,
    date,
    startTime,
    endTime,
    coordinates
  };
};
