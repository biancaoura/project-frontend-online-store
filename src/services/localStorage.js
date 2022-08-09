const CART_ITEMS_KEY = 'cart_items';

const readCartItems = () => {
  if (!JSON.parse(localStorage.getItem(CART_ITEMS_KEY))) {
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(CART_ITEMS_KEY));
};

const saveCartItems = (cartItems) => localStorage
  .setItem(CART_ITEMS_KEY, JSON.stringify(cartItems));

export const getSavedCart = () => readCartItems();

export const addToCart = (item) => {
  const obj = {
    price: item.price,
    title: item.title,
    thumbnail: item.thumbnail,
    id: item.id,
    availableQuantity: item.available_quantity,
  };
  if (obj) {
    const cartItems = readCartItems();
    saveCartItems([...new Set([...cartItems, obj])]);
  }
};

export const removeCartItems = (item) => {
  const cartItems = readCartItems();
  saveCartItems(cartItems.filter((s) => s.id !== item.id));
};

export const removeOneItem = (item) => {
  const cartItems = readCartItems();
  const reversed = cartItems.slice().reverse();
  saveCartItems(reversed
    .filter((_, index, array) => index !== array
      .findIndex((obj) => obj.id === item.id)));
};
