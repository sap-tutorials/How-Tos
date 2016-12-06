/******************************************************************************
declaration of arrays and json objects
to make the use of prompts via inquirer easier
******************************************************************************/
"use strict"

var exports = module.exports = {};

/****first json to build the first prompt via inquirer-> to make the first selection about which tutorials the user would like to test****/
exports.choicearray = [
  {
    type: "list",
    name: "scopetutorial",
    message: "What would you like to test?",
    choices: [
     // "all",
     // "wip",
      "how-to"
     //"specific"
     // "input"
    ]
  }
];

/**** json to build the second dialog/ prompt in case the user chooses sepecific selection in the first one
-> to make the next selection about which folder you would like to test****/
exports.choice2array = [
  {
    type: "list",
    name: "scopetutorial",
    message: "Which specific how-tos would you like to test?",
    choices: [
      "from wip",
      "from how-to",
    ]
  }
];

/***json to build second dialog in case the user chooses input at first selection
->select wip or tutorial and then enter beginning of filenames */
exports.choiceinputarray = [
  {
    type: "list",
    name: "inputscopetutorial",
    message: "Which specific how-tos would you like to test?",
    choices: [
      "from wip",
      "from how-to",
    ]
  },
  {
    type: 'input',
    name: 'inputselection',
    message: 'Which how-tos would you like to test? Enter beginning of filenames (you can start and or just end with *): '
  }
];

//help object - in case the user misses the * at the end of the input field he has to tip it in again
exports.choiceinputarray2 = [
  {
    type: "list",
    name: "inputscopetutorial",
    message: "Which specific how-tos would you like to test?",
    choices: [
      "from wip",
      "from how-to",
    ]
  },{
    type: 'input',
    name: 'inputselection',
    message: 'input hast to end with * -> Which how-tos would you like to test? Enter beginning of filenames (you can start and or just end with *): '
  }
];

//declaration of the array with all tutorials (folder: tutorial) (the input with the files comes later in another funtion)
exports.arraytutorials = [
  {type: "checkbox",
  message: "Choose how-tos which you would like to test",
  name: "specifictutorials", //"specificselection",
  choices: [
    ]
  }
];

//declaration of the array with all work-in-progress tutorials (folder: work-in-progress) (the input with the files comes later in another funtion)
exports.arraywip = [
  {type: "checkbox",
  message: "Choose specific how-tos from wip",
  name: "specifictutorials", //"specificselection",
  choices: [
    ]
  }
];
