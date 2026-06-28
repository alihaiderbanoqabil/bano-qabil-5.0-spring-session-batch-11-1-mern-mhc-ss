// const http = require("http");
// const { join, dirname, extname, parse } = require("path");
// const os = require('os');
// const url = require('url');
// const { URL, URLSearchParams } = require('url');

// const myURL = new URL('https://example.com/?name=Kai&age=30');
// const params = new URLSearchParams(myURL.search);

// // Get a parameter
// console.log(params.get('name'));
// console.log(params.get('age'));

// // Add a parameter
// params.append('city', 'Stavanger');
// // Delete a parameter
// params.delete('age');
// // Convert to string
// console.log(params.toString());


// let address = 'http://localhost:8080/default.htm?year=2017&month=february#hash';
// let q = url.parse(address, true);

// console.log(q.host);
// console.log(q.pathname);
// console.log(q.search);
// console.log(q.hash);
// console.log(q.port);
// console.log(q.protocol);

// let qdata = q.query;
// console.log(qdata.month);

// // Basic system information
// console.log(`OS Platform: ${os.platform()}`);
// console.log(`OS Type: ${os.type()}`);
// console.log(`OS Release: ${os.release()}`);
// console.log(`CPU Architecture: ${os.arch()}`);
// console.log(`Hostname: ${os.hostname()}`);

// // Memory information
// const totalMemGB = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
// const freeMemGB = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
// console.log(`Memory: ${freeMemGB}GB free of ${totalMemGB}GB`);

// // User information
// const userInfo = os.userInfo();
// console.log(`Current User: ${userInfo.username}`);
// console.log(`Home Directory: ${os.homedir()}`);


// const extension = extname(__filename);
// console.log(extension);

// const pathInfo = parse('/users/docs/file.txt');
// console.log(pathInfo)
// // Get the directory name of the current module
// console.log('Directory name:', __dirname);

// // Get the file name of the current module
// console.log('File name:', __filename);

// // Building paths relative to the current module
// const configPath = join(__dirname, 'config', 'app-config.json');
// console.log('Config file path:', configPath);

// // Getting the directory name using path.dirname()
// console.log('Directory using path.dirname():', dirname(__filename));

// const PORT = 3000;

// const users = [
//     {
//         id: 1,
//         name: "Ali",
//         email: "ali@example.com",
//     },
//     {
//         id: 2,
//         name: "Ahmed",
//         email: "ahmed@example.com",
//     },
// ];

// const server = http.createServer((req, res) => {
//     // Response Headers
//     res.setHeader("Content-Type", "application/json");

//     // GET /
//     if (req.method === "GET" && req.url === "/") {
//         return res.end(
//             JSON.stringify({
//                 message: "Welcome to Node.js Server",
//             })
//         );
//     }

//     // GET /api/users
//     if (req.method === "GET" && req.url === "/api/users") {
//         return res.end(JSON.stringify(users));
//     }

//     // GET /api/users/1
//     if (req.method === "GET" && req.url.startsWith("/api/users/")) {
//         const id = Number(req.url.split("/")[3]);

//         const user = users.find((u) => u.id === id);

//         if (!user) {
//             res.statusCode = 404;

//             return res.end(
//                 JSON.stringify({
//                     message: "User not found",
//                 })
//             );
//         }

//         return res.end(JSON.stringify(user));
//     }

//     // POST /api/users
//     if (req.method === "POST" && req.url === "/api/users") {
//         let body = "";

//         req.on("data", (chunk) => {
//             body += chunk;
//         });

//         req.on("end", () => {
//             const data = JSON.parse(body);

//             const newUser = {
//                 id: users.length + 1,
//                 name: data.name,
//                 email: data.email,
//             };

//             users.push(newUser);

//             res.statusCode = 201;

//             res.end(
//                 JSON.stringify({
//                     message: "User created successfully",
//                     user: newUser,
//                 })
//             );
//         });

//         return;
//     }

//     // DELETE /api/users/1
//     if (req.method === "DELETE" && req.url.startsWith("/api/users/")) {
//         const id = Number(req.url.split("/")[3]);

//         const index = users.findIndex((u) => u.id === id);

//         if (index === -1) {
//             res.statusCode = 404;

//             return res.end(
//                 JSON.stringify({
//                     message: "User not found",
//                 })
//             );
//         }

//         const deletedUser = users.splice(index, 1);

//         return res.end(
//             JSON.stringify({
//                 message: "User deleted successfully",
//                 user: deletedUser[0],
//             })
//         );
//     }

//     // Route Not Found
//     res.statusCode = 404;

//     res.end(
//         JSON.stringify({
//             message: "Route not found",
//         })
//     );
// });

// server.listen(PORT, 'localhost', () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


let http = require('http');
let url = require('url');
let fs = require('fs');
const crypto = require('crypto');

// Create a SHA-256 hash of a string
const hash = crypto.createHash('sha256')
  .update('Hello, Node.js!')
  .digest('hex');
console.log('SHA-256 Hash:', hash);

http.createServer(function (req, res) {
    let q = url.parse(req.url, true);
    let filename = "." + q.pathname;
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(8080, 'localhost', () => {
    console.log(`Server is running on http://localhost:8080`);
});