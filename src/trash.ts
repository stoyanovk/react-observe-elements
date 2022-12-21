export const data = [
  { id: 0, name: "product0", price: 0 },
  { id: 1, name: "product1", price: 1 },
  { id: 2, name: "product2", price: 2 },
  { id: 3, name: "product3", price: 3 },
  { id: 4, name: "product4", price: 4 },
  { id: 5, name: "product5", price: 5 }
];

export const data1 = [
  { id: 2, name: "product2", price: 2 },
  { id: 1, name: "product1", price: 1 },
  { id: 3, name: "product3", price: 3 },
  { id: 0, name: "product0", price: 0 },
  { id: 4, name: "product4", price: 4 },
  { id: 5, name: "product5", price: 5 },
  { id: 6, name: "product6", price: 6 }
];

export const prepareAnalyticPayload = (product: any) => {
  return {
    product_id: product.id,
    product_name: product.name,
    product_price: product.price
  };
};
