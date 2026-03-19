function setupMonsterBallDrag() {
  const pokeballButton = document.querySelector('.pokeball-button');
  if (!(pokeballButton instanceof HTMLElement)) {
    return;
  }

  pokeballButton.addEventListener('dragstart', onDragStartHandler());
  pokeballButton.addEventListener('mousedown', onMouseDownHandler());
  pokeballButton.addEventListener('mousemove', onMouseMoveHandler());
  pokeballButton.addEventListener('mouseup', onMouseUpHandler());
}

function onDragStartHandler() {
  return (e: DragEvent) => {
    if (!e.dataTransfer) {
      return;
    }
    e.dataTransfer.setData('text/plain', 'pokeball');
  };
}

function onMouseDownHandler() {
  return (e: MouseEvent) => {
    const pokeballButton = e.currentTarget;
    if (!(pokeballButton instanceof HTMLElement)) {
      return;
    }
    pokeballButton.style.position = 'absolute';
    pokeballButton.style.left = `${e.pageX - pokeballButton.offsetWidth / 2}px`;
    pokeballButton.style.top = `${e.pageY - pokeballButton.offsetHeight / 2}px`;
  };
}

function onMouseMoveHandler() {
  return (e: MouseEvent) => {
    const pokeballButton = e.currentTarget;
    if (!(pokeballButton instanceof HTMLElement)) {
      return;
    }
    pokeballButton.style.left = `${e.pageX - pokeballButton.offsetWidth / 2}px`;
    pokeballButton.style.top = `${e.pageY - pokeballButton.offsetHeight / 2}px`;
  };
}

function onMouseUpHandler() {
  return (e: MouseEvent) => {
    const pokeballButton = e.currentTarget;
    if (!(pokeballButton instanceof HTMLElement)) {
      return;
    }
    pokeballButton.style.position = '';
    pokeballButton.style.left = '';
    pokeballButton.style.top = '';
  };
}

export { setupMonsterBallDrag };
