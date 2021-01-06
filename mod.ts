import Lexer from "./reader.ts";

let ops: { [op: string]: any } = {
  "+": (x: number, y: number) => x + y,
  "-": (x: number, y: number) => x - y,
  "*": (x: number, y: number) => x * y,
};

export default function evaluate(input: string): number {
  let lexer = new Lexer(input);
  let tok;
  let result = 0;
  let curr_op = "+";
  while (true) {
    tok = lexer.next();
    if (tok == false) break;
    switch (tok.type) {
      case "operator":
        curr_op = tok.value.toString();
        break;
      case "number":
        result = ops[curr_op](result, parseInt(tok.value.toString()));
        break;
    }
  }
  return result;
}
