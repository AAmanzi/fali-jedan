export const isEventValid = event => {

};

export const newEvent = (
  sport,
  currentNumberOfPlayers,
  targetNumberOfPlayers,
  skillLevel,
  isInstantJoin
) => {
  return {
    sport,
    currentNumberOfPlayers,
    targetNumberOfPlayers,
    skillLevel,
    isInstantJoin
  };
};
