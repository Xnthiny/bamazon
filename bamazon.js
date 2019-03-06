var mysql = require("mysql");
var inquirer = require('inquirer');

var con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'anthony',
    database: 'bamazon'
});

var itemPurchased;
var itemAmount;
var itemPrice;
2
function displayInv() {
    con.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity)
        }
    })
}

function chooseItem() {
    inquirer.prompt([{
        name: 'itemId',
        type: 'input',
        message: 'Choose an item ID that you would like to purchase.'
    }, {
        name: 'amount',
        type: 'input',
        message: 'How many units would you like to purchase?'
    }
    ]).then((answers) => {
        console.log("Answer received!")
        itemPurchased = parseFloat(answers.itemId)
        itemAmount = parseFloat(answers.amount)
        var newQuery = "SELECT * FROM products WHERE item_id=" + itemPurchased;
        con.query(newQuery, function (err, result) {
            var itemName = result[0].product_name
            var stock = parseFloat(result[0].stock_quantity);
            itemPrice = parseFloat(result[0].price)


            if (stock == 0 || stock < itemAmount) {
                console.log("Insufficient quantity!");
            } else {
                var finalStockAmount = stock - itemAmount
                var stockString = finalStockAmount.toString()
                var updateQuery = "UPDATE products SET stock_quantity=" + stockString + " WHERE item_id = " + itemPurchased;
                con.query(updateQuery, function (err, response) {
                    console.log("You've spent $" + itemPrice * itemAmount + " on " + itemName);
                })
            }

        })
    })
}


con.connect(function (err) {
    if (err) console.log(err)
    console.log(`connected as id ${con.threadId}`);
    displayInv();
    chooseItem();
});


