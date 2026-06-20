let students = [
  { name: "Anubhav", marks: 85 },
  { name: "Rahul", marks: 42 },
  { name: "Aman", marks: 90 },
];
students.forEach((stu) => {
  let result = stu.marks >= 50 ? "Pass" : "Fail";
  console.log(stu.name + " - " + result);
});