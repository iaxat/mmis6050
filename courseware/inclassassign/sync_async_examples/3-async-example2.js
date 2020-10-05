console.log("Starting");

let sumSync = addSync(5, 10);

console.log("The sync sum is " + sumSync);

addAsync(5, 7, (sumAsync) => {
    console.log("The async sum is " + sumAsync);
});

console.log("Stopping");

function addSync (x, y) {
    return x + y;
}

function addAsync (x, y, callback) {
    setTimeout(() => {
        callback(x+y);
    }, 5000)    
}