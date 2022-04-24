import { IPlayersConnected } from './interfaces';

export const playersOnlineWithout = (playersOnline: IPlayersConnected, CurrentId: string) =>
  playersOnline.filter(player => player.id !== CurrentId);

export const colorRandom = () => {
  const colors: Record<number, string> = {
    0: '#F0F8FF',
    1: '#FAEBD7',
    2: '#00FFFF',
    3: '#7FFFD4',
    4: '#F0FFFF',
    5: '#F5F5DC',
    6: '#FFE4C4',
    7: '#000000',
    8: '#FFEBCD',
    9: '#0000FF',
    10: '#8A2BE2',
    11: '#A52A2A',
    12: '#DEB887',
    13: '#5F9EA0',
    14: '#7FFF00',
    15: '#D2691E',
    16: '#FF7F50',
    17: '#6495ED',
    18: '#FFF8DC',
    19: '#DC143C',
    20: '#00FFFFF',
    21: '#00008B',
  };

  return colors[Math.floor(Math.random() * 22)];
};
