
class TreeSet {
    /*======================================================
     * Methods of ES6 Set
     *======================================================*/
 
    /**
     * Creates an empty, or a pre-initialized set.
     * @param {*} [iterable] Another iterable object whose values are added into the newly created set.
     * @example
     * // Create an empty set
     * let set = new TreeSet();
     * // Create and initialize set
     * let set2 = new TreeSet([1, 2, 3]);
     */
    constructor(iterable) {
        /** Internal tree */
        this.__t = new Tree();
        this.__t.valuePolicy = new KeyOnlyPolicy();
        if ((iterable !== undefined)
            && (iterable !== null)) {
            if (iterable[Symbol.iterator] !== undefined) {
                // copy contents
                for (let k of iterable) {
                    this.add(k);
                }
            }
            else {
                throw new Error('TreeSet constructor accepts only iterable objects');
            }
        }
    }
 
    /**
     * String tag of this class
     * @returns {String}
     * @example
     * Object.prototype.toString.call(new TreeSet()); // "[object TreeSet]"
     */
    get [Symbol.toStringTag]() {
        return 'TreeSet';
    }
 
    /**
     * Allows to create programmatically an instance of the same class
     * @returns constructor object for this class.
     * @example
     * let set = new TreeSet();
     * let constrFunc = Object.getPrototypeOf(set).constructor[Symbol.species];
     * let set2 = new constrFunc();
     */
    static get [Symbol.species]() {
        return TreeSet;
    }
 
    /**
     * Removes all key-value pairs.
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * set.clear();
     * console.log(set.size); // 0
     */
    clear() {
        this.__t.clear();
    }
 
    /**
     * Removes key-value pair with the specified key if such entry exists. Does nothing otherwise.
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * set.delete(2);
     * console.log(set.toString()); // {1,3}
     */
    delete(key) {
        let it = this.__t.find(key);
        if (!it.equals(this.__t.end())) {
            this.__t.erase(it.node);
        }
    }
 
    /**
     * Forward ES6 iterator for all values in ascending order.
     * @returns {JsIterator}
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * for (let key of set.entries()) {
     *   console.log(`key: ${key}`);
     * }
     */
    entries() {
        return this.__t.entries();
    }
 
    /**
     * Iterates all values using a callback in ascending order.
     * Note that ES6 specifies the order of key parameters in the callback differently from for-of loop.
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * set.forEach(function(value, key, container) {
     *   // value is the same as key
     *   console.log(`key: ${key}, value: ${value}`);
     * });
     */
    forEach(callback) {
        for (let k of this.__t) {
            callback(k, k, this);
        }
    }
 
    /**
     * A boolean indicator whether set contains the specified key.
     * @returns {Boolean}
     * @param {*} key a value of any type that can be compared with a key
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * let b = set.get(3); // true
     * b = set.get(4); // false
     */
    has(key) {
        let it = this.__t.find(key);
        if (!it.equals(this.__t.end())) {
            return true;
        }
        else {
            return false;
        }
    }
 
    /**
     * Forward ES6 iterator for all keys in ascending order.
     * @returns {JsIterator}
     * @example
     * // iterate all keys
     * let set = new TreeSet([1, 2, 3]);
     * for (let k of set.keys()) {
     *   console.log(k); // 1, 2, 3
     * }
     * // iterate all keys in reverse order
     * let set = new TreeSet([1, 2, 3]);
     * for (let k of set.keys().backward()) {
     *   console.log(k); // 3, 2, 1
     * }
     */
    keys() {
        return this.__t.keys();
    }
 
    /**
     * Adds a key to the set, unless the key already exists.
     * @param {*} key
     * @example
     * let set = new TreeSet();
     * set.add(1);
     */
    add(key) {
        let n = new TreeNode();
        n.key = key;
        this.__t.insertUnique(n);
    }
 
    /**
     * Number of keys in the set.
     * @returns {Number}
     */
    get size() {
        return this.__t.size();
    }
 
    /**
     * Forward ES6 iterator for all keys in ascending order. It is the same as keys() method
     * @returns {JsITerator}
     * @example
     * // iterate all values
     * let set = new TreeSet([1, 2, 3]);
     * for (let v of set.values()) {
     *   console.log(v); // '1', '2', '3'
     * }
     * // iterate all values in reverse order
     * let set = new TreeSet([1, 2, 3]);
     * for (let v of set.values().backward()) {
     *   console.log(v); // '3', '2', '1'
     * }
     */
    values() {
        return this.__t.keys();
    }
 
    /**
     * Forward ES6 iterator for all keys in ascending order. The same as entries() method
     * @returns {JsIterator}
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * for (let key of set) {
     *   console.log(`key: ${key}, value: ${value}`);
     * }
     */
    [Symbol.iterator]() {
        return this.__t[Symbol.iterator]();
    }
 
    /*======================================================
     * More methods
     *======================================================*/
    /**
     * ES6 reverse iterator for all keys in descending order.
     * @returns {JsReverseIterator}
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * for (let key of set.backwards()) {
     *   console.log(`key: ${key}`);
     * }
     */
    backward() {
        return this.__t.backward();
    }
 
    /**
     * Sets custom comparison function if key values are not of primitive types.
     * Callback is a 3-way comparison function accepts two key values (lhs, rhs). It is expected to return
     *      +1 if the value of rhs is greater than lhs
     *      -1 if the value of rhs is less than lhs
     *       0 if values are the same
     */
    set compareFunc(func) {
        this.clear();
        this.__t.compare = func;
    }
 
    /*======================================================
     * STL-like methods
     *======================================================*/
 
    /**
     * Forward iterator to the first element
     * @returns {Iterator}
     * @example
     * let set = new TreeSet();
     * ...
     * for (let it = set.begin(); !it.equals(set.end()); it.next()) {
     *   console.log(`key: ${it.key}`);
     * }
     */
    begin() {
        return this.__t.begin();
    }
 
    /**
     * Forward iterator to the element following the last element
     * @returns {Iterator}
     * @example
     * let set = new TreeSet();
     * ...
     * for (let it = set.begin(); !it.equals(set.end()); it.next()) {
     *   console.log(`key: ${it.key}`);
     * }
     */
    end() {
        return this.__t.end();
    }
 
    /**
     * Finds an element with key equivalent to the specified one. If such key does not exist end() iterator is returned.
     * @param {*} key
     * @returns {Iterator}
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * ...
     * let it = set.find(1);
     * if (!it.equals(set.end())) {
     *   console.log(`Found key: ${it.key}`); // 1
     * }
     */
    find(key) {
        return this.__t.find(key);
    }
 
    /**
     * Adds a key if it doesn't exist
     * @param {*} key
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     * @example
     * let set = new TreeSet();
     * let res = set.insertUnique(1);
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.key}`); // prints 1
     * }
     * res = set.insertUnique(1); // this step has no effect on the set
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.key}`); // not executed
     * }
     */
    insertUnique(key) {
        let n = new TreeNode();
        n.key = key;
        return this.__t.insertUnique(n);
    }
 
    /**
     * Adds key-value pair if such key does not exist in the map. Replaces value if such key exists
     * @param {*} key
     * @returns {InsertionResult} - indicates whether a node was added and provides iterator to it.
     * @example
     * let set = new TreeSet();
     * let res = set.insertOrReplace(1);
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.key}`); // prints 1
     * }
     * res = set.insertOrReplace(1) // returns iterator to the previously added node
     * if (res.wasInserted) {
     *   console.log(`Inserted ${res.iterator.key}`); // prints 1
     * }
     */
    insertOrReplace(key) {
        let n = new TreeNode();
        n.key = key;
        return this.__t.insertOrReplace(n);
    }
 
    /**
     * Removes value for the specified iterator.
     * @param {Iterator} iterator
     * @example
     * let set = new TreeSet([1,2,3]);
     * let it = set.find(2);
     * it.prev();
     * set.erase(it); // removes a node with key 1
     * console.log(set.toString()); // {2,3}
     */
    erase(iterator) {
        this.__t.erase(iterator.node);
    }
 
    /**
     * Iterator pointing to the first element that is not less than specified key. If no such element is found, see end() iterator is returned.
     * @param {*} key
     * @returns {Iterator}
     * @example
     * let set = new TreeSet();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive
     * let from = set.lowerBound(0);
     * let to = set.upperBound(50);
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     *
     * let set = new TreeSet();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive in reverse order
     * let from = new ReverseIterator(set.upperBound(50));
     * let to = new ReverseIterator(set.lowerBound(0));
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     */
    lowerBound(key) {
        return this.__t.lowerBound(key);
    }
 
    /**
     * Reverse iterator to the last element.
     * @returns {ReverseIterator}
     * @example
     * let set = new TreeSet();
     * ...
     * for (let it = set.rbegin(); !it.equals(set.rend()); it.next()) {
     *   console.log(`key: ${it.key}`);
     * }
     */
    rbegin() {
        return this.__t.rbegin();
    }
 
    /**
     * Reverse iterator pointing to before the first element.
     * @returns {ReverseIterator}
     * @example
     * let set = new TreeSet();
     * ...
     * for (let it = set.rbegin(); !it.equals(set.rend()); it.next()) {
     *   console.log(`key: ${it.key}`);
     * }
     */
    rend() {
        return this.__t.rend();
    }
 
    /**
     * Iterator pointing to the first element that is greater than key. If no such element is found end() iterator is returned.
     * @param {*} key
     * @returns {Iterator}
     * @example
     * let set = new TreeSet();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive
     * let from = set.lowerBound(0);
     * let to = set.upperBound(50);
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     *
     * let set = new TreeSet();
     * ... // add key-value pairs., using numbers as keys
     * // iterate through all key-value pairs with keys between 0 and 50 inclusive in reverse order
     * let from = new ReverseIterator(set.upperBound(50));
     * let to = new ReverseIterator(set.lowerBound(0));
     * let it = from;
     * while (!it.equals(to)) {
     *   console.log(it.key);
     *   it.next();
     * }
     */
    upperBound(key) {
        return this.__t.upperBound(key);
    }
 
    /**
     * @returns first element of the container, or undefined if container is empty
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * let first = set.first(); // 1
     */
    first() {
        return this.__t.first();
    }
 
    /**
     * @returns last element of the container, or undefined if container is empty
     * @example
     * let set = new TreeSet([1, 2, 3]);
     * let last = set.last(); // 3
     */
    last() {
        return this.__t.last();
    }
 
    /**
     * Serializes contents of the set in the form {key1,key2,...}
     * @returns {String}
     */
    toString() {
        return this.__t.toString();
    }
}


function TreeMap() {
    let root = null;
    let keyType = void 0;
    let length = 0;
  
    return {
      each: each,
      set: set,
      get: get,
      getTree: getTree,
      getLength: getLength,
      getMaxKey: getMaxKey,
      getMinKey: getMinKey,
      remove: remove,
    };
  
    function checkKey(key, checkKeyType) {
      let localKeyType = typeof key;
  
      if (
        localKeyType !== "number" &&
        localKeyType !== "string" &&
        localKeyType !== "boolean"
      ) {
        throw new Error("'key' must be a number, a string or a boolean");
      }
  
      if (checkKeyType === true && localKeyType !== keyType) {
        throw new Error("All keys must be of the same type");
      }
  
      return localKeyType;
    }
  
    function call(callback) {
      let args = Array.prototype.slice.call(arguments, 1);
  
      if (typeof callback === "function") {
        callback.apply(void 0, args);
      }
    }
  
    function getTree() {
      return root;
    }
  
    function getLength() {
      return length;
    }
  
    function each(callback) {
      internalEach(root, callback);
    }
  
    function internalEach(node, callback, internalCallback) {
      if (node === null) {
        return call(internalCallback);
      }
  
      internalEach(node.left, callback, function () {
        call(callback, node.value, node.key);
  
        internalEach(node.right, callback, function () {
          call(internalCallback);
        });
      });
    }
  
    function get(key) {
      checkKey(key);
  
      return internalGet(key, root);
    }
  
    function internalGet(key, node) {
      if (node === null) {
        return void 0;
      }
  
      if (key < node.key) {
        return internalGet(key, node.left);
      } else if (key > node.key) {
        return internalGet(key, node.right);
      } else {
        return node.value;
      }
    }
  
    function set(key, value) {
      if (root === null) {
        keyType = checkKey(key);
      } else {
        checkKey(key, true);
      }
  
      root = internalSet(key, value, root);
    }
  
    function internalSet(key, value, node) {
      if (node === null) {
        length++;
  
        return {
          key: key,
          value: value,
          left: null,
          right: null,
        };
      }
  
      if (key < node.key) {
        node.left = internalSet(key, value, node.left);
      } else if (key > node.key) {
        node.right = internalSet(key, value, node.right);
      } else {
        node.value = value;
      }
  
      return node;
    }
  
    function getMaxKey() {
      let maxNode = getMaxNode(root);
  
      if (maxNode !== null) {
        return maxNode.key;
      }
  
      return maxNode;
    }
  
    function getMinKey() {
      let minNode = getMinNode(root);
  
      if (minNode !== null) {
        return minNode.key;
      }
  
      return minNode;
    }
  
    function getMaxNode(node) {
      while (node !== null && node.right !== null) {
        node = node.right;
      }
  
      return node;
    }
  
    function getMinNode(node) {
      while (node !== null && node.left !== null) {
        node = node.left;
      }
  
      return node;
    }
  
    function remove(key) {
      checkKey(key);
  
      root = internalRemove(key, root);
    }
  
    function internalRemove(key, node) {
      if (node === null) {
        return null;
      }
  
      if (key < node.key) {
        node.left = internalRemove(key, node.left);
      } else if (key > node.key) {
        node.right = internalRemove(key, node.right);
      } else {
        if (node.left !== null && node.right !== null) {
          let maxNode = getMaxNode(node.left);
  
          let maxNodeKey = maxNode.key;
          let maxNodeValue = maxNode.value;
  
          maxNode.key = node.key;
          maxNode.value = node.value;
          node.key = maxNodeKey;
          node.value = maxNodeValue;
  
          node.left = internalRemove(key, node.left);
        } else if (node.left !== null) {
          length--;
          return node.left;
        } else if (node.right !== null) {
          length--;
          return node.right;
        } else {
          length--;
          return null;
        }
      }
  
      return node;
    }
  }