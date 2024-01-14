const iconList = [
  'avocado.png',
  'cat.png',
  'dragon.png',
  'elephant.png',
  'fox.png',
  'monkey.png',
  'panda.png',
  'rabbit.png',
  'watermelon.png'
];

function getRandomIcon() {
  const index = Math.floor(Math.random() * iconList.length);
  return iconList[index];
}

export default getRandomIcon;