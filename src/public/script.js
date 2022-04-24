const body = document.querySelector('body');
const socket = io('ws://localhost:4000');
const playersOnline = new Map();
let player;

body.addEventListener('keydown', event => {
  socket.emit('current-player-movement', event.code);
  updateScreen(body, player, playersOnline);
});

socket.on('player-login', data => {
  player = data.player;

  data.playersOnline.forEach(player => {
    playersOnline.set(player.id, player);
  });

  updateScreen(body, player, playersOnline);
});

socket.on('player-movement', data => {
  const { who, newPosition } = data;

  if (who === player.id) {
    player.position.y = newPosition.y;
    player.position.x = newPosition.x;
  } else {
    const playerCurrent = playersOnline.get(who);
    playerCurrent.position.y = newPosition.y;
    playerCurrent.position.x = newPosition.x;
  }

  updateScreen(body, player, playersOnline);
});

socket.on('players-online', data => {
  playersOnline.clear();
  data.forEach(player => playersOnline.set(player.id, player));
  updateScreen(body, player, playersOnline);
});
