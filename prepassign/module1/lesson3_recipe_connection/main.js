const cities1=require('cities');
// console.log(cities1.zip_lookup('84321'));

let ut=cities1.findByState('UT');
let logan=cities1.zip_lookup('84321');
console.log(logan);

let north=ut.filter(e => e.latitude > logan.latitude)
let north_cities=north.map(e=>e.city)

console.log(ut.length);
console.log(north.length);
console.log(north_cities);