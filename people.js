const people = ['yoshi', 'ryu', 'chun-li', 'mario'];
const ages = [20, 30, 35, 25, 40, 35];

people.forEach((people) => {
    console.log(people);
});

// exporting 'people' list
// module.exports = people;

// exporting multiple values. Then we would be exporting an object with the multiple values
module.exports = {
    // people : people,    // assigning the 'people' list to the 'people' key
    // ages : ages         // assigning the 'ages' list to the 'ages' key
    // // NOTE: As the value of the key, value pairs are equal there is shortcut method as follows,
    people, ages
};