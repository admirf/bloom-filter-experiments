const { performance } = require('perf_hooks');
let HashTable = require("./hash-table");
let math = require('mathjs');

const LOAD_FACTOR = 1;
const SIZE = Math.pow(2, 16);

function between(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

let h = new HashTable(SIZE, LOAD_FACTOR);

let keys = [];

for(let i = 0; i < 1024; ++i) {
  try {
    let key = between(0, SIZE);
    h.put(key, i);
    keys.push(key)
  } catch (e) {
    break;
  }
}

let times = [];

for(let i = 0; i < 1024; ++i) {
  let key = keys[between(0, keys.length)];
  let now = performance.now();
  h.get(key);
  let time = performance.now() - now;
  times.push(time)
}

console.log(math.min(times), 'Min time');
console.log(math.max(times), 'Max time');
console.log(math.sum(times) / 1024, 'Average time');


