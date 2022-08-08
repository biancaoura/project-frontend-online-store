const RATING_KEY = 'rating';

const readRatings = () => {
  if (!JSON.parse(localStorage.getItem(RATING_KEY))) {
    localStorage.setItem(RATING_KEY, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(RATING_KEY));
};

const saveRatings = (ratings) => localStorage
  .setItem(RATING_KEY, JSON.stringify(ratings));

export const getRatings = () => readRatings();

export const addRating = (item) => {
  if (item) {
    const ratings = readRatings();
    saveRatings([...new Set([...ratings, item])]);
  }
};

// export const removeCartItems = (item) => {
//   const cartItems = readCartItems();
//   saveCartItems(cartItems.filter((s) => s.id !== item.id));
// };

// export const removeOneItem = (item) => {
//   const cartItems = readRatings();
//   const reversed = cartItems.slice().reverse();
//   saveCartItems(reversed
//     .filter((_, index, array) => index !== array
//       .findIndex((obj) => obj.id === item.id)));
// };
