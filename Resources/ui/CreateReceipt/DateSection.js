function DateSection( offset ){
	
	this.view = Ti.UI.createView({
		backgroundColor: "#fff",
		borderRadius: 0,
		left:10, right:10,
		top: offset + 20,
		height: 280
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
};
DateSection.prototype.getOffset = function(){
	return this.view.top + this.view.height;
};

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



module.exports = DateSection;