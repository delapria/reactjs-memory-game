export function CreatCards() {
  const cards = [];
  let countImages = 1;
  for (let index = 1; index <= 20; index++) {
    cards.push({
      id: String(index),
      urlBack: 'backgroundCard.png',
      urlFront: `${countImages}.png`,
      isFlipped: false,
      canFlip: true,
    });
    if (countImages === 10) {
      countImages = 0;
    }
    countImages++;
  }
  return cards;
}

export function shuffleArray(cards) {
  return cards.sort(() => 0.5 - Math.random());
}
