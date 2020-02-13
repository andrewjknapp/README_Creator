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
  let userProfile;

  axios
  .get(queryUrl)
  .then(function(res) {
    email = res.data.email;
    userImage = res.data.avatar_url;
    userProfile = res.data.html_url;
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
        message: 'What commands are required to install dependencies:',
        name: 'installation'
    },
    {
        type: 'input',
        message: 'What skills are needed to use this project:',
        name: 'usage'
    },
    {
        type: 'rawlist',
        message: 'Licence:',
        name: 'license',
        choices: [
          'MIT',
          'APACHE 2.0',
          'GPL 3.0',
          'BSD 3',
          'none'
        ]
    },
    {
      type: 'input',
      message: 'What does the user need to know to contribute to the project:',
      name: 'contributing'
    },
    {
      type: 'input',
      message: 'What command is used to test this application:',
      name: 'tests'
    }
  ]).then(response => {
    let fileContents = ``;
    fileContents += `# ${response.title}\n\n`;

    if (response.license !== 'none') {
      let license;
      switch(response.license) {
        case 'MIT':
          license = 'MIT';
          break;
        case `APACHE 2.0`:
          license = 'APACHE';
          break;
        case 'GPL 3.0':
          license = 'GPL';
          break;
        case 'BSD 3':
          license = 'BSD';
          break;
      }
      fileContents += `[![GitHub license](https://img.shields.io/badge/license-${license}-blue.svg)](https://github.com/${username}/${response.title})\n\n`;
  
    }
    
    fileContents += `## Description\n\n${response.description}\n\n`;
    
    fileContents += `## Table of Contents` + 
                    `\n1. [Installation](#installation)` + 
                    `\n2. [Usage](#usage)` + 
                    `\n3. [License](#license)` + 
                    `\n4. [Contributors](#contributors)` + 
                    `\n5. [Tests](#tests)` + 
                    `\n6. [Questions](#questions)\n\n`;

    fileContents += `## Installation<a name="installation"></a>\n\nRun the following command to install dependencies:\n\n`
    fileContents += "```\n" + `${response.installation}\n` + "```\n\n";

    fileContents += `## Usage<a name="usage"></a>\n\n${response.usage}\n\n`;

    fileContents += `## License<a name=license></a>\n\n`;
    if(response.liscence !== 'none') {
      fileContents += `This project can be used under the ${response.license} License.\n\n`;
    } else {
      fileContents += `This project is not listed with a license.\n\n`;
    }

    fileContents += `## Contributors<a name=contributors></a>\n\n${response.contributing}\n\n`;
    
    fileContents += `## Tests<a name="tests"></a>\n\n`
    if(response.tests !== "") {
      fileContents += `Run the following command to run tests:\n\n`;
      fileContents += "```\n" + `${response.tests}\n` + "```\n\n";
    }

    fileContents += `## Questions<a name="questions"></a>\n\n`;
    fileContents += `<img src="${userImage}" alt="User Profile Image" height="100">\n\n`
    fileContents += `If you have any questions about the repo, open an issue or contact [${username}](${userProfile}) directly at ${email}`;
    

      fs.writeFile('readme.md', fileContents, function(err) {
        if (err) {
          throw err;
        } else {
          console.log("---------------\nreadme.md generated\n---------------");
        }
      })
  })
  
})


