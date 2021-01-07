const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
export const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "_",
];

export interface Token {
  type: "number" | "operator" | "unknown" | "ident";
  value: string | number;
}

export default class Lexer {
  input: string;
  // Current position of the lexer
  pos: number = 0;
  // Next position of the lexer
  next_pos: number = 0;
  // Current character being analysed
  ch: string | 0 = 0;

  constructor(source: string) {
    this.input = source;
    this.read_char();
  }

  read_char() {
    if (this.next_pos >= this.input.length) {
      this.ch = 0;
    } else {
      this.ch = this.input[this.next_pos];
    }
    this.pos = this.next_pos;
    this.next_pos += 1;
  }

  nextch(): string | 0 {
    if (this.next_pos >= this.input.length) {
      return 0;
    } else {
      return this.input[this.next_pos];
    }
  }

  nextch_is(ch: string): boolean {
    return this.nextch() == ch;
  }

  next(): Token | false {
    this.skip_whitspace();
    let token: Token = { type: "unknown", value: this.ch };
    switch (this.ch) {
      case "+":
      case "*":
      case "-":
      case "/":
      case "%":
      case "^":
        token.type = "operator";
        break;
      case 0:
        return false;
        break;
      default:
        if (numbers.includes(this.ch.toString())) {
          token = this.consume_number();
        } else if (alphabets.includes(this.ch.toString())) {
          token = this.consume_ident();
        }
        break;
    }
    this.read_char();
    return token;
  }

  skip_whitspace() {
    loop:
    for (;;) {
      switch (this.ch) {
        case " ":
        case "\n":
        case "\t":
          this.read_char();
          break;
        default:
          break loop;
      }
    }
  }
  consume_ident(): Token {
    let start_pos = this.pos;
    loop:
    for (;;) {
      if (alphabets.includes(this.ch.toString())) {
        this.read_char();
      } else {
        break loop;
      }
    }

    let literal = this.input.substring(start_pos, this.pos);

    let tok: Token = { type: "ident", value: literal };
    return tok;
  }

  consume_number(): Token {
    let start_pos = this.pos;
    loop:
    for (;;) {
      if (this.ch === 0) break loop;
      if (numbers.includes(this.ch)) {
        this.read_char();
      } else {
        break loop;
      }
    }

    let literal = this.input.substring(start_pos, this.pos);
    return { type: "number", value: literal };
  }
}
