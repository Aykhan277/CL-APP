import inquirer from "inquirer";
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import {sleep} from './sleep.js'; 
import { getCategories, getJoke } from './data.js';

let name;
let userChoice;
let categories;
let userCategoriaChoose;
let joke;
let playAgain;

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Welcome to the Chuk Norris App');

    await sleep();
    rainbowTitle.stop();
}

await welcome();

await inquirer.prompt([{
    type: 'input',
    name: "firstName",
    message: chalk.cyan.bold("What is your name?\n"),
    default(){
        return 'John';
    }
}]
).then(res => {
    name = res.firstName;
}).catch (err => err);

await inquirer.prompt([{
    type: 'confirm',
    name: 'wants',
    message: chalk.cyan.bold(`Dear ${name}, Do you want hear some jokes?`),
    default: false,
}]).then(res => {
    userChoice = res.wants;
}).catch(err => err);


if (userChoice) {
    categories = await getCategories('https://api.chucknorris.io/jokes/categories');
    categories = categories.data;
}
else {
    console.log(chalk.red.bold('OK, fuck off!'));
    process.exit(1);
}


async function play() {
    
    await inquirer.prompt([{
        type:'list', 
        name: 'categorieName',
        message: chalk.cyan.bold('What type of joke do you want hear?'),
        choices: categories,
        default: "animal"
    }]).then(res => {
        userCategoriaChoose = res.categorieName;
    })


    joke = await getJoke(`https://api.chucknorris.io/jokes/random?category=${userCategoriaChoose}`);
    console.log(chalk.cyan.bold(joke.data.value));

    await sleep(4000);

    await inquirer.prompt([{
        type: 'confirm',
        name: 'playAgain',
        message: chalk.blue.bold('Do you want to play again?'),
        default: false,
    }])
    .then(res => {
        playAgain = res.playAgain;
    })

    if (playAgain) {
        await play();
    }
    else {
        console.log(chalk.red.bold('OK, fuck off!'));
    }

}

await play();