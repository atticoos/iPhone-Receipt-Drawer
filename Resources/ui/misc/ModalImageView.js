function ModalImageView( imageViewProperties ){
	var imageView = Ti.UI.createImageView( imageViewProperties );
	
	imageView.addEventListener('click', function(){
		var modalWindow = Ti.UI.createWindow({
			backgroundColor:"#eee"
		});
		var modalImageView = Ti.UI.createImageView({
			top:0, left:0, right:0,bottom:10, image: imageView.image
		});
		var modalImageClose = Ti.UI.createButton({
			title: "Close",
			bottom:0, right:10, color:"#000"
		});
		modalWindow.add(modalImageView);
		modalWindow.add(modalImageClose);
		
		modalImageView.addEventListener('pinch', function(e){
			var t = Ti.UI.create2DMatrix().scale(e.scale);
			modalImageView.transform = t;
		});
		
		modalImageClose.addEventListener('click', function(){
			modalWindow.close();
		});
		
		modalWindow.open({modal:true});
		
	});
	
	return imageView;
};



module.exports = ModalImageView;