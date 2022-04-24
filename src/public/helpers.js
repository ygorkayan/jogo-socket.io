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
