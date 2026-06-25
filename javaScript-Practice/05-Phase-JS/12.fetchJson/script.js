const fetchData = async () => {
  let response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  let data = await response.json();
  console.log(response.ok);
  return data;
};

const handleData = async () => {
  const data = await fetchData();
  console.log(data);
  const userName = data.name;
  console.log(userName);
};

handleData();