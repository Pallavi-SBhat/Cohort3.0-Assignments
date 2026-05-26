let time = new Date().getHours();
console.log(time);
if (time < 12) greetings = "Good Morning";
else if (time < 18) greetings = "Good Afternoon";
else greetings = "Good Evening";
console.log(greetings);