// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, number) {
    super(name);
    this.officeNumber = number;
  }

  getRole() {
    return "Manager";
  }
  getOfficeNumber() {
    return this.officeNumber;
  }
}

module.exports = Manager;
