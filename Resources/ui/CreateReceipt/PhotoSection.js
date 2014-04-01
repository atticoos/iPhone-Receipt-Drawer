function PhotoSection( parent ){
	var self = this,
		ModalImageView = require('ui/misc/ModalImageView');
		
	this.image = false;
	
	this.view = Titanium.UI.createView({
		backgroundColor: "#fff",
		borderRadius: 0,
		left: 10, right: 10, height: 80,
		top: 10
	});
	this.photoLabel = Titanium.UI.createLabel({
		color:"#000",
		left: 10, right: 10, top: 10,
		height: 20,
		text: "Receipt Photo"
	});
	
	this.photoButtonBar = Titanium.UI.createButtonBar({
		labels: ['Camera', 'Gallery'],
		backgroundColor: 'gray',
		color:'gray',
		top: 40,
		style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
		height: 30, left: 40, right: 40
	});
	
	this.imageView = new ModalImageView({
		left: 10, right: 10, height: 200,
		top: 90
	});
	
	this.setImage = function ( image ){
		self.imageView.setImage(image);
		self.image = image;
		self.view.setHeight(300);
		parent.adjustOffsets();
	};
	
	this.photoButtonBar.addEventListener('click', function(e){
		if (e.index == 0){
			Titanium.Media.showCamera({
				success: function(event){
					self.setImage(event.media);
				},
				cancel: function(){},
				error: function(){},
				saveToPhotoGallery: true,
				allowEditing: false,
				mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
				
			});
		} else {
			Titanium.Media.openPhotoGallery({
				success: function(event){
					self.setImage(event.media);
				},
				cancel: function(){},
				error: function(){},
				allowEditing: false,
				mediaType: [Ti.Media.MEDIA_TYPE_PHOTO]
			});
		}
	});
	
	this.view.add(this.photoLabel);
	this.view.add(this.photoButtonBar);
	this.view.add(this.imageView);
}

PhotoSection.prototype.getOffset = function (){
	return this.view.top + this.view.height;
};


module.exports = PhotoSection;