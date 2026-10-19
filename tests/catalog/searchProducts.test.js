const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

const ids = (list) => list.map(({ id }) => id);

describe('searchProducts', () => {
  describe('точное совпадение', () => {
    test.each([
      ['Наушники', [1]],
      ['Чистый код', [6]],
      ['Настольная лампа', [4]],
    ])('находит товар по запросу %s', (query, expected) => {
      expect(ids(searchProducts(products, query))).toEqual(expected);
    });
  });

  describe('регистр не влияет на поиск', () => {
    test.each([
      ['javascript', [3]],
      ['ЧЕХОЛ', [5]],
      ['наушники', [1]],
    ])('находит товар по запросу %s', (query, expected) => {
      expect(ids(searchProducts(products, query))).toEqual(expected);
    });
  });

  describe('пустой запрос', () => {
    test.each([
      ['пустой строки', ''],
      ['пробелов', '   '],
      ['табуляции и переноса строки', '\t\n'],
    ])('возвращает все товары для %s', (_name, query) => {
      expect(ids(searchProducts(products, query))).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
