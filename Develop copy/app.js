const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Create an array that stores all the objects
let employees = [];

async function promptUser() {
  let answers = await inquirer.prompt([
    {
      type: "input",
      name: "role",
      message: "What is your role?"
    },
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is your id?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?"
    }
  ]);

  console.info("Answers:", JSON.stringify(answers));
  switch (answers.role) {
    case "Engineer":
      return displayEngineer(answers);
    case "Intern":
      return displayIntern(answers);
    case "Manager":
      console.log("In switch statement display manager");
      return displayManger(answers);
    default:
      return null;
  }
}

function displayEngineer(origAnswers) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "github",
        message: "What is your github username?"
      },
      {
        type: "confirm",
        name: "moreEmployees",
        message: "Would you like to add more employees?"
      }
    ])
    .then(newAnswers => {
      console.info("newAnswers:", JSON.stringify(newAnswers));

      let newEngineer = new Engineer(
        origAnswers.name,
        origAnswers.id,
        origAnswers.email,
        newAnswers.github
      );
      console.log(
        "Pushing engineer into array: " + JSON.stringify(newEngineer)
      );
      employees.push(newEngineer);
      if (newAnswers.moreEmployees) {
        promptUser();
      } else {
        createMainHTML();
      }
    });
}

function displayIntern(origAnswers) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "school",
        message: "What school do you attend?"
      },
      {
        type: "confirm",
        name: "moreEmployees",
        message: "Would you like to add more employees?"
      }
    ])
    .then(newAnswers => {
      console.info("newAnswers:", JSON.stringify(newAnswers));

      let newIntern = new Intern(
        origAnswers.name,
        origAnswers.id,
        origAnswers.email,
        newAnswers.school
      );
      console.log("Pushing intern into array: " + JSON.stringify(newIntern));
      employees.push(newIntern);
      if (newAnswers.moreEmployees) {
        promptUser();
      } else {
        createMainHTML();
      }
    });
}

function displayManger(origAnswers) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "officeNumber",
        message: "What is your office number?"
      },
      {
        type: "confirm",
        name: "moreEmployees",
        message: "Would you like to add more employees?"
      }
    ])
    .then(newAnswers => {
      console.info("newAnswers:", JSON.stringify(newAnswers));

      let newManager = new Manager(
        origAnswers.name,
        origAnswers.id,
        origAnswers.email,
        newAnswers.officeNumber
      );
      console.log("Pushing manager into array: " + JSON.stringify(newManager));
      employees.push(newManager);
      if (newAnswers.moreEmployees) {
        promptUser();
      } else {
        createMainHTML();
      }
      //render.render(employees);
    });
}

function createMainHTML() {
  try {
    fs.writeFile(outputPath, render.render(employees), (err, data) => {
      if (err) throw err;
      console.log("File Created in output folder");
    });
  } catch (e) {
    console.log(e);
  }
}

async function execute() {
  await promptUser();
}

execute();
