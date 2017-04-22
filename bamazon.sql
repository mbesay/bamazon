Create database bamazon_db;

use bamazon_db;

create table bamazon.products
(
	item_id integer (100) auto_increment not null,
	product_name varchar(50) not null,
	department_name varchar(30) not null,
	price decimal (5,2),
	stock_quantity integer (20),
    PRIMARY KEY (item_id)
)
;