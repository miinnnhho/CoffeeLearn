function getProducts() {
  const response = fetch('/assets/products.json');
  const data = response.json();
  return data;
}
