let nested = [["hello", "hi", "i love you "], "hi", true, 90, [56, 78, 90]];
for (let i = 0; i < nested.length; i++) {
  let j = 0;
  if (Array.isArray(nested[i])) {
    for (j = 0; j < nested[i].length; j++) {
      process.stdout.write(nested[i][j] + " ");
    }
    console.log();
  }
}