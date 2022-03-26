const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');


const employees = [];

const employeeInfo = [
    {
        type: 'input',
        name: 'name',
        message: "Employee's full name:",
    },
    {
        type: 'input',
        name: 'id',
        message: 'ID associated with this employee:'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Employee`s email address:',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('You must include an email!');
                return false;
            }
        }   
    }
];

const promptStart = () => {
    let newPrompt = [];
    console.log(`ADD A TEAM MANAGER`);

    newPrompt = employeeInfo.concat({
        type: 'input',
        name: 'officeNumber',
        message: 'Provide the office number for team:',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please include the office number!');
                return false;
            }
        }
    });

    return newPrompt;
};


const addNewTeamMember = (employees) => {
    return inquirer.prompt({
       type: 'list',
       message: 'Add a Team Member to the roster?',
       name: 'role',
       choices: ['Engineer', 'Intern', new inquirer.Separator(), "Finish", new inquirer.Separator()]
   })
   .then(({ role }) => {
       
       if (role === 'Engineer') {
           return promptEngineer(employees);
       } else if (role === 'Intern') {
           return promptIntern(employees);
       } else {
       return employees;
       }
   });
};

const promptEngineer = (employees) => {
    let newPrompt = [];
    console.log(`ADDING NEW ENGINEER`);

    newPrompt = employeeInfo.concat({
        type: 'input',
        name: 'github',
        message: 'Employee Github username:',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('You must include a Github username!');
                return false;
            }
        }
    });

    return inquirer.prompt(newPrompt)
                .then(({name, id, email, github}) => {
                        employees.push(new Engineer(name, id, email, github));
                        return addNewTeamMember(employees);
                    });
};

const promptIntern = () => {
    let newPrompt = [];
    console.log(`ADDING NEW INTERN`);
    newPrompt = employeeInfo.concat({
        type: 'input',
        name: 'school',
        message: 'Provide intern`s school:'
    });

    return inquirer.prompt(newPrompt)
                .then(({name, id, email, school}) => {
                        employees.push(new Intern(name, id, email, school));
                        return addNewTeamMember(employees);
                    });

};


inquirer.prompt(promptStart())
   .then(({name, id, email, officeNumber}) => {
   employees.push(new Manager(name, id, email, officeNumber));
   return addNewTeamMember(employees);
   })
   .catch(err => {
       console.log(err);
   });