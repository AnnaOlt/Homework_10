// TODO: Write code to define and export the Employee class
class Employee {
  // constructor(name, id, email) {
  //   this.name = name;
  //   this.id = id;
  //   this.title = "Employee";
  //   this.email = email;
  // }
  constructor(name, id = 1, email = "test@gmail.com", title = "Employee") {
    this.name = name;
    this.id = id;
    this.title = title;
    this.email = email;
  }
  getName() {
    return this.name;
  }
  getId() {
    return this.id;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return "Employee";
  }
}

module.exports = Employee;
