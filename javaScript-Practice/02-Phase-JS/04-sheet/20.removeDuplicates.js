const arr = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 1, name: "A" }
];

const unique = arr.reduce((acc, curr) => {
  const exists = acc.some(item => item.id === curr.id);

  if (!exists) {
    acc.push(curr);
  }

  return acc;
}, []);

console.log(unique);