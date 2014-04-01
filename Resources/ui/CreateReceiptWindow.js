var pickerSectionHeight = 280;
var windowBG = "#eee";
var sectionBG = "#fff";



function ApplicationWindow( ){
	var self = this,
		PhotoSection = require('ui/CreateReceipt/PhotoSection'),
		NameSection = require('ui/CreateReceipt/NameSection'),
		TotalSection = require('ui/CreateReceipt/TotalSection'),
		CategorySection = require('ui/CreateReceipt/CategorySection'),
		DateSection = require('ui/CreateReceipt/DateSection'),
		PersonSection = require('ui/CreateReceipt/PersonSection'),
		LocationSection = require('ui/CreateReceipt/LocationSection');
		
		
	this.win = Ti.UI.createWindow({
		title: L('createReceipt'),
		backgroundColor: windowBG
	});
	
	this.view = Ti.UI.createScrollView({
		top:0,
		contentWidth: 'auto',
		contentHeight: 'auto'
	});
	
	this.photoSection = new PhotoSection( this );
	this.view.add(this.photoSection.view);
	
	this.nameSection = new NameSection( this.photoSection.getOffset() );
	this.view.add(this.nameSection.view);
	
	
	this.totalSection = new TotalSection( this.nameSection.getOffset() );
	this.view.add(this.totalSection.view);

	
	this.categorySection = new CategorySection( this.totalSection.getOffset() );
	this.view.add(this.categorySection.view);
	
	
	this.dateSection = new DateSection( this.categorySection.getOffset() );
	this.view.add(this.dateSection.view);
	
	this.personSection = new PersonSection( this.dateSection.getOffset() );
	this.view.add(this.personSection.view);
	
	this.locationSection = new LocationSection( this.personSection.getOffset() );
	this.view.add(this.locationSection.view);
	
	
	
	this.view.addEventListener('dragstart', function(){
		self.nameSection.nameField.blur();
		self.totalSection.totalField.blur();
	});
	
	
	this.adjustOffsets = function(){
		var sections = [this.photoSection, this.nameSection, this.totalSection, this.categorySection, this.dateSection, this.personSection];
		for (var i=1; i<sections.length; i++){
			sections[i].view.top = sections[i-1].getOffset() + 20;
		}
	}
	
		
	
	this.win.add(this.view);
};


function EditWindow( args ){
	var ReceiptWindow = new ApplicationWindow();
	var win = ReceiptWindow.win;
	var receipt = args.receipt;
	
	ReceiptWindow.photoSection.setImage(receipt.getImage());
	ReceiptWindow.nameSection.nameField.setValue(receipt.name);
	ReceiptWindow.totalSection.totalField.setValue(receipt.total);
	
	
	var saveButton = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.SAVE
	});
	
	saveButton.addEventListener('click', function(){
		var navActInd = Ti.UI.createActivityIndicator({
			style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
		});
		win.setRightNavButton(navActInd);
		navActInd.show();
		
		receipt.name = ReceiptWindow.nameSection.nameField.getValue();
		receipt.total = ReceiptWindow.totalSection.totalField.getValue();
		
		
		var ReceiptService = require('dal/receipts');
		ReceiptService.updateReceipt(receipt);
		args.parent.receipt = receipt;
		win.close();
		
	});
	win.rightNavButton = saveButton;
	
	
	
	return win;
}

function CreateWindow(){
	var ReceiptWindow = new ApplicationWindow();
	var win = ReceiptWindow.win;
	
	var createButton = Ti.UI.createButton({
		title: "Create"
	});
	
	createButton.addEventListener('click', function(){
		var navActInd = Ti.UI.createActivityIndicator({
			style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
		});
		win.setRightNavButton(navActInd);
		navActInd.show();
	
		var Receipt = require('entities/receipt');
			
		var receipt = {
			name: ReceiptWindow.nameSection.nameField.value,
			total: ReceiptWindow.totalSection.totalField.value,
			category: ReceiptWindow.categorySection.categoryPicker.getSelectedRow(0).id,
			date: new Date(ReceiptWindow.dateSection.datePicker.getValue()),
			person: ReceiptWindow.personSection.getSelectedPerson(),
			venue: ReceiptWindow.locationSection.venue
		};
		
		if ( ReceiptWindow.photoSection.image ){
			var imageModule = require('dal/images');
			var ImageStorageService = new imageModule();
			
			receipt.image = ImageStorageService.saveBlob( ReceiptWindow.photoSection.image );
			
		}
		
		
		require('dal/receipts').createReceipt(receipt);
		win.close();
	});
	
	win.rightNavButton = createButton;

	
	
	return win;
};






module.exports = {
	create: CreateWindow,
	edit: EditWindow
};