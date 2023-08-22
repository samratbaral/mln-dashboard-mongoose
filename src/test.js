const test = require("ava");

test("Test #1", (t) => {
  t.pass();
});
test("Test #2", (t) => {
  t.pass();
});
test("Test #3", (t) => {
  t.pass();
});
test("Test #4", (t) => {
  t.pass();
});
test("Test #5", (t) => {
  t.pass();
});
test("Test #6", (t) => {
  t.pass();
});
test("Test #7", (t) => {
  t.pass();
});
test("Test #8", (t) => {
  t.pass();
});
test("Test #9", (t) => {
  t.pass();
});
test("Test #10", async (t) => {
  const bar = Promise.resolve("bar");
  t.is(await bar, "bar");
});
