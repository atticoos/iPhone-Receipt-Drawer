var DATABASE_NAME = 'main';
var categories = ['Food', 'Groceries', 'Rent', 'Utilities', 'Other'];


function install(){
	var db = Ti.Database.open(DATABASE_NAME);
	Ti.API.info("Creating database...");
	db.execute("DROP TABLE IF EXISTS receipts");
	db.execute("CREATE TABLE IF NOT EXISTS receipts (id integer primary key, name text, total numeric, category text, date text, image text)");
}
//install();


function getReceipts(){
	var db = Ti.Database.open(DATABASE_NAME),
		Receipt = require('entities/receipt'),
		receipts = [];
	var rows = db.execute("SELECT * FROM receipts ORDER BY date DESC");
	

	while (rows.isValidRow()){
		receipts.push(new Receipt({
			id: rows.fieldByName('id'),
			name: rows.fieldByName('name'),
			total: rows.fieldByName('total'),
			category: rows.fieldByName('category'),
			date: rows.fieldByName('date'),
			image: rows.fieldByName('image')
		}));
		rows.next();
	}
	db.close();
	Ti.API.info("DATA", receipts);
	return receipts;
}


function getCategories() {
	return categories;
}


function createReceipt(receipt){
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute("INSERT INTO receipts (name, total, date, category, image) values (?,?,?,?, ?)", 
		receipt.name, 
		receipt.total, 
		receipt.date, 
		receipt.category,
		receipt.image
	);
	db.close();
}

function updateReceipt( receipt ){
	var db = Ti.Database.open(DATABASE_NAME);
	Ti.API.info("UPDATING RECEIPT", receipt);
	db.execute("UPDATE receipts set name = ?, total = ?, category = ?, date = ?, image = ? WHERE id = ?", 
		receipt.name,
		receipt.total,
		receipt.category,
		receipt.date,
		receipt.image,
		receipt.id
	);
	db.close();
}

function deleteReceipt( receiptID ){
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute("DELETE FROM receipts WHERE id = ?", receiptID);
	db.close();
}


function dumpDB(){
	var imageStorage = require('dal/images');
	var ImageStorageService = new imageStorage();
	
	var db = Ti.Database.open(DATABASE_NAME);
	var receipts = getReceipts();
	for (var i=0; i<receipts.length; i++){
		ImageStorageService.deleteFile(receipts[i].image);
	}
	
	db.execute("DELETE FROM receipts");
	db.close();
	return true;
}

module.exports = {
	createReceipt: createReceipt,
	getCategories: getCategories,
	getReceipts: getReceipts,
	deleteReceipt: deleteReceipt,
	updateReceipt: updateReceipt,
	
	
	// DEV TOOLS
	dumpDB: dumpDB,
	install: install
}

