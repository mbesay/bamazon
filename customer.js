var mysql = require("mysql");
var inquirer = require("inquirer");
//connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Supes0718",
    database: "bamazon_db"
});
// mysql server and sql database connection
connection.connect(function(err) {
    if (err) throw err;
});


var start = function() {
    connection.query("SELECT * FROM products", function(err, results) {
        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].item_id + "|| Product name: " + results[i].product_name +
                "|| Department Name: " +
                results[i].department_name + "|| Price: " +
                results[i].price + "|| Stock Quanity: " +
                results[i].stock_quanity);
        }

        inquirer.prompt([{
            name: "ID",
            type: "input",
            message: "Insert ID of the item you would like to purchase."
        }, {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?"
        }]).then(function(answer) {

            var selectedItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id == answer.ID) {
                    selectedItem = results[i];
                    if (selectedItem.stock_quanity >= answer.quantity) {
                        var quantity = + selectedItem.stock_quanity - +answer.quantity;
                        connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quanity: quantity
                        }, {
                            item_id: answer.ID
                        }],
                        function(err, res) {
                            console.log("Total: $" + selectedItem.price * answer.quantity);


                        });
                    } else {
                        console.log("Insufficient quantity! Please try again.");
                    }
                }
            }


            start();
        });
    });
};

start();
