function processUser(name, callback) {
  console.log("Processing user....");
  return callback(name);
}

function welcomeUser(name) {
  return `Welcome ${name}`;
}

console.log(processUser('Ritik',welcomeUser));