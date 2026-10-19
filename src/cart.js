const PROMO_CODE = 'SAVE10';
const PROMO_DISCOUNT_PERCENT = 10;
const PROMO_MIN_SUBTOTAL = 20000;
const FREE_DELIVERY_MIN_SUBTOTAL = 50000;
const DELIVERY_PRICE = 30000;

function assertValidQuantity(quantity, stock) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество должно быть положительным целым числом');
  }
  if (quantity > stock) {
    throw new RangeError('Количество не может превышать остаток на складе');
  }
}

function addToCart(cart, product, quantity = 1) {
  const existing = cart.find((item) => item.id === product.id);
  const nextQuantity = (existing ? existing.quantity : 0) + quantity;
  assertValidQuantity(quantity, product.stock);
  assertValidQuantity(nextQuantity, product.stock);

  if (!existing) return [...cart, { ...product, quantity }];
  return cart.map((item) => (item.id === product.id ? { ...item, quantity: nextQuantity } : item));
}

function changeQuantity(cart, productId, quantity) {
  const item = cart.find(({ id }) => id === productId);
  if (!item) return [...cart];
  assertValidQuantity(quantity, item.stock);
  return cart.map((current) => (current === item ? { ...current, quantity } : current));
}

function removeFromCart(cart, productId) {
  return cart.filter(({ id }) => id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
}

function calculateOrderTotal(cart, promoCode = '') {
  const subtotal = calculateCartSubtotal(cart);
  const isPromoApplied =
    String(promoCode).trim().toUpperCase() === PROMO_CODE && subtotal >= PROMO_MIN_SUBTOTAL;
  const discount = isPromoApplied ? Math.round((subtotal * PROMO_DISCOUNT_PERCENT) / 100) : 0;
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_MIN_SUBTOTAL ? 0 : DELIVERY_PRICE;

  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
