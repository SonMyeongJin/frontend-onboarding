let isBallDragging = false;

const getPokemonBallElement = () => {
  const element = document.querySelector('.pokeball-ball');
  if (!(element instanceof HTMLElement)) {
    console.error('Pokeball element not found');
  }
  return element as HTMLElement | null;
};
const getPokemonGoAreaElement = () => {
  const element = document.getElementById('go-pokemon');
  if (!(element instanceof HTMLElement)) {
    console.error('Pokemon Go area element not found');
  }
  return element as HTMLElement | null;
};
const getGochaTargetElement = () => {
  const element = document.getElementById('gocha-target');
  if (!(element instanceof HTMLElement)) {
    console.error('Gocha target element not found');
  }
  return element as HTMLElement | null;
};

function setupMonsterBallDrag() {
  const pokeball = getPokemonBallElement();

  pokeball?.addEventListener('mousedown', onMouseDownHandler);
  document.addEventListener('mousemove', onMouseMoveHandler);
  document.addEventListener('mouseup', onMouseUpHandler);
}

function onMouseDownHandler() {
  isBallDragging = true;
}
function onMouseUpHandler() {
  isBallDragging = false;
}
function onMouseMoveHandler(e: MouseEvent) {
  if (!isBallDragging) {
    return;
  }
  const pokeballButton = getPokemonBallElement();
  const pokeballDragArea = getPokemonGoAreaElement();
  const gochaTarget = getGochaTargetElement();
  const cursorX = e?.pageX;
  const cursorY = e?.pageY;
  if (
    !(pokeballButton && pokeballDragArea && gochaTarget) ||
    cursorX === undefined ||
    cursorY === undefined
  ) {
    return;
  }
  // console.log('Dragging pokeball to:', cursorX, cursorY);
  pokeballButton.style.left = `${cursorX - pokeballDragArea.offsetLeft - pokeballButton.offsetWidth / 2}px`;
  pokeballButton.style.top = `${cursorY - pokeballDragArea.offsetTop - pokeballButton.offsetHeight / 2}px`;

  const isIntersecting = checkRectIntersection(
    gochaTarget?.getBoundingClientRect(),
    pokeballButton.getBoundingClientRect(),
  );
  if (isIntersecting) {
    gochaTarget.classList.add('gocha');
  }
}

const checkRectIntersection = (rect1: DOMRect, rect2: DOMRect) => {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
};

export { setupMonsterBallDrag };
