var win,
	cameraComplete = false;

function fireUpCamera(){
	Titanium.Media.showCamera({
		success: function(event){
			cameraComplete = true;
			var cropRect = event.cropRect;
			var image = event.media;
			
			var CreateWindow = require('ui/CreateReceiptWindow');
			var createWin = new CreateWindow(event);
			win.containingTab.open(createWin);
			
			
			
			/*
			var imageView = Ti.UI.createImageView({
					width: win.width,
					height: win.height,
					image: event.media
			});
			
			win.add(imageView);
			*/
		},
		cancel: function(){
			cameraComplete = true;
		},
		error: function(){
			cameraComplete = true;
		},
		saveToPhotoGallery: true,
		allowEditing: true,
		mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
		
	});
}

function CameraWindow(){
	win = Ti.UI.createWindow({
		title: 'Camera'
	});
	win.addEventListener('focus', function(){
		if (!cameraComplete){
			fireUpCamera();
		} else {
			cameraComplete = false;
		}
	});

	return win;
}

module.exports = CameraWindow;