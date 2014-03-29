function ApplicationWindow(title) {
	var win = Ti.UI.createWindow({
		title:L('receipts'),
		backgroundColor:'white'
	});
	

	var tableView = Ti.UI.createTableView({
		editable: true
	});
	var addButton = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ADD	
	});
		
	addButton.addEventListener('click', function(){
		var ReceiptWindow = require('ui/CreateReceiptWindow'),
			createWin = new ReceiptWindow.create();
		win.containingTab.open(createWin);
	});
	
	
	win.rightNavButton = addButton;
	
	
	tableView.addEventListener('click', function(e){
		var ViewReceiptWindow = require('ui/ViewReceiptWindow'),
			receiptWin = new ViewReceiptWindow({ 
				receipt: e.rowData.receipt,
				containingTab: win.containingTab,
				tabGroup: win.tabGroup
			});
		win.containingTab.open(receiptWin);
	});
	tableView.addEventListener('delete', function(e){
		var receiptService = require('dal/receipts');
		receiptService.deleteReceipt(e.rowData.id);
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
			receipt: receipt,
			height: 50
		});
		
		var rowView = Ti.UI.createView({
			left: 10, right: 10, top:10, bottom:10
		});
		
		var title = Ti.UI.createLabel({
			text: receipt.name,
			left:0, top:0, color:'#000',
			font: { fontSize: 12 }
		});
		
		var category = Ti.UI.createLabel({
			text: receipt.category,
			top:0, right:0, 
			font: { fontSize: 10 },
			color:'#000'
		});
		
		rowView.add(title);
		rowView.add(category);
		row.add(rowView);
		
		
		
		data.push(row);
	}
	return data;
}


module.exports = ApplicationWindow;
