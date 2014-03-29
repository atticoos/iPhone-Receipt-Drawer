var Category = require('entities/category');
function Receipt(properties){
	this.id = properties.id;
	this.name = properties.name;
	this.category = new Category( properties.category );
	this.date = new Date(properties.date);
	this.total = properties.total;	
	this.image = properties.image;
	this.person = properties.person;
}

Receipt.prototype.getImage = function(){
	var path = Ti.Filesystem.applicationDataDirectory  + this.image;
	return path;
}

Receipt.prototype.getDateString = function(){
	var d = new Date();
	return (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
	//return this.date.toLocaleDateString();
}



module.exports = Receipt;

/*

	Titanium.Media.showCamera({
	
		success:function(event)
		{
			var cropRect = event.cropRect;
			var image = event.media;
			var filename = Titanium.Filesystem.applicationDataDirectory + "/"+ 'camera_photo' + new Date().getTime() + ".png";
			var f = Titanium.Filesystem.getFile(filename);
			if (f.exists()) {
				Ti.API.info('The file exist , trying to delete it before using it :' + f.deleteFile());
				f = Titanium.Filesystem.getFile(filename);
			}
			f.write(image);
			win.backgroundImage = f.nativePath;
		},
		cancel:function()
		{
	
		},
		error:function(error)
		{
			// create alert
			var a = Titanium.UI.createAlertDialog({title:'Camera'});
	
			// set message
			if (error.code == Titanium.Media.NO_CAMERA)
			{
				a.setMessage('Device does not have video recording capabilities');
			}
			else
			{
				a.setMessage('Unexpected error: ' + error.code);
			}
	
			// show alert
			a.show();
		},
		allowEditing:true
	});


*/