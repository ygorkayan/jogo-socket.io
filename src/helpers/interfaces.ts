export interface IPlayers {
  id: string;
  color: string;
  position: { x: number; y: number };
  socket: any;
}

export interface IMovement {
  x: number,
  y: number
}

export type IPlayersConnected = Array<IPlayers>