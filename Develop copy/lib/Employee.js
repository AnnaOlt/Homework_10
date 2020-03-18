// TODO: Write code to define and export the Employee class
class Employee {
  // constructor(name, id, email) {
  //   this.name = name;
  //   this.id = id;
  //   this.title = "Employee";
  //   this.email = email;
  // }
  constructor(name, id = 1, email = "test@gmail.com", role = "Employee") {
    this.name = name;
    this.id = id;
    this.role = role;
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
    return this.role;
  }
}

module.exports = Employee;
