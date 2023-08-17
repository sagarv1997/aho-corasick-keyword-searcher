export class AhoCorasick {
  private trie: Record<number, Record<string, number>> = {
    0: {},
  };
  private output: Record<number, Array<{ id: string; word: string }>> = {};
  private failure: Record<number, number> = {};

  /**
   * Constructor for AhoCorasick class.
   * @param keywords Array of objects containing { id, word } pairs.
   */
  constructor(keywords: Array<{ id: string; word: string }>) {
    this._buildTrie(keywords);
  }

  /**
   * Builds the trie structure and failure function for the keywords.
   * @param keywords Array of objects containing { id, word } pairs.
   */
  private _buildTrie(keywords: Array<{ id: string; word: string }>): void {
    let state = 0;

    keywords.forEach(({ id, word }) => {
      let curr = 0;

      for (let i = 0; i < word.length; i++) {
        const letter = word[i];

        if (this.trie[curr] && letter in this.trie[curr]) {
          curr = this.trie[curr][letter];
        } else {
          state++;
          this.trie[curr][letter] = state;
          this.trie[state] = {};
          curr = state;
          this.output[state] = [];
        }
      }

      this.output[curr].push({ id, word });
    });

    const queue: number[] = [];

    for (const letter in this.trie[0]) {
      const nextState = this.trie[0][letter];
      this.failure[nextState] = 0;
      queue.push(nextState);
    }

    while (queue.length) {
      const r = queue.shift() as number;

      for (const letter in this.trie[r]) {
        const s = this.trie[r][letter];
        queue.push(s);

        let state = this.failure[r];

        while (state > 0 && !(letter in this.trie[state])) {
          state = this.failure[state];
        }

        if (letter in this.trie[state]) {
          const failureState = this.trie[state][letter];
          this.failure[s] = failureState;
          this.output[s] = this.output[s].concat(this.output[failureState]);
        } else {
          this.failure[s] = 0;
        }
      }
    }
  }

  /**
   * Searches for matches in the given string and returns results.
   * @param string Input string to search for matches.
   * @returns Array of objects containing position and matched keywords with IDs.
   */
  public search(
    string: string,
  ): Array<{ position: number; matches: Array<{ id: string; word: string }> }> {
    let state = 0;
    const results: Array<{
      position: number;
      matches: Array<{ id: string; word: string }>;
    }> = [];

    for (let i = 0; i < string.length; i++) {
      const letter = string[i];

      while (state > 0 && !(letter in this.trie[state])) {
        state = this.failure[state];
      }

      if (!(letter in this.trie[state])) {
        continue;
      }

      state = this.trie[state][letter];

      if (this.output[state].length) {
        const foundMatches = this.output[state];
        results.push({ position: i, matches: foundMatches });
      }
    }

    return results;
  }
}
