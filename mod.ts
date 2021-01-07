import Lexer, { Token } from "./reader.ts";

let ops: { [op: string]: any } = {
  "+": (x: number, y: number) => x + y,
  "-": (x: number, y: number) => x - y,
  "*": (x: number, y: number) => x * y,
  "/": (x: number, y: number) => x / y,
  "^": (x: number, y: number) => x ** y,
  "%": (x: number, y: number) => x % y,
};

type Stack = {
  name: string;
  value: any;
};

export default function evaluate(input: string): number {
  let lexer = new Lexer(input);
  let tok;
  let result = 0;
  let curr_op = "+";
  let stack: Map<string, Token> = new Map();
  while (true) {
    tok = lexer.next();
    if (tok == false) break;
    let token_value = tok.value.toString();
    switch (tok.type) {
      case "operator":
        curr_op = token_value;
        break;
      case "number":
        result = ops[curr_op](result, parseInt(token_value));
        break;
      case "ident":
        lexer.skip_whitspace();
        if (lexer.ch == "=") {
          lexer.read_char();
          let assignment = lexer.next();
          if (!assignment) break;
          stack.set(token_value, assignment);
        } else if (stack.has(token_value)) {
          let val = stack.get(token_value);
          result = ops[curr_op](result, parseInt(val!.value.toString()));
        }
        break;
    }
  }
  return result;
}
