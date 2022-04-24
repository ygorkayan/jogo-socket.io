const eventOfMovement = event => {
  if (player) {
    const speed = 20;
    let x = player.position.x;
    let y = player.position.y;

    switch (event.code) {
      case 'ArrowLeft':
        y = y - speed;
        break;

      case 'ArrowUp':
        x = x - speed;
        break;

      case 'ArrowRight':
        y = y + speed;
        break;

      case 'ArrowDown':
        x = x + speed;
        break;
    }

    player.position.x = x;
    player.position.y = y;

    socket.emit('movement', { x, y });
  }
};

const updateScreen = (body, player, playersOnline) => {
  deleteAllBox(body);
  body.appendChild(createPlayer(player));
  playersOnline.forEach(player => body.appendChild(createPlayer(player)));
};

const deleteAllBox = body => {
  const allBox = body.querySelectorAll('.box');
  allBox.forEach(box => {
    box.remove();
  });
};

const createPlayer = player => {
  const { id, color, position } = player;

  const box = document.createElement('div');
  box.setAttribute('playerId', id);
  box.classList.add('box');

  box.style.backgroundColor = color;
  box.style.top = `${position.x}px`;
  box.style.left = `${position.y}px`;

  return box;
};
