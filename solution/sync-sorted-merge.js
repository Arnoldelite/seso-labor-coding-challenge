"use strict";

const LogSource = require("../lib/log-source");

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  let sorted = mergeSort(logSources);
  sorted.map((log) => {
    let logItem = {...log.last};
    printer.print(logItem);
  });
  printer.done();
  return console.log("Sync sort complete.");
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