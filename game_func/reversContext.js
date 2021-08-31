const newArrCards = (myCard, allCards) => {
  try {
    const newArr = allCards.filter((item) =>
      myCard.some((item2) => item.name == item2.name)
    );

    return newArr;
  } catch (error) {
    return { data: error };
  }
};

const getRandomCard = (index, acc = [], allCards) => {
  try {
    if (index === 0 || allCards == []) {
      return acc;
    }
    const random = Math.floor(Math.random() * allCards.get(id).length);
    acc = [...acc, allCards[random]];
    const newArr = allCards.filter((item, index) => index !== random);

    return getRandomCard(index - 1, acc, newArr);
  } catch (error) {
    return { data: error };
  }
};

module.exports = { newArrCards, getRandomCard };
