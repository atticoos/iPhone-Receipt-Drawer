var pickerSectionHeight = 280;
var windowBG = "#eee";
var sectionBG = "#fff";
var ModalImageView = require('ui/misc/ModalImageView');

function getOffset(){
	return this.view.top + this.view.height;
}

function PhotoSection( parent ){
	var self = this;
	this.image = false;
	this.view = Titanium.UI.createView({
		backgroundColor: sectionBG,
		borderRadius: 0,
		left: 10, right: 10, height: 80,
		top: 10
	});
	this.photoLabel = Titanium.UI.createLabel({
		color:"#000",
		left: 10, right: 10, top: 10,
		height: 20,
		text: "Receipt Photo"
	});
	
	this.photoButtonBar = Titanium.UI.createButtonBar({
		labels: ['Camera', 'Gallery'],
		backgroundColor: 'gray',
		color:'gray',
		top: 40,
		style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
		height: 30, left: 40, right: 40
	});
	
	this.imageView = new ModalImageView({
		left: 10, right: 10, height: 200,
		top: 90
	});
	
	this.setImage = function ( image ){
		self.imageView.setImage(image);
		self.image = image;
		self.view.setHeight(300);
		parent.adjustOffsets();
	}
	
	this.photoButtonBar.addEventListener('click', function(e){
		if (e.index == 0){
			Titanium.Media.showCamera({
				success: function(event){
					self.setImage(event.media);
				},
				cancel: function(){},
				error: function(){},
				saveToPhotoGallery: true,
				allowEditing: false,
				mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
				
			});
		} else {
			Titanium.Media.openPhotoGallery({
				success: function(event){
					self.setImage(event.media);
				},
				cancel: function(){},
				error: function(){},
				allowEditing: false,
				mediaType: [Ti.Media.MEDIA_TYPE_PHOTO]
			});
		}
	});
	
	this.view.add(this.photoLabel);
	this.view.add(this.photoButtonBar);
	this.view.add(this.imageView);
}
PhotoSection.prototype.getOffset = getOffset;

function NameSection( offset ){
	this.view = Titanium.UI.createView({
		backgroundColor: sectionBG,
		borderRadius: 0,
		left:10, right: 10,
		height: 100,
		top: offset + 20
		
	});
	this.nameLabel = Titanium.UI.createLabel({
		color:"#000",
		left:10, right: 10, top:10,
		height: 20,
		text: "Name"
		
	});
	this.nameField = Titanium.UI.createTextField({
		color:'#336699',
		height:35,
		top: 40,
		left:10, right:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	this.view.add(this.nameLabel);
	this.view.add(this.nameField);
}
NameSection.prototype.getOffset = getOffset;

function TotalSection( offset ){
	this.view = Titanium.UI.createView({
		backgroundColor: sectionBG,
		borderRadius: 0,
		left: 10, right: 10,
		height: 100,
		top: offset + 20
	});
	this.totalLabel = Titanium.UI.createLabel({
		color: '#000',
		left: 10, right: 10, top:10,
		height: 20,
		text: "Total"
	});
	this.totalField = Titanium.UI.createTextField({
		color: '#336699',
		height: 35,
		top: 40,
		left: 10, right: 10,
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD
	});
	this.view.add(this.totalLabel);
	this.view.add(this.totalField);
}
TotalSection.prototype.getOffset = getOffset;

function CategorySection( offset ){
	this.view = Ti.UI.createView({
		backgroundColor: sectionBG,
		borderRadius: 0,
		left:10, right: 10,
		top: offset + 20,
		height: pickerSectionHeight
		
	});
	this.categoryLabel = Titanium.UI.createLabel({
		color: '#000',
		height: 20,
		top: 10,
		left:10, right:10,
		text: "Category"
	});
	this.categoryPicker = createCategoryPicker({
		backgroundColor: "#BBB",
		top: 40,
		left:10, right: 10,
	});
	this.view.add(this.categoryLabel);
	this.view.add(this.categoryPicker);
}
CategorySection.prototype.getOffset = getOffset;

function DateSection( offset ){
	
	this.view = Ti.UI.createView({
		backgroundColor: sectionBG,
		borderRadius: 0,
		left:10, right:10,
		top: offset + 20,
		height: pickerSectionHeight
	});
	this.dateLabel = Titanium.UI.createLabel({
		color:'#000',
		height: 20,
		top: 10,
		left:10, right:10,
		text: "Date"
	});
	this.datePicker = createDatePicker({
		top: 40,
		left:10, right:10
	});
	this.view.add(this.dateLabel);
	this.view.add(this.datePicker);
}
DateSection.prototype.getOffset = getOffset;

function PersonSection ( offset ){
	this.view = Ti.UI.createView({
		backgroundColor:sectionBG,
		borderRadius: 0, 
		left: 10, right: 10,
		top: offset + 20,
		height: 150
	});
	
	this.label = Ti.UI.createLabel({
		text: "Who paid?",
		color:'#000',
		height: 20,
		top: 10, left: 10, right: 10,
		zIndex: 5
	});
	
	
	var optionView = Ti.UI.createView({
		top: 40,
		left: 80,
		right:80,
		height: 50
	});
	
	var optionA = Ti.UI.createView({
		left: 0,
		top:0, height:50,
		width: 50,
		backgroundColor:'pink',
		borderWidth:3,
		borderColor:'pink'
	});
	var optionALabel = Ti.UI.createLabel({
		text: "G", top:5, color:"#fff", left:0, right:0,
		textAlign:'center',
		font: {fontSize: 32, fontWeight:"bold"}
	});
	
	optionA.add(optionALabel);
	optionView.add(optionA);
	
	
	var optionB = Ti.UI.createView({
		right: 0,
		top:0, height:50,
		width: 50,
		backgroundColor:'blue',
		borderWidth: 3,
		borderColor: 'blue'
	});
	var optionBLabel = Ti.UI.createLabel({
		text: "B", top:5, color:"#fff", left:0, right:0,
		textAlign:'center',
		font: {fontSize: 32, fontWeight:"bold"}
	});
	
	optionB.add(optionBLabel);
	optionView.add(optionB);
	
	this.view.add(optionView);

		
	this.getSelectedPerson = function(){
		return "A";
	};
	
	optionA.addEventListener('click', function(){
		optionA.borderColor="#eee";
		optionA.borderWidth=3
		optionB.borderColor=optionB.backgroundColor;
	});
	optionB.addEventListener('click', function(){
		optionB.borderColor="#eee";
		optionB.borderWidth=3
		optionA.borderColor = optionA.backgroundColor;
	});
	
	
	/*

	var pickerOptions = [
		Ti.UI.createPickerRow({title: 'Gabrielle'}),
		Ti.UI.createPickerRow({title: "Atticus"})
	];
	this.picker =  Ti.UI.createPicker({
		top: -20,
		left: 10,
		right: 10,
		height: 40,
		zIndex: 2
	});
	this.picker.selectionIndicator=true;
	
	this.picker.add(pickerOptions);
	this.picker.setSelectedRow(0, 2, true);
	this.view.add(this.picker);
	*/
		
	this.view.add(this.label);
}

function ApplicationWindow( ){
	var self = this;
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
			person: "A" //ReceiptWindow.personSection.picker.getSelectedRow(0).title
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
}





function createCategoryPicker(position){
	var categories = require('dal/categories').getCategories(),
		data = [];
	for (var i=0; i<categories.length; i++){
		var categoryItem = Ti.UI.createPickerRow({title: categories[i].name, id:categories[i].id});
		data.push(categoryItem);
	}
	var picker = Ti.UI.createPicker({
		top: position.top,
		left: position.left,
		right: position.right
	});
	picker.selectionIndicator=true;
	picker.setSelectedRow(0, 2, true);
	picker.add(data);
	return picker;
}

function createDatePicker(position){
	var picker = Ti.UI.createPicker({
		type: Ti.UI.PICKER_TYPE_DATE,
		value: new Date(),
		top: position.top,
		left: position.left,
		right: position.right
	});
	
	return picker;
}


module.exports = {
	create: CreateWindow,
	edit: EditWindow
}
