let choice = Number(
  prompt(`Enter your choice 
        1:Red
        2:Yellow
        3:Blue`),
);
switch (choice) {
  case 1:
    console.log("Stop");
    break;
  case 2:
    console.log("Ready");
    break;
  case 3:
    console.log("Go");
    break;
    default:
        console.log("Invalid Signal");
        
}