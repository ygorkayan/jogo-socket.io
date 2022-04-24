export interface IPlayers {
  id: string;
  color: string;
  position: { x: number; y: number };
  socket?: any;
}

export type TMovement = 'ArrowLeft' | 'ArrowUp' | 'ArrowRight' | 'ArrowDown';

export type IPlayersConnected = Array<IPlayers>;

export interface IMovementReturn {
  x: number;
  y: number;
}
