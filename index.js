const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');



inquirer.prompt({
      type: 'input',
      message: 'Enter your GitHub Username:',
      name: 'username'

}).then(function({ username }) {
  const queryUrl = `https://api.github.com/users/${username}`;
  let email;
  let userImage;

  axios
  .get(queryUrl)
  .then(function(res) {
    email = res.data.email;
    userImage = res.data.avatar_url;
  })

  inquirer.prompt([
    {
        type: 'input',
        message: 'Project Title:',
        name: 'title'
    },
    {
        type: 'input',
        message: 'Description:',
        name: 'description'
    },
    {
        type: 'input',
        message: 'Describe the Installation Process:',
        name: 'installation'
    },
    {
        type: 'input',
        message: 'How will this project be used:',
        name: 'usage'
    },
    {
        type: 'rawlist',
        message: 'Licence:',
        name: 'liscence',
        choices: [
          'MIT',
          'Apache',
          'GPL'
        ]
    },
    {
      type: 'input',
      message: 'Please list contributors:',
      name: 'contributing'
    },
    {
      type: 'input',
      message: 'Tests:',
      name: 'tests'
    },
    {
      type: 'input',
      message: 'Questions:',
      name: 'questions'
    }
  ]).then(response => {
    let fileContents = ``;
    fileContents += `# ${response.title}\n\n`;
    fileContents += `## Description\n\n${response.description}\n\n`;

    fileContents += `## Table of Contents` + 
                    `\n1. [Installation](#installation)` + 
                    `\n2. [Usage](#usage)` + 
                    `\n3. [License](#license)` + 
                    `\n4. [Contributors](#contributors)` + 
                    `\n5. [Tests](#tests)` + 
                    `\n6. [Questions](#questions)\n\n`;

    fileContents += `## Installation<a name="installation"></a>\n\n${response.installation}\n\n`;
    fileContents += `## Usage<a name="usage"></a>\n\n${response.usage}\n\n`;
    fileContents += `## License<a name=license></a>\n\n${response.license}\n\n`;
    fileContents += `## Contributors<a name=contributors></a>\n\n${response.contributing}\n\n`;
    fileContents += `## Tests<a name="tests"></a>\n\n${response.tests}\n\n`;
    fileContents += `## Questions<a name="questions"></a>\n\n${response.questions}\n\n`;
    fileContents += `![alt text](${userImage} "User Profile Image")`
    

      fs.writeFile('readme.txt', fileContents, function(err) {
        if (err) {
          throw err;
        } else {
          console.log("readme.md generated");
        }
      })
  })
  
})


