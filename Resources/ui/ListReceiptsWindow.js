function ApplicationWindow(title) {
	var win = Ti.UI.createWindow({
		title:L('receipts'),
		backgroundColor:'#eee'
	});
	

	var tableView = Ti.UI.createTableView({
		editable: true,
		left:0, right:0,
		separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
		backgroundColor:"#eee"
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
	
	
	var filterButton = Ti.UI.createButton({
		title: "Filter"
	});
	filterButton.addEventListener('click', function(){
		var filterModule = require('ui/ListFilterWindow');
		var filterWin = new filterModule();
		
		filterWin.open({
			modal: true, 
			modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL,
			modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_PAGESHEET
		});
	});
	win.leftNavButton = filterButton;
	
	
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
			left:0, right:0,
			height: 60
		});
		
		var rowView = Ti.UI.createView({
			left: 5, right: 5, top:5, bottom:5,
			backgroundColor:"#fff"
		});
		
		var detailView = Ti.UI.createView({
			left: 60, top:5, bottom:5, right: 10
		});
		
		
		var title = Ti.UI.createLabel({
			text: receipt.name,
			left:0, top:0, color:'#000',
			font: { fontSize: 14}
		});
		
		var category = Ti.UI.createLabel({
			text: receipt.category.name,
			top:0, right:0, 
			font: { fontSize: 12 },
			color:'#C0C0C0'
		});
		
		var total = Ti.UI.createLabel({
			text: "$" + receipt.total,
			bottom:0, left:0,
			font: { fontSize: 12 },
			color:"#C0C0C0"
		});
		
		var date = Ti.UI.createLabel({
			text: receipt.getDateString(),
			bottom:0, right: 0,
			font: { fontSize: 12 },
			color:"#C0C0C0"
		});
		
		var personView = Ti.UI.createView({
			top:0,left:0,height:60,width:55,
			backgroundColor:"pink"
		});
		
		var personText = Ti.UI.createLabel({
			text: receipt.person.charAt(0), top:5, color:"#fff", left:0, right:0,
			textAlign:'center',
			font: {fontSize: 32, fontWeight:"bold"}
		});
		
		personView.add(personText);
		
		detailView.add(title);
		detailView.add(category);
		detailView.add(total);
		detailView.add(date);
		rowView.add(detailView);
		rowView.add(personView);
		row.add(rowView);
		
		
		
		data.push(row);
	}
	return data;
}


module.exports = ApplicationWindow;
