// Write the code for Question 3 here

// This is the array of objects of friends
// Section 'a'
var friends = [
    {
        "firstName" : "Chandler",
        "lastName" : "Whitley",
        "birthDate" : new Date(1997,02,02),
        "favoriteFoods" : ['taco','burger']
    },
    {
        "firstName" : "Acea",
        "lastName" : "Winston",
        "birthDate" : new Date(1990,02,08),
        "favoriteFoods" : ['pizza','pie']
    },
    {
        "firstName" : "Bryan",
        "lastName" : "Lankford",
        "birthDate" : new Date(1993,02,07),
        "favoriteFoods" : ['burrito','burger']
    },
    {
        "firstName" : "Jake",
        "lastName" : "Howell",
        "birthDate" : new Date(1995,02,01),
        "favoriteFoods" : ['noodles','taco']
    }
]

// Section 'b'
// The function to accept the array of objects

// to find the age we can approach with 2 methods
// since JS stores date till milliseconds, we can just use the 
// normal new date function and subtract 
// but this will make it in milliseconds
// another method would be to create a new function for the date
// in this question we went with the 1st method to reduce code space
// the math library is used to round off

const convertDate=(date)=>{
    return (Math.round((new Date()-date)/(86400000*365)));
}
friends.forEach((friend)=>console.log(friend.firstName,friend.lastName,'is',convertDate(friend.birthDate),'years old and likes the following foods:',friend.favoriteFoods));


// Section 'c'
// taking each 
// var inDate = prompt('Enter date yyyy,mm,dd');
// Math.round((new Date()-friend.birthDate)/(86400000*365))
// friends.forEach((friend,inDate)=>console.log(inDate));


// Change date here to get the output of results
let date = new Date(1992,02,08);


const functDate=(friends, date)=>{
    let res=[];
    
friends.forEach(element => {
   if(convertDate(date)<convertDate(element.birthDate))
   res.push(element);
});
    return res;
}

let resultArray=functDate(friends,date);
resultArray.forEach(element => {
    console.log(element)
});