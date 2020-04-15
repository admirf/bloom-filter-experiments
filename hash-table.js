function HashTable(size, load_factor = 1) {
  this.size = size;
  this.load_factor = load_factor;
  this.keys = this.initArray(size);
  this.values = this.initArray(size);
  this.limit = 0;
}

HashTable.prototype.put = function (key, value) {
  if (this.limit / this.size >= this.load_factor) throw 'hash table is full';
  let hashedIndex = this.hash(key);
  while (this.keys[hashedIndex] != null) {
    hashedIndex++;
    hashedIndex = hashedIndex % this.size;
  }
  this.keys[hashedIndex] = key;
  this.values[hashedIndex] = value;
  this.limit++;
};

HashTable.prototype.get = function (key) {
  let hashedIndex = this.hash(key);

  while (this.keys[hashedIndex] != key) {
    hashedIndex++;
    hashedIndex = hashedIndex % this.size;
  }

  return this.values[hashedIndex]
};

HashTable.prototype.hash = function (key) {
  if (!Number.isInteger(key)) throw 'must be int';

  return key % this.size;
};

HashTable.prototype.initArray = function (size) {
  let array = [];

  for (let i = 0; i < size; i++) {
    array.push(null);
  }

  return array;
};

module.exports = HashTable;