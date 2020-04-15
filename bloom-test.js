const { BloomFilter, PartitionedBloomFilter } = require('bloom-filters');
const randomstring = require("randomstring");

function between(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

const SIZE = Math.pow(2, 16);

let filter = new BloomFilter(SIZE, 4);

let n = 0;
let rate = filter.rate();
let keys = [];

while(rate < 0.01) {
  let key = randomstring.generate(8);
  filter.add(key);
  keys.push(key);
  rate = filter.rate();
  ++n;
}

console.log(n, 'Insertions for f=1%');

let partitioned = new PartitionedBloomFilter(SIZE, 4, 1);

keys.forEach(key => {
  partitioned.add(key)
});

testKeys = keys.slice();

for(let i = 0; i < 2*n; ++i) {
  testKeys.push(randomstring.generate(8))
}

bloomPositives = 0;
bloomTruePositives = 0;
partitionedPositives = 0;
partitionedTruePositives = 0;

for(let i = 0; i < 5000; ++i) {
  let index = between(0, testKeys.length);
  let key = testKeys[index];
  let bloomHas = filter.has(key);
  let partitionedHas = partitioned.has(key);

  if (bloomHas) {
    ++bloomPositives;
    if (index < keys.length) {
      ++bloomTruePositives;
    }
  }

  if (partitionedHas) {
    ++partitionedPositives;
    if (index < keys.length) {
      ++partitionedTruePositives;
    }
  }
}

console.log(1 - (bloomTruePositives / bloomPositives), 'False positive rate of bloom filter');
console.log(1 - (partitionedTruePositives / partitionedPositives), 'False positive rate of partitioned bloom filter');
