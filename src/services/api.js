export async function getCategories() {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const endpointQuery = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(endpointQuery);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategory(categoryId) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function getProductById(productId) {
  const endpoint = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}
