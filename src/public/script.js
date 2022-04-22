const form = document.querySelector('#form');
const inputX = form.querySelector('#x');
const inputY = form.querySelector('#y');

const socket = io('ws://localhost:4000');
let player;
const playersOnline = new Map();

socket.on('login', data => {
  player = data;
  console.log(player);
});

socket.on('clientMovement', data => {
  const player = players.get(data.who);
  player.position.x = data.newPosition.x;
  player.position.y = data.newPosition.y;
  players.set(data.who, player);
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const movement = {
    x: inputX.value || 0,
    y: inputY.value || 0,
  };

  socket.emit('movement', movement);
});
