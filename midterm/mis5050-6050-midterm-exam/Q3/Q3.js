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

friends.forEach((friend)=>console.log(friend.firstName,friend.lastName,'is',Math.round((new Date()-friend.birthDate)/(86400000*365)),'years old and likes the following foods:',friend.favoriteFoods));


// Section 'c'
// taking each 
// var inDate = prompt('Enter date yyyy,mm,dd');
friends.forEach((friend,inDate)=>console.log(inDate));

const funcDate(date, friends)=>{
    if (friends.birthDate) 
    
}
console.log(funcDate("gfaghxfa",friends))