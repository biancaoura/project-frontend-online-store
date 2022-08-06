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
  if (item) {
    const cartItems = readCartItems();
    saveCartItems([...new Set([...cartItems, item])]);
  }
};

export const removeCartItems = (item) => {
  const cartItems = readCartItems();
  saveCartItems(cartItems.filter((s) => s.id !== item.id));
};