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
		},
		cancel: function(){
			cameraComplete = true;
		},
		error: function(){
			cameraComplete = true;
		},
		saveToPhotoGallery: true,
		allowEditing: false,
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