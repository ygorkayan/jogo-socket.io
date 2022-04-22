const body = document.querySelector('body');
const socket = io('ws://localhost:4000');
const playersOnline = new Map();
let player;

body.addEventListener('keydown', eventOfMovement);

socket.on('login', data => {
  player = createPlayer(data.player);
  drawInScreen(body, player, data.player.position);

  data.playersOnline.forEach(player => {
    const temp = createPlayer(player);

    playersOnline.set(player.id, temp);
    drawInScreen(body, temp, data.player.position);
  });
});

socket.on('clientMovement', data => {
  const player = playersOnline.get(data.who);
  player.style.top = data.newPosition.y;
  player.style.left = data.newPosition.x;
});
