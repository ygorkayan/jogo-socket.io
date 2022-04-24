const body = document.querySelector('body');
const socket = io('ws://localhost:4000');
const playersOnline = new Map();
let player;

body.addEventListener('keydown', event => {
  eventOfMovement(event);
  updateScreen(body, player, playersOnline);
});

socket.on('player-login', data => {
  player = data.player;

  data.playersOnline.forEach(player => {
    playersOnline.set(player.id, player);
  });

  updateScreen(body, player, playersOnline);
});

socket.on('clientMovement', data => {
  console.log(playersOnline);
  const playerCurrent = playersOnline.get(data.who);
  playerCurrent.position.top = data.newPosition.y;
  playerCurrent.position.left = data.newPosition.x;
  updateScreen(body, player, playersOnline);
});

socket.on('players-online', data => {
  playersOnline.clear();
  data.forEach(player => playersOnline.set(player.id, player));
  updateScreen(body, player, playersOnline);
});
