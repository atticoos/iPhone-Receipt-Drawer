function OverlayActivityInd(){
	var view = Ti.UI.createView({
		zIndex: 100,
		opacity: 0.5,
		backgroundColor:"#000",
		top:0, left:0, right: 0, bottom: 0
	});
	
	var actInd = Ti.UI.createActivityIndicator({
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
		top: (view.height/2) - (Ti.UI.SIZE/2),
		left: (view.width/2) - (Ti.UI.SIZE/2)
	});
	
	view.add(actInd);
	actInd.show();
	
	return view;
}

module.exports = OverlayActivityInd;