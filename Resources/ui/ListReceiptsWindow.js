function ApplicationWindow(title) {
	var win = Ti.UI.createWindow({
		title:L('receipts'),
		backgroundColor:'white'
	});
	

	var tableView = Ti.UI.createTableView(),
		addButton = Ti.UI.createButton({
			systemButton: Titanium.UI.iPhone.SystemButton.ADD	
		});
		
	addButton.addEventListener('click', function(){
		var CreateReceiptWindow = require('ui/CreateReceiptWindow'),
			createWin = new CreateReceiptWindow();
		win.containingTab.open(createWin);
	});
	
	
	win.rightNavButton = addButton;
	
	
	tableView.addEventListener('click', function(e){
		var ViewReceiptWindow = require('ui/ViewReceiptWindow'),
			receiptWin = new ViewReceiptWindow(e.rowData.receipt);
		win.containingTab.open(receiptWin);
	});
	win.add(tableView);
	
	
	
	win.addEventListener('focus', function(){
		tableView.setData(getTableData());
	});

	return win;
};

function getTableData(){
	var data = [],
		receipts = require('dal/receipts').getReceipts();
	for (var i=0; i<receipts.length; i++){
		var receipt = receipts[i];
		var row = Ti.UI.createTableViewRow({
			id: receipt.id,
			title: receipt.name,
			color: "#000",
			receipt: receipt
		});
		data.push(row);
	}
	return data;
}


module.exports = ApplicationWindow;
