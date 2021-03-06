var mysql = require('mysql');
var inquirer = require('inquirer');
var con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'anthony',
    database: 'bamazon'
});

var prompt = inquirer.createPromptModule();
var questions = [
    {
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }
]

function run() {
    prompt(questions).then((answers) => {
        var value = answers.menu
        switch (value) {
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                viewLowInv();
                break;
            case 'Add to Inventory':
                addToInv();
                break;
            case 'Add New Product':
                addNewProd();
                break;
        }
    })
}

function welcome() {
    console.log("Bamazon Managment System")
}

function viewProducts() {
    con.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity)
        }
    })
}

function viewLowInv() {
    con.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity)
        }
    })
}

function addToInv() {
    console.log('works!')
}

function addNewProd() {
    console.log('works!')
}

con.connect(function (err) {
    if (err) console.log(err)
    console.log(`connected as id ${con.threadId}`);
    welcome();
    run();
});