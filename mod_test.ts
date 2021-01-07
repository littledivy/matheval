import evaluate from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";

Deno.test("eval test", function () {
  assertEquals(evaluate("1 + 1"), 2);
  assertEquals(evaluate("100 * 100"), 10000);
  assertEquals(evaluate("123 - 1"), 122);
  assertEquals(evaluate("102 + 103"), 205);
  assertEquals(evaluate("1 * 1 + 1"), 2);
});
Deno.test("floats", function () {
  assertEquals(evaluate("1.1 + 1.1"), 2.2);
  assertEquals(evaluate("3.14"), 3.14);
});
