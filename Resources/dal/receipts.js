var DATABASE_NAME = 'main';


function install(){
	var db = Ti.Database.open(DATABASE_NAME);
	Ti.API.info("Creating database...");
	//db.execute("DROP TABLE receipts");
	db.execute("DROP TABLE IF EXISTS receipts");
	db.execute("CREATE TABLE IF NOT EXISTS receipts (id INTEGER PRIMARY KEY, name TEXT, total NUMERIC, category INTEGER, date TEXT, image TEXT, person TEXT, venue INTEGER, FOREIGN KEY(category) REFERENCES categories(id), FOREIGN KEY (venue) REFERENCES venues(id))");
}
//install();


function getAllReceipts(){
	return getReceipts( false );
}

function getReceipts( category ){
	var db = Ti.Database.open(DATABASE_NAME),
		Receipt = require('entities/receipt'),
		ReceiptGroup = require('entities/ReceiptGroup'),
		receipts = [],
		rows;
		
	if (category){
		rows = db.execute(
			"SELECT R.*, C.id AS categoryID, C.name AS categoryName " +
			"V.id AS venueID, V.name AS venueName, V.lat AS venueLat, V.lng AS venueLng, V.category AS venueCategory, V.icon AS venueIcon " +
			"FROM receipts R " +
			"JOIN categories C ON R.category = C.id " +
			"JOIN venues V ON R.venue = V.id " +
			"WHERE R.category = ? " +
			"ORDER BY date DESC", category);
	} else {
		rows = db.execute("SELECT R.*, C.id AS categoryID, C.name AS categoryName FROM receipts R JOIN categories C ON R.category = C.id ORDER BY date DESC");
	}

	while (rows.isValidRow()){
		receipts.push(new Receipt({
			id: rows.fieldByName('id'),
			name: rows.fieldByName('name'),
			total: rows.fieldByName('total'),
			date: rows.fieldByName('date'),
			image: rows.fieldByName('image'),
			person: rows.fieldByName('person'),
			category: {
				id: rows.fieldByName('categoryID'),
				name: rows.fieldByName('categoryName')
			},
			venue: {
				id: rows.fieldByName('venueID'),
				name: rows.fieldByName('venueName'),
				lat: rows.fieldByName('venueLast'),
				lng: rows.fieldByName('venueLng'),
				category: rows.fieldByName('venueCategory'),
				icon: rows.fieldByName('venueIcon')
			}
		}));
		rows.next();
	}
	db.close();
	Ti.API.log("getReceipts()", receipts);
	return new ReceiptGroup(receipts);
}


function getReceiptGroupList(){
	var db = Ti.Database.open(DATABASE_NAME),
		ReceiptGroupAggregate = require('entities/ReceiptGroupAggregate'),
		ReceiptGroups = require('entities/ReceiptGroups'),
		results = [];
	
	var rows = db.execute("SELECT C.id AS categoryID, C.name AS categoryName, COUNT(1) as receiptCount, SUM(total) AS receiptTotal FROM receipts R JOIN categories C ON R.category = C.id GROUP BY R.category");
	
	while(rows.isValidRow()){
		results.push(new ReceiptGroupAggregate({
			id: rows.fieldByName('categoryID'),
			name: rows.fieldByName('categoryName'),
			total: rows.fieldByName('receiptTotal'),
			count: rows.fieldByName('receiptCount')
		}));
		rows.next();
	}
	db.close();
	return new ReceiptGroups(results);
}


function createReceipt(receipt){
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute("INSERT INTO receipts (name, total, date, category, image, person) values (?,?,?,?,?,?)", 
		receipt.name, 
		receipt.total, 
		receipt.date, 
		receipt.category,
		receipt.image,
		receipt.person
	);
	db.close();
}

function updateReceipt( receipt ){
	var db = Ti.Database.open(DATABASE_NAME);
	Ti.API.info("UPDATING RECEIPT", receipt);
	db.execute("UPDATE receipts set name = ?, total = ?, category = ?, date = ?, image = ?, person = ? WHERE id = ?", 
		receipt.name,
		receipt.total,
		receipt.category,
		receipt.date,
		receipt.image,
		receipt.person,
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
	getAllReceipts: getAllReceipts,
	getReceipts: getReceipts,
	deleteReceipt: deleteReceipt,
	updateReceipt: updateReceipt,
	getReceiptGroupList: getReceiptGroupList,
	
	// DEV TOOLS
	dumpDB: dumpDB,
	install: install
}

