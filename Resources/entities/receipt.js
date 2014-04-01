var Category = require('entities/category'),
	Venue = require('entities/venue');
	
function Receipt(properties){
	this.id = properties.id;
	this.name = properties.name;
	this.category = new Category( properties.category );
	this.venue = new Venue( properties.venue );
	this.date = new Date(properties.date);
	this.total = properties.total;	
	this.image = properties.image;
	this.person = properties.person;
}

Receipt.prototype.getImage = function(){
	var path = Ti.Filesystem.applicationDataDirectory  + this.image;
	return path;
};

Receipt.prototype.getDateString = function(){
	var d = new Date();
	return (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
	//return this.date.toLocaleDateString();
};

Receipt.prototype.getPersonLetter = function(){
	return this.person.length > 0 ? this.person.charAt(0) : "?";
};


module.exports = Receipt;