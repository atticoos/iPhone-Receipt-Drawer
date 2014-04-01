function CategorySection( offset ){
	this.view = Ti.UI.createView({
		backgroundColor: "#fff",
		borderRadius: 0,
		left:10, right: 10,
		top: offset + 20,
		height: 280
		
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


CategorySection.prototype.getOffset = function(){
	return this.view.top + this.view.height;
};

module.exports = CategorySection;