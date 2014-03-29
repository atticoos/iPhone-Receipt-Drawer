function ApplicationWindow(args){
	var self = this,
		ModalImageView = require('ui/misc/ModalImageView');
	this.receipt = args.receipt;
	
	Ti.API.log(self.receipt);
	var win = Ti.UI.createWindow({
		title: "View Receipt",
		backgroundColor: 'white'
	});
	
	var title = Titanium.UI.createLabel({
		id: 'receipt_title',
		text: this.receipt.name,
		top: 5,
		height: 20,
		textAlign: 'center'
	});
	
	win.add(title);
	
	var category = Titanium.UI.createLabel({
		id: 'receipt_category',
		text: this.receipt.category.name,
		top: 40,
		height: 20,
		textAlign: 'center'
	});
	
	win.add(category);
	
	var total = Titanium.UI.createLabel({
		id: 'receipt_total',
		text: "$" + this.receipt.total,
		top: 80,
		height: 20,
		textAlign: 'center'
	});
	win.add(total);
	
	var date = Titanium.UI.createLabel({
		id: 'receipt_date',
		text: this.receipt.getDateString(),
		top: 120,
		height: 20,
		textAlign: 'center'
	});
	win.add(date);
	
	
	var imageView = new ModalImageView({
		id: 'receipt_image',
		top: 150,
		height: 180,
		left: 10,
		right: 10
	});
	win.add(imageView);
	
	
	var editButton = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.EDIT	
	});
	editButton.addEventListener('click', function(){
		var ReceiptWindow = require('ui/CreateReceiptWindow');
		var editWin = new ReceiptWindow.edit({
			receipt: self.receipt,
			containingTab: args.containingTab,
			tabGroup: args.tabGroup,
			parent: self
		});
		args.containingTab.open(editWin);

	});
	
	win.rightNavButton = editButton;
	win.addEventListener('focus', function(){
		title.setText(self.receipt.name);
		total.setText("$" + self.receipt.total);
		date.setText(self.receipt.getDateString());
		imageView.setImage(self.receipt.getImage());
	});
	
	
	return win;
};

module.exports = ApplicationWindow;