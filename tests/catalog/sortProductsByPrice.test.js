const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

const ids = (list) => list.map(({ id }) => id);
const pick = (list) => products.filter(({ id }) => list.includes(id));
const pickInOrder = (list) => list.map((id) => products.find((product) => product.id === id));

describe('sortProductsByPrice', () => {
  describe('по возрастанию', () => {
    test('сортирует все товары по направлению asc', () => {
      expect(ids(sortProductsByPrice(products, 'asc'))).toEqual([3, 6, 5, 4, 2, 1]);
    });

    test('сортирует по возрастанию, если направление не передано', () => {
      expect(ids(sortProductsByPrice(products))).toEqual([3, 6, 5, 4, 2, 1]);
    });

    test('сортирует товары с ID [1, 3, 4]', () => {
      expect(ids(sortProductsByPrice(pickInOrder([1, 3, 4]), 'asc'))).toEqual([3, 4, 1]);
    });
  });

  describe('по убыванию', () => {
    test('сортирует все товары по направлению desc', () => {
      expect(ids(sortProductsByPrice(products, 'desc'))).toEqual([1, 2, 4, 5, 6, 3]);
    });

    test('сортирует товары с ID [3, 1, 4]', () => {
      expect(ids(sortProductsByPrice(pickInOrder([3, 1, 4]), 'desc'))).toEqual([1, 4, 3]);
    });

    test('сортирует товары с ID [5, 2, 6]', () => {
      expect(ids(sortProductsByPrice(pickInOrder([5, 2, 6]), 'desc'))).toEqual([2, 5, 6]);
    });
  });

  describe('исходный массив не меняется', () => {
    test('после вызова с asc', () => {
      const source = pick([1, 3, 4]);
      sortProductsByPrice(source, 'asc');
      expect(ids(source)).toEqual([1, 3, 4]);
    });

    test('после вызова с desc', () => {
      const source = pick([1, 3, 4]);
      sortProductsByPrice(source, 'desc');
      expect(ids(source)).toEqual([1, 3, 4]);
    });

    test('после вызова без направления', () => {
      const source = [...products];
      sortProductsByPrice(source);
      expect(ids(source)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
