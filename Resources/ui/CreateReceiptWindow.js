function ApplicationWindow( image ){
	var win = Ti.UI.createWindow({
		title: L('createReceipt'),
		backgroundColor: 'white'
	});
	
	var view = Ti.UI.createScrollView({
		top:0,
		contentWidth: 'auto',
		contentHeight: 'auto'
	});
	
	
	/** NAME SECTION **/
	var nameView = Titanium.UI.createView({
		backgroundColor: "#BBB",
		borderRadius: 5,
		left:10, right: 10,
		height: 100,
		top: 10
		
	});
	var nameLabel = Titanium.UI.createLabel({
		color:"#000",
		left:10, right: 10, top:10,
		height: 20,
		text: "Name"
		
	});
	var nameField = Titanium.UI.createTextField({
		color:'#336699',
		height:35,
		top: 40,
		left:10, right:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	nameView.add(nameLabel);
	nameView.add(nameField);
	view.add(nameView);
	
	
	/** TOTAL SECTION **/
	var totalView = Titanium.UI.createView({
		backgroundColor: "#BBB",
		borderRadius: 5,
		left: 10, right: 10,
		height: 100,
		top: 130
	});
	var totalLabel = Titanium.UI.createLabel({
		color: '#000',
		left: 10, right: 10, top:10,
		height: 20,
		text: "Total"
	});
	var totalField = Titanium.UI.createTextField({
		color: '#336699',
		height: 35,
		top: 40,
		left: 10, right: 10,
		borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	totalView.add(totalLabel);
	totalView.add(totalField);
	view.add(totalView);

	
	/** CATEGORY SECTION **/
	var categoryView = Ti.UI.createView({
		backgroundColor: "#BBB",
		borderRadius: 5,
		left:10, right: 10,
		top: 260,
		height: 220
		
	});
	var categoryLabel = Titanium.UI.createLabel({
		color: '#000',
		height: 20,
		top: 10,
		left:10, right:10,
		text: "Category"
	});
	var categoryPicker = createCategoryPicker({
		top: 40,
		left:10, right: 10,
	});
	categoryView.add(categoryLabel);
	categoryView.add(categoryPicker);
	view.add(categoryView);
	
	
	/** DATE SECTION **/
	var dateView = Ti.UI.createView({
		backgroundColor: "#BBB",
		borderRadius: 5,
		left:10, right:10,
		top: 560,
		height: 220
	});
	var dateLabel = Titanium.UI.createLabel({
		color:'#000',
		height: 20,
		top: 10,
		left:10, right:10,
		text: "Date"
	});
	var datePicker = createDatePicker({
		top: 40,
		left:10, right:10
	});
	dateView.add(dateLabel);
	dateView.add(datePicker);
	view.add(dateView);
	
	
	/** IMAGE SECTION **/
	var imageView = Ti.UI.createView({
		backgroundColor: "#BBB",
		borderRadius: 5,
		left: 10, right: 10,
		top: 800,
		height: 400
	});
	var imageLabel = Titanium.UI.createLabel({
		color:"#000",
		height: 20,
		top: 10, left:10, right: 10,
		text: "Receipt Image"
	});
	imageView.add(imageLabel);
	
	var imageReceiptView = Ti.UI.createImageView({
		left: 10, right: 10,
		height: 280,
		image: image ? image.media : null
	});
	imageView.add(imageReceiptView);
	view.add(imageView);
	
	
	var createButton = Ti.UI.createButton({
		title: "Create"
	});
	
	createButton.addEventListener('click', function(){
		Ti.API.info("SAVING RECEIPT");
		Ti.API.info(imageReceiptView.getImage());
		return;
		var receipt = {
			name: nameField.value,
			total: totalField.value,
			category: categoryPicker.getSelectedRow(0).title,
			date: new Date(categoryPicker.getValue()),
			image: imageReceiptView.getImage()
		}
		require('dal/receipts').createReceipt(receipt);
		win.close();
	});
	
	win.rightNavButton = createButton;
	
	
	win.add(view);
	return win;
};







function createCategoryPicker(position){
	var categories = require('dal/receipts').getCategories(),
		data = [];
	for (var i=0; i<categories.length; i++){
		var categoryItem = Ti.UI.createPickerRow({title: categories[i]});
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


module.exports = ApplicationWindow;
