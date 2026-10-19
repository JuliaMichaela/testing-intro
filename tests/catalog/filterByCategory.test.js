const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

const ids = (list) => list.map(({ id }) => id);

describe('filterByCategory', () => {
  describe('все категории', () => {
    test.each([
      ["'all'", 'all'],
      ['undefined', undefined],
      ['пустой строки', ''],
    ])('возвращает все товары для %s', (_name, category) => {
      expect(ids(filterByCategory(products, category))).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('существующая категория', () => {
    test.each([
      ['electronics', [1, 2]],
      ['books', [3, 6]],
      ['home', [4, 5]],
    ])('возвращает товары категории %s', (category, expected) => {
      expect(ids(filterByCategory(products, category))).toEqual(expected);
    });
  });

  describe('несуществующая категория', () => {
    test.each(['clothes', 'toys', 'sports'])('возвращает пустой массив для %s', (category) => {
      expect(ids(filterByCategory(products, category))).toEqual([]);
    });
  });
});
