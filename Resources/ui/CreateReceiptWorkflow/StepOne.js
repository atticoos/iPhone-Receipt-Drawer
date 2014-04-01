function StepOne(){
	var imageTaken = false;
	var win = Ti.UI.createWindow({
		fullscreen: true,
		title: "Create Receipt"
	});
	
	var imageView = Ti.UI.createImageView({
		top:0,left:0, right:0, bottom:0
	});
	
	function showCamera(){
		Titanium.Media.openPhotoGallery({
			success: function(event){
				imageView.image = event.media;
				imageTaken = true;
			},
			error: function(){
				win.tabGroup.setActiveTab(win.tabGroup.tabs[0]);
			
			},
			cancel: function(){
				win.tabGroup.setActiveTab(win.tabGroup.tabs[0]);
			}
		});
	};
	win.addEventListener('focus', function(){
		if (!imageTaken){
			showCamera();	
		}
	});
	
	var nextButton = Ti.UI.createButton({
		title: 'Next'
	});
	nextButton.addEventListener('click', function(){
		var StepTwo = require('ui/CreateReceiptWorkflow/StepTwo');
		var args = {
			receipt: {
				image: imageView.image
			},
			containingTab: win.containingTab,
			tabGroup: win.tabGroup
		};
		
		var stepTwo = new StepTwo(args);
		
		win.containingTab.open(stepTwo);
	});
	win.rightNavButton = nextButton;
	win.add(imageView);
	
	/*
	
	Titanium.Media.showCamera({
		success: function(event){
			
		},
		cancel: function(){},
		error: function(){},
		overlay: overlay
	});
	
	*/
		
	return win;
	
};

module.exports = StepOne;