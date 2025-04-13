// const http  = require("http");
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({
//       data: 'Hello World!',
//     }));
//   });
// server.listen(3000);

const http = require("http");

const server = http.createServer((req, res) => {
    const num = [1, 2, 3, 4, 5, 6]; // Array of numbers
    let sum = 0; // Variable to store the sum

    // Calculate sum using forEach
    num.forEach((element) => {
        sum += element; // Add each element's value to the sum
    });

    // Respond with JSON containing the array and the calculated sum
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        status: "success",
        data: {
            numbers: num,
            total: sum,
            message: "Sum of array elements calculated successfully"
        }
    }));
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
