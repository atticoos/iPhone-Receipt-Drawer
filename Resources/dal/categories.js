var DATABASE_NAME = 'main';

function install(){
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute("DROP TABLE IF EXISTS categories");
	db.execute("CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, name TEXT)");
		
	var startingCategories = ['Food', 'Groceries', 'Rent', 'Utilities', 'Other'];
	for (var i=0; i<startingCategories.length; i++){
		db.execute("INSERT INTO categories (name) VALUES (?)", startingCategories[i]);
	}
	db.close();
};

function getCategories() {
	var db = Ti.Database.open(DATABASE_NAME),
		Category = require('entities/category'),
		categories = [],
		rows = db.execute("SELECT * FROM categories ORDER BY name ASC");
	
	while (rows.isValidRow()){
		categories.push(new Category({
			id: rows.fieldByName('id'),
			name: rows.fieldByName('name')
		}));
		
		rows.next();
	}
	
	db.close();
	return categories;
};

function createCategory( categoryName ){
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute("INSERT INTO categories (name) VALUES (?)", categoryName);
	db.close();
};

function deleteCategory( categoryID ){
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute("DELETE FROM categories WHERE id = ?", categoryID);
	db.close();
};

install();

module.exports = {
	getCategories: getCategories,
	createCategory: createCategory,
	deleteCategory: deleteCategory,
	
	
	// dev procedures
	install: install
};