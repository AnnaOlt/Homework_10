const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  console.log("render is being called.");
  const html = [];

  html.push(
    employees
      .filter(employee => employee.getRole() === "Manager")
      .map(manager => renderManager(manager))
  );
  html.push(
    employees
      .filter(employee => employee.getRole() === "Engineer")
      .map(engineer => renderEngineer(engineer))
  );
  html.push(
    employees
      .filter(employee => employee.getRole() === "Intern")
      .map(intern => renderIntern(intern))
  );
  console.log("Before calling renderMain...", employees);
  return renderMain(html.join(""));
};

const renderManager = manager => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "manager.html"),
    "utf8"
  );
  console.log("manager in renderManager", manager);
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(
    template,
    "officeNumber",
    manager.getOfficeNumber()
  );
  return template;
};

const renderEngineer = engineer => {
  console.log("renderEngineer is being called");
  let template = fs.readFileSync(
    path.resolve(templatesDir, "engineer.html"),
    "utf8"
  );
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  console.log("renderEngineer is returning");
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "intern.html"),
    "utf8"
  );
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

const renderMain = html => {
  console.log("renderMain is being called");
  const template = fs.readFileSync(
    path.resolve(templatesDir, "main.html"),
    "utf8"
  );
  console.log("Before replacePlaceholders...");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  console.log("replacePlaceholders is being called");
  console.log(" ");
  console.log(" ");
  console.log("---------------- START ----------------------------");
  console.log("template: ", template);
  console.log("placeholder: ", placeholder);
  console.log("value: ", value);
  console.log(" ");
  console.log(" ");
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

exports.render = render;
