export function createBoxes(amount) {
  let boxes = [];
  for (let i=0; i < amount; i++) {
    const id = i;
    const x = getRandomInt(0, 500);
    const y = getRandomInt(0, 500);
    const box = { id, x, y };
    boxes.push(box);
  }
  return boxes;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

