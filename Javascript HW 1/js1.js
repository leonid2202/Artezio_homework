//Task 1.1
function calculateSumOfElements(matrix) {
  return matrix.reduce(
    (sum, row) => sum + row.reduce((rowSum, element) => rowSum + element, 0),
    0
  );
}

//Task 1.2
function rotateMatrixClockwise(matrix) {
  let res = [];
  for (let i = 0; i < matrix[0].length; i++) {
    let row = [];
    for (let j = matrix.length - 1; j >= 0; j--) {
      row.push(matrix[j][i]);
    }
    res.push(row);
  }
  return res;
}

//Task 1.3
function countUniqueSymbols(str) {
  let symbols = new Set();
  for (let c of str) {
    symbols.add(c);
  }
  return symbols.size;
}

//Tests:
/*
let m1 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
];

let m2 = [
    [1, 1, 1],
    [2, 2, 2],
    [3, 3, 3],
];

let m3 = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
];

let strings = ["Hello, world", "aaaaa", "abcba"];

let task1Results = [m1, m2, m3].map(calculateSumOfElements);
let task2Results = [m1, m2, m3].map(rotateMatrixClockwise);
let task3Results = strings.map(countUniqueSymbols);

console.log(...task1Results);
console.log(...task2Results);
console.log(...task3Results);
*/
