function Category( properties ){
	this.id = properties.id;
	this.name = properties.name;
	
	this.icon = null;
}

Category.prototype.getIcon = function(){
	return false;
};

module.exports = Category;