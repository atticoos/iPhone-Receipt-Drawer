function ApplicationWindow(receipt){
	var win = Ti.UI.createWindow({
		title: "View Receipt",
		backgroundColor: 'white'
	});
	
	var title = Titanium.UI.createLabel({
		id: 'receipt_title',
		text: receipt.name,
		top: 5,
		height: 20,
		textAlign: 'center'
	});
	
	win.add(title);
	
	var category = Titanium.UI.createLabel({
		id: 'receipt_category',
		text: receipt.category,
		top: 40,
		height: 20,
		textAlign: 'center'
	});
	
	win.add(category);
	
	var total = Titanium.UI.createLabel({
		id: 'receipt_total',
		text: "$" + receipt.total,
		top: 80,
		height: 20,
		textAlign: 'center'
	});
	win.add(total);
	
	
	return win;
};

module.exports = ApplicationWindow;