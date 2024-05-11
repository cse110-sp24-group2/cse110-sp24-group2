import { mul } from '../src/scripts/arithmetic';

test('multiplies 1 * 2 to equal 2', () => {
  expect(mul(1, 2)).toBe(2);
});

test('multiplies 2 * 2 to equal 4', () => {
  expect(mul(2, 2)).toBe(4);
});