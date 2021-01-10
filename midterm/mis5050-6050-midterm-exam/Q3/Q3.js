// Write the code for Question 3 here

// This is the array of objects of friends
// Section 'a'
var friends = [
    {
        "firstName" : "Chandler",
        "lastName" : "Whitley",
        "birthDate" : new Date(1995,02,02),
        "favoriteFoods" : ['taco','burger']
    },
    {
        "firstName" : "Acea",
        "lastName" : "Winston",
        "birthDate" : new Date(1995,02,08),
        "favoriteFoods" : ['pizza','pie']
    },
    {
        "firstName" : "Bryan",
        "lastName" : "Lankford",
        "birthDate" : new Date(1995,02,07),
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

const friendFunction = (friends) => {
    console.log(friends);
}

friendFunction(friends)

// const fuc1=(a,b)=>{
//     return a+b;
// }
// console.log(fuc1)

// friendFunction.apply(window,{friends});