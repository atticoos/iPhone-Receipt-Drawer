function ApplicationWindow(title) {
	var win = Ti.UI.createWindow({
		title:L('receipts'),
		backgroundColor:'#eee'
	});
	

	var tableView = Ti.UI.createTableView({
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
		var ViewReceiptWindow = require('ui/ListReceiptWindow'),
			receiptWin = new ViewReceiptWindow({ 
				receiptGroup: e.rowData.receipt,
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
		ReceiptGroupRow = require('ui/misc/ReceiptGroupRow'),
		receiptGroups = require('dal/receipts').getReceiptGroupList();
	
	
	for (var i=0; i<receiptGroups.groups.length; i++){
		var receipt = receiptGroups.groups[i];
		
		var row = new ReceiptGroupRow(receipt);
		
		
		data.push(row);
	}
	
	var allRow = new ReceiptGroupRow(receiptGroups.getAll());
	data.unshift(allRow);
	
	return data;
}


module.exports = ApplicationWindow;
