# String Similarity Calculation Documentation

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## Introduction
This JavaScript function calculates the similarity percentage between two strings. It compares the characters at corresponding positions in the strings and computes the ratio of matching characters to the length of the longer string.

```typescript
export function similar(a: string, b:string): number {
	let min_length = a.length >= b.length ?  b.length:  a.length
	let max_length =  a.length >= b.length ?  a.length:  b.length

	let same_character_count = 0;
	for (let i = 0; i < min_length; i++) {
		if (a[i] == b[i]) {
			same_character_count++;
		}
	}
	return same_character_count/max_length;
}
```

## Usage
To use this function, import it into your JavaScript code and call it with two string parameters.

```javascript
// Example usage
const string1 = "example string 1";
const string2 = "example string 2";
const similarityPercentage = similar(string1, string2);
console.log(`Similarity percentage: ${similarityPercentage * 100}%`);
```

## Function Description
### similar(a, b)
- **Parameters:**
  - `a` (string): The first string for comparison.
  - `b` (string): The second string for comparison.
- **Returns:**
  - `number`: The similarity percentage between the two strings, ranging from 0.0 to 1.0.
- **Description:**
  - Calculates the similarity percentage between strings `a` and `b`.
  - Compares characters at corresponding positions in the strings.
  - Computes the ratio of matching characters to the length of the longer string.
  - Returns the similarity percentage as a number.

## Example
Consider an example where:
- `string1 = "example string 1"`
- `string2 = "example string 2"`

The similarity percentage between `string1` and `string2` will be calculated, and the result will be logged to the console.

## Notes
- Ensure that the function is properly imported and used within your JavaScript environment.
- This function calculates similarity based on character positions, not considering semantic meaning or word order.
- The returned similarity percentage ranges from 0.0 (no similarity) to 1.0 (identical strings).
``` 
```
