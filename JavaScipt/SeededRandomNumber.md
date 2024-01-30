## `RNG` Class

The `RNG` class provides a simple implementation of a random number generator (RNG) using the Linear Congruential Generator (LCG) algorithm. This class allows for the generation of pseudo-random integers, floating-point numbers, and selection of random elements from an array.

### Code:

```javascript
function RNG(seed) {
  // LCG using GCC's constants
  this.m = 0x80000000; // 2**31;
  this.a = 1103515245;
  this.c = 12345;

  this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
}
RNG.prototype.nextInt = function() {
  this.state = (this.a * this.state + this.c) % this.m;
  return this.state;
}
RNG.prototype.nextFloat = function() {
  // returns in range [0,1]
  return this.nextInt() / (this.m - 1);
}
RNG.prototype.nextRange = function(start, end) {
  // returns in range [start, end): including start, excluding end
  // can't modulu nextInt because of weak randomness in lower bits
  var rangeSize = end - start;
  var randomUnder1 = this.nextInt() / this.m;
  return start + Math.floor(randomUnder1 * rangeSize);
}
RNG.prototype.choice = function(array) {
  return array[this.nextRange(0, array.length)];
}

```

### Class Signature:

```javascript
function RNG(seed)
```

### Constructor:

- `seed` (optional): An optional seed value to initialize the state of the RNG. If not provided, a random seed will be generated.

### Class Properties:

- `m`: Modulus value for the LCG algorithm, set to 2^31 (0x80000000).
- `a`: Multiplier constant for the LCG algorithm, using GCC's constants (1103515245).
- `c`: Increment constant for the LCG algorithm (12345).
- `state`: The current state of the RNG, initialized with the provided seed or a random value.

### Methods:

#### `nextInt()`

Generates the next pseudo-random integer using the LCG algorithm.

#### `nextFloat()`

Generates the next pseudo-random floating-point number in the range [0, 1).

#### `nextRange(start, end)`

Generates the next pseudo-random integer in the range [start, end) (including start, excluding end).

#### Parameters:

- `start`: The inclusive lower bound of the range.
- `end`: The exclusive upper bound of the range.

#### `choice(array)`

Randomly selects and returns an element from the provided array.

#### Parameters:

- `array`: An array of elements from which to randomly choose.

### Example Usage:

```javascript
const rng = new RNG(42); // Initialize with a seed value
const randomInt = rng.nextInt();
const randomFloat = rng.nextFloat();
const randomRange = rng.nextRange(10, 20);
const randomChoice = rng.choice(["apple", "banana", "orange"]);

console.log("Random Integer:", randomInt);
console.log("Random Float:", randomFloat);
console.log("Random Range:", randomRange);
console.log("Random Choice:", randomChoice);
```

### Notes:

- The LCG algorithm used in this implementation is a basic pseudo-random number generation technique.
- The generated random numbers may exhibit certain patterns over long periods, and the quality of randomness depends on the chosen seed.

### Recommendations:

- This `RNG` class is suitable for scenarios where a simple and fast RNG is sufficient, such as simulations, games, or non-cryptographic applications.
- If cryptographic security is required, consider using a more secure RNG algorithm.
- It is also Useful when you want random numbers that are the same in each run as Math.random() cannot be seeded.

### Potential Enhancements:

- For more advanced use cases, consider exploring other RNG algorithms or libraries that provide stronger randomness properties.
- Allow users to set their own LCG constants for customization.

### Conclusion:

The `RNG` class provides a straightforward implementation of an RNG using the LCG algorithm, offering flexibility for generating different types of random values. Developers should be aware of the limitations of LCG and choose the appropriate RNG method based on the application's requirements.
