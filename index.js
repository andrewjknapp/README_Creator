const inquirer = require('inquirer');
const fs = require('fs');
const https = require('https');

let username = 'andrewjknapp';

let options = {
    host: 'https://api.github.com',
    path: `/users/:${username}`,
    headers: {"Authorization": 'd2b87e3d4c9a621c9286bf5aca76bf151d214a43'}
}

//key d2b87e3d4c9a621c9286bf5aca76bf151d214a43
https.get(`https://api.github.com/users/:${username}`, options, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

// inquirer.prompt([
//     {
//         type: 'input',
//         message: 'Project Title:',
//         name: 'title'
//     },
//     {
//         type: 'input',
//         message: 'Description:',
//         name: 'description'
//     },
//     {
//         type: 'input',
//         message: 'Table of Contets (separated by a ,)',
//         name: 'contents'
//     }
// ]).then(response => {
//     console.log(response);
// })
