
function PersonSection ( offset ){
	var selectedPerson = "A";
	this.view = Ti.UI.createView({
		backgroundColor:"#fff",
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
		text: "A", top:5, color:"#fff", left:0, right:0,
		textAlign:'center',
		font: {fontSize: 32, fontWeight:"bold"}
	});
	
	optionB.add(optionBLabel);
	optionView.add(optionB);
	
	this.view.add(optionView);

		
	this.getSelectedPerson = function(){
		return selectedPerson;
	};
	
	optionA.addEventListener('click', function(){
		optionA.borderColor="#eee";
		optionA.borderWidth=3;
		optionB.borderColor=optionB.backgroundColor;
		selectedPerson = "G";
	});
	optionB.addEventListener('click', function(){
		optionB.borderColor="#eee";
		optionB.borderWidth=3;
		optionA.borderColor = optionA.backgroundColor;
		selectedPerson = "A";
	});
	
	
		
	this.view.add(this.label);
}
PersonSection.prototype.getOffset = function(){
	return this.view.top + this.view.height;
};



module.exports = PersonSection;