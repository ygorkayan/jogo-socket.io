export const playersOnlineWithout = (playersOnline: any, CurrentId: any) => {
  const newPlayersOnline = new Map(playersOnline);
  newPlayersOnline.delete(CurrentId);
  return newPlayersOnline;
};