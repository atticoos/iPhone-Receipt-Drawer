var win,
	cameraComplete = false;

function fireUpCamera(){
	
		Titanium.Media.showCamera({
			success: function(event){
				cameraComplete = true;
				var cropRect = event.cropRect;
				var image = event.media;
				self.close();
				return;
				
				var CreateWindow = require('ui/CreateReceiptWindow');
				var createWin = new CreateWindow(event);
				win.containingTab.open(createWin);
			},
			cancel: function(){
				self.close();
			},
			error: function(){
				cameraComplete = true;
				self.close();
			},
			saveToPhotoGallery: true,
			allowEditing: false,
			mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
			
		});
}

function CameraWindow(onSuccess, onClose){
	var self = this;
	this.win = Ti.UI.createWindow({
		title: 'Camera'
	});
	this.win.addEventListener('open', function(){
	
		Titanium.Media.showCamera({
			success: onSuccess,
			cancel: onClose,
			error: onClose,
			saveToPhotoGallery: true,
			allowEditing: false,
			mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
			
		});
	});
	
	
	this.open = function(){
		this.win.open({
			modal: true,
			modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
			modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN
		});
	}
	
	this.close = function(){
		this.win.close();
	}
	
	
	return self;
}

module.exports = CameraWindow;