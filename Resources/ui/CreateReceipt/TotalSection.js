function TotalSection( offset ){
	this.view = Titanium.UI.createView({
		backgroundColor: "#fff",
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
TotalSection.prototype.getOffset = function(){
	return this.view.top + this.view.height;
};

module.exports = TotalSection;