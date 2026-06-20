function introduce(city, country) {
  console.log(`${this.name} from ${city} ${country}`);
}
const person = {
  name: "Ritik",
};
introduce.apply(person,['Mangalore','India']);