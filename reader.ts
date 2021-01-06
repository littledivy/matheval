const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

interface Token {
  type: "number" | "operator" | "unknown";
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
        token.type = "operator";
        break;
      case 0:
        return false;
        break;
      default:
        if (numbers.includes(this.ch.toString())) {
          token = this.consume_number();
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
        case "\t":
          this.read_char();
          break;
        default:
          break loop;
      }
    }
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
