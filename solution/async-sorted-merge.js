"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = async (logSources, printer) => {
  let sorted = mergeSort(logSources);  
  return new Promise((resolve, reject) => {
    sorted.map((log) => {
      let logItem = {...log.last};
      printer.print(logItem);
    });
    resolve(printer.done());
    resolve(console.log("Async sort complete."));
  });
};


function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }

  const center = Math.floor(arr.length / 2);
  const left = arr.slice(0, center);
  const right = arr.slice(center);

  return merge(mergeSort(left), mergeSort(right));
}

//merge sort utility func
function merge(left, right) {
  const results = [];

  while (left.length && right.length) {
    if (left[0].last.date < right[0].last.date) {
      results.push(left.shift());
    } else {
      results.push(right.shift());
    }
  }

  return [...results, ...left, ...right];
}