const readRatings = (id) => {
  if (!JSON.parse(localStorage.getItem(id))) {
    localStorage.setItem(id, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(id));
};

const saveRatings = (id, ratings) => localStorage
  .setItem(id, JSON.stringify(ratings));

export const getRatings = (id) => readRatings(id);

export const addRating = (id, item) => {
  if (item) {
    const ratings = readRatings(id);
    saveRatings(id, [...ratings, item]);
  }
};
