//"use strict"; NOT NEEDED! Modules run in strict mode by default

// For keeping track of number of times each func is called
// this should be "private" to the file
// Not using, yet
const usageObj = {
  sortAsc: 0,
  sortDesc: 0,
  calcMean: 0
};

// 3 "private" helper functions
const ascending = (a,b) => a-b;
const descending = () => 0; // TODO
const calcMean = () => 0 // TODO

// 4 "public" functions that should be visible from the outside
const sortAscending = (array) => {
  return array.sort(ascending);
};

const sortDescending = (array) => {
  // TODO
};

const  calculateMean = (array) => {
  // TODO
};

// https://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
// https://github.com/angular/angular/blob/4.3.x/packages/common/src/pipes/number_pipe.ts#L172
const isNumeric = (value) => {
  return !isNaN(value - parseFloat(value));
}

// `export` what we want to be visible from the outside
// Only these 2 functions are visible from the outside of this module aka "public"
// All the other variables and functions of this module a "private" and
// not visible from the outside
export {sortAscending,isNumeric};