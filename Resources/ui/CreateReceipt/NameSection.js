
function NameSection( offset ){
	this.view = Titanium.UI.createView({
		backgroundColor: "#fff",
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
NameSection.prototype.getOffset = function(){
	return this.view.top + this.view.height;
};


module.exports = NameSection;
