const eventOfMovement = (event) => {
  if (player) {
    const speed = 20;
    let top = Number(player.style.top.replace('px', ''));
    let left = Number(player.style.left.replace('px', ''));

    switch (event.keyCode) {
      case 37:
        // seta para esquerda
        left = `${left - speed}px`;
        break;

      case 38:
        // seta para cima
        top = `${top - speed}px`;
        break;

      case 39:
        // seta para direita
        left = `${left + speed}px`;
        break;

      case 40:
        // seta para baixo
        top = `${top + speed}px`;
        break;
    }

    player.style.top = top;
    player.style.left = left;

    socket.emit('movement', { x: left, y: top });
  }
}

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

const drawInScreen = (body, player, position) => {
  const notOnScreen = !body.querySelector(`[playerId='${player.id}']`);

  if (notOnScreen) {
    body.appendChild(player);
  }

  player.style.top = `${position.x}px`;
  player.style.left = `${position.y}px`;
};
