import evaluate from "./mod.ts";

while (true) {
  let input = prompt(">>>");
  let result = evaluate(input || "");
  console.log(result);
}
