function AggregateSection(){
	this.view = Ti.UI.createView({
		left:10, right: 10, top: 10,
		height: 80
	});
	
	var totalView = Ti.UI.createView({
		left: 0, top:0, width: 80, height:80,
		backgroundColor:"#fff"
	});
	var totalTitle = Ti.UI.createLabel({
		left: 5, top:5, right: 5, height: 20,
		color:"#000", text: "Total", textAlign:"center"
	});
	var totalLabel = Ti.UI.createLabel({
		left:5, right: 5, bottom: 5, height: 20,
		color:"#000", text: "--", textAlign: "center",
		font: { fontSize: 26 }

	});
	totalView.add(totalTitle);
	totalView.add(totalLabel);
	
	
	var countView = Ti.UI.createView({
		right:0, top:0, width:80, height:80,
		backgroundColor:"#fff"
	});
	var countTitle = Ti.UI.createLabel({
		left:5, top:5, right: 5, height: 20,
		color:"#000", text:"Count", textAlign:"center"
	});
	var countLabel = Ti.UI.createLabel({
		left: 5, right: 5, bottom:0, height:20,
		color:"#000", text: "--", textAlign: "center",
		font: { fontSize: 26 }
	});
	countView.add(countTitle);
	countView.add(countLabel);
	
	
	this.view.add(totalView);
	this.view.add(countView);
	
	this.updateTotal = function( total ){
		totalLabel.text = total;
	}; 
	
	this.updateCount = function( count ){
		countLabel.text = count;
	};
};


function ListReceiptWindow( args ){
	var ReceiptService = require('dal/receipts'),
		ReceiptGroup = false; 
	
	var win = Ti.UI.createWindow({
		title: "Receipts - " + args.receiptGroup.name ,
		backgroundColor:"#eee"
	});
	
	var aggregateSection = new AggregateSection();
	win.add(aggregateSection.view);
	
	
	var tableView = Ti.UI.createTableView({
		editable: true,
		left: 0, right: 0, top: 100,
		separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		backgroundColor:"#eee"
	});
	
	tableView.addEventListener('click', function(e){
		var ViewReceiptWindow = require('ui/ViewReceiptWindow'),
			receiptWin = new ViewReceiptWindow({
				receipt: e.rowData.receipt,
				containingTab: args.containingTab,
				tabGroup: args.containingTab
			});
		args.containingTab.open(receiptWin);
	});
	
	win.add(tableView);
	
	
	
	
	win.addEventListener('focus', function(){
		ReceiptGroup = ReceiptService.getReceipts( args.receiptGroup.id );
		aggregateSection.updateTotal(ReceiptGroup.getTotal());
		aggregateSection.updateCount(ReceiptGroup.getCount());
		tableView.setData(getTableData(ReceiptGroup.receipts));
	});
	
	return win;
}


function getTableData( receipts ){
	
	var data = [],
		ReceiptRow = require('ui/misc/ReceiptRow');
	
	for (var i=0; i<receipts.length; i++){
		var row = new ReceiptRow(receipts[i]);
		data.push(row);
	}
	return data;
}

module.exports = ListReceiptWindow;