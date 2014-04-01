function ImageSection( image ){
	var ImageModal = require('ui/misc/ModalImageView');
	this.view = Ti.UI.createView({
		top:0, left:0, right:0, height: 70,
		backgroundColor:"#fff"
	});
	
	var imageView = new ImageModal({
		top:10, left:10, height: 50, width: 50,
		image: image
	});
	
	var textArea = Ti.UI.createTextArea({
		top: 10, left: 70, right: 10, bottom: 10,
		value: "Enter description",
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE
	});
	
	this.view.add(imageView);
	this.view.add(textArea);
	
	this.getNote = function(){
		return textArea.value;
	};
};


function TotalSection(){
	this.view = Ti.UI.createView({
		left:0, right:0, height: 40, 
		backgroundColor:"#fff"
	});
	
	var label = Ti.UI.createLabel({
		left: 10, top: 10, width: 100,
		text: "Total Cost"
	});
	
	var textField = Ti.UI.createTextField({
		right: 10, width: 150, height: 20, color:"#000",
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
		keyboardType: Titanium.UI.KEYBOARD_DECIMAL_PAD
	});
	
	this.view.add(label);
	this.view.add(textField);
	
	this.getTotal = function(){
		return textField.value;
	};
};

function DateSection(){
	this.view = Ti.UI.createPicker({
		type: Ti.UI.PICKER_TYPE_DATE,
		value: new Date(),
		left:0, right: 0
	});
	
	this.getDate = function(){
		this.view.getValue();
	};
}

function StepTwo( args ){
	var win = Ti.UI.createWindow({
		fullscreen: true,
		title: 'Create Receipt',
		backgroundColor:"#eee"
	});
	
	var nextButton = Ti.UI.createButton({
		title:'Next'
	});
	nextButton.addEventListener('click', function(){
		var StepThree = require('ui/CreateReceiptWorkflow/StepThree');
		args.receipt.note = imageSection.getNote();
		args.receipt.total = totalSection.getTotal();
		args.receipt.date = dateSection.getDate();
		
		var stepThree = new StepThree(args);
		args.containingTab.open(stepThree);
	});
	win.rightNavButton = nextButton;
	

	var imageSection = new ImageSection( args.receipt.image );
	win.add(imageSection.view);
	
	var totalSection = new TotalSection();
	win.add(totalSection.view);
	
	var dateSection = new DateSection();
	win.add(dateSection.view);
	
	
	
	var sections = [imageSection, totalSection, dateSection];
	for (var i=1; i<sections.length; i++){
		sections[i].view.top = sections[i-1].view.top + sections[i-1].view.height + 10;
	}
	
	return win;
};

module.exports = StepTwo;