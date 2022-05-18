/**
 *
 * @param {number[]} array array
 * @param {float} rand random number
 */
export default function randomIndex (array: number[], rand: number) {
  let sum = 0;
  let x = 0;
  let i = 0;

  for (; i < array.length; i++) {
    sum += array[i];
  }

  i = 0;
  rand *= sum;

  while (rand && i < array.length) {
    x += array[i];
    if (rand <= x) {
      return i;
    }
    i++;
  }

  return 0;
}
