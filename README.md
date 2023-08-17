# Aho-Corasick Keyword Searcher

Aho-Corasick Keyword Searcher is a TypeScript library that provides efficient and versatile string matching using the Aho-Corasick algorithm. What sets this library apart is its ability to search for multiple keywords in a given text while associating each keyword with a unique identifier.

This package is referenced and inspired from [BrunoRB's Aho-Corasick](https://github.com/BrunoRB/ahocorasick) package, providing additional capability to associate an ID with each keyword.

## Installation

To incorporate this powerful keyword searching capability into your TypeScript project, simply install the package using npm:

```bash
npm install --save aho-corasick-keyword-searcher
```

# Usage

Start by importing the AhoCorasick class from the library:

```ts
import { AhoCorasick } from 'aho-corasick-keyword-searcher';
```

Initialization: Initialize the Aho-Corasick algorithm, associating keywords with their respective IDs:

```ts
const keywords = [
  { id: 'fruit1', word: 'apple' },
  { id: 'fruit2', word: 'banana' },
  // Add more keywords with IDs
];

const keywordSearcher = new AhoCorasick(keywords);
```

Searching: Employ the search method of the AhoCorasick instance to find keywords in a given string:

```ts
const searchString = 'I enjoy apple and banana.';
const searchResults = keywordSearcher.search(searchString);

console.log(searchResults);
```

The search method returns an array of objects, each containing the position where a match was found in the input string, alongside an array of matches complete with their associated IDs and words.

# Example

```ts
import { AhoCorasick } from 'aho-corasick-keyword-searcher';

const keywords = [
  { id: 'fruit1', word: 'apple' },
  { id: 'fruit2', word: 'banana' },
  // Add more keywords with IDs
];

const keywordSearcher = new AhoCorasick(keywords);

const searchString = 'I enjoy apple and banana.';
const searchResults = keywordSearcher.search(searchString);

console.log(searchResults);
```

# License

This project is licensed under the MIT License - see the LICENSE file for details.
