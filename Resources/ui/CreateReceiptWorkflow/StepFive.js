function TitleSection( receipt ){
	this.view = Ti.UI.createView({
		backgroundColor:"#fff",
		top:0, left:0, right:0, height: 60
	});
	
	var imageView = Ti.UI.createImageView({
		image: receipt.image,
		left: 10, top: 10, height: 40, width: 40
	});
	var label = Ti.UI.createLabel({
		text: receipt.note,
		left: 60, top: 10, right: 10, bottom: 10,
		color:"#000"
	});
	
	this.view.add(imageView);
	this.view.add(label);
	
};

function TotalSection( receipt ){
	this.view = Ti.UI.createView({
		backgroundColor:"#fff",
		height: 40, left:0,right:0
	});
	
	var label = Ti.UI.createLabel({
		left: 10, top: 10, text: "Total",
		color:"#000"
	});
	
	var total = Ti.UI.createLabel({
		right: 10, top: 10, text: "$" + receipt.total,
		color:"#000"
	});
	
	this.view.add(label);
	this.view.add(total);
};

function DateSection( receipt ){
	this.view = Ti.UI.createView({
		backgroundColor:"#fff",
		height: 40, left:0, right: 0
	});
	var label = Ti.UI.createLabel({
		left: 10, top: 10, text: "Date",
		color:"#000"
	});
	
	var date = Ti.UI.createLabel({
		right: 10, top: 10, text: "April 1, 2014",
		color:"#000"
	});
	
	this.view.add(label);
	this.view.add(date);
}

function CategorySection( receipt ){
	this.view = Ti.UI.createView({
		backgroundColor:"#fff",
		height: 40, left: 0, right: 0
	});
	var icons = {
		'Groceries': 'https://ss1.4sqi.net/img/categories_v2/shops/food_grocery_64.png',
		'Rent': 'https://ss1.4sqi.net/img/categories_v2/building/home_64.png',
		'Food': 'https://ss1.4sqi.net/img/categories_v2/food/default_64.png',
		'Utilities': 'https://ss1.4sqi.net/img/categories_v2/shops/hardware_64.png',
		'Other': 'https://ss1.4sqi.net/img/categories_v2/shops/default_64.png',
		'All': 'https://ss1.4sqi.net/img/categories_v2/shops/bookstore_64.png'
	};
	
	Ti.API.info("Category image", icons[receipt.category]);

	var imageViewContainer = Ti.UI.createView({
		height: 40, width: 40, top:0,left:0,
		backgroundColor:'pink'
	});

	var imageView = Ti.UI.createImageView({
		image: icons[receipt.category],
		height: 40, width: 40, top:0, left:0
	});
	
	var category = Ti.UI.createLabel({
		text: receipt.category,
		right: 10, top: 10, color:"#000"
	});
	
	imageViewContainer.add(imageView);
	this.view.add(imageViewContainer);
	this.view.add(category);
};

function PersonSection( receipt ){
	this.view = Ti.UI.createView({
		backgroundColor:"#fff",
		height: 40, left: 0, right: 0
	});
	
	var letterContainer = Ti.UI.createView({
		left: 0, top: 0,
		height: 40, width: 40,
		backgroundColor:'pink'
	});
	
	var letter = Ti.UI.createLabel({
		text: "G", color:"#fff",
		top: 1, left:0, right: 0, textAlign: 'center',
		font: { fontSize: 24}
	});
	
	var name = Ti.UI.createLabel({
		text: "Gabrielle",
		top: 10, right: 10, color:"#000"
	});
	
	letterContainer.add(letter);
	
	this.view.add(letterContainer);
	this.view.add(name);
}

function VenueSection( receipt ){
	this.view = Ti.UI.createView({
		backgroundColor: "#fff",
		height: 40, left: 0, right: 0
	});
	
	var title = Ti.UI.createLabel({
		text: "Location",
		left: 10, top: 10, color:"#000"
	});
	
	var venueLabel = Ti.UI.createLabel({
		text: receipt.venue ? receipt.venue.name : "No location",
		right: 10, top: 10, color:"#000"
	});
	
	if (receipt.venue){
		this.view.height = 180;
		var Map = require('ti.map');
		
		var pin = Map.createAnnotation({
			latitude: receipt.venue.location.lat,
			longitude: receipt.venue.location.lng,
			animate: true
		});
		
		var mapView = Map.createView({
			top: 40,
			mapType: Map.NORMAL_TYPE,
			region: {
				latitude: receipt.venue.location.lat,
				longitude: receipt.venue.location.lng,
				latitudeDelta: 0.007,
				longitudeDelta: 0.007
			},
			animate: true,
			userLocation: false,
			regionFit: true,
			annotations: [pin]
		});
		this.view.add(mapView);
		
	}
	
	this.view.add(title);
	this.view.add(venueLabel);
}

function StepFive( args ){
	var receipt = args.receipt,
		OverlayActivityInd = require('ui/misc/OverlayActivityInd');
	var win = Ti.UI.createWindow({
		title: 'Step Five',
		fullScreen: true,
		backgroundColor:"#eee"
	});
	Ti.API.info("RECEIPT", receipt);
	
	var titleSection = new TitleSection( receipt );
	win.add(titleSection.view);
	
	var totalSection = new TotalSection( receipt );
	win.add(totalSection.view);
	
	var dateSection = new DateSection( receipt );
	win.add(dateSection.view);
	
	var categorySection = new CategorySection( receipt );
	win.add(categorySection.view);
	
	var personSection = new PersonSection( receipt );
	win.add(personSection.view);
	
	var venueSection = new VenueSection( receipt );
	win.add(venueSection.view);
	
	var sections = [titleSection, totalSection, dateSection, categorySection, personSection, venueSection];
	for (var i=1; i<sections.length; i++){
		sections[i].view.top = sections[i-1].view.top + sections[i-1].view.height + 10;
	}
	
	var createButton = Ti.UI.createButton({
		title: "Create", textAlign: 'center', color:"#fff",
		backgroundColor:"#007aff", bottom: 0, left:0, right:0, height: 30
	});
	createButton.addEventListener('click', function(){
		var overlayInd = new OverlayActivityInd();
		win.add(overlayInd);
		
		setTimeout(function(){
			win.remove(overlayInd);
			win.titlePrompt = "Receipt Created!";
			setTimeout(function(){	
	 			win.tabGroup.setActiveTab(win.tabGroup.tabs[0]);				
			}, 1000);

		},2000);
	});
	win.add(createButton);
	
	win.fullscreen = true;
	
	return win;
};

module.exports = StepFive;