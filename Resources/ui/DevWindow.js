function ApplicationWindow(){
	var win = Ti.UI.createWindow({
		title: 'Dev Tools',
		backgroundColor:"#fff"
	});
	
	var view = Ti.UI.createView({
		left:10, right:10, top:10
	});
	
	
	var dumpDB = Ti.UI.createButton({
		title: 'Dump DB',
		top: 10,
		left: 20, right: 20,
		height: 30
	});
	dumpDB.addEventListener('click', function(){
		var db = require('dal/receipts');
		var alert = Ti.UI.createAlertDialog({
			title: "DB Dump",
			message: "Database Dumped"
		});
		if (db.dumpDB()){
			alert.show();
		}
	});
	view.add(dumpDB);
	
	
	
	var installDB = Ti.UI.createButton({
		title: 'Recreate DB',
		top: 50,
		left: 20, right: 20,
		height: 30
	});
	installDB.addEventListener('click', function(){
		var receipts = require('dal/receipts');
		var categories = require('dal/categories');
		var alert = Ti.UI.createAlertDialog({
			title: 'Creating DB',
			message: 'Creation complete'
		});
		categories.install();
		receipts.install();
		alert.show();
	});
	view.add(installDB);
	
	
	win.add(view);
	
	return win;
}

module.exports = ApplicationWindow;