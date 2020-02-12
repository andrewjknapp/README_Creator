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
    console.log(userImage);
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
        message: 'Table of Contets (separated by a ,)',
        name: 'contents'
    }
  ]).then(response => {
      console.log(response);
  })
  
})


