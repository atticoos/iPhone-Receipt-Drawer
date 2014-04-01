var Map = require('ti.map'),
	FoursquareService = require('dal/Foursquare'),
	StepFive = require('ui/CreateReceiptWorkflow/StepFive'),
	currentLocation = false,
	windowArgs = false;


function nextStep( venue ){
	windowArgs.receipt.venue = venue;
	var stepFive = new StepFive ( windowArgs );
	windowArgs.containingTab.open(stepFive);
}

function StepFour( args ){
	windowArgs = args;
	
	var Foursquare = new FoursquareService();
	var win = Ti.UI.createWindow({
		backgroundColor:'#eee',
		title: 'Step Four',
		fullScreen: true,
		backButtonTitle: ''
	});
	
	var searchField = Ti.UI.createTextField({
		color:"#000", width: 180, paddingLeft: 5, paddingRight:5, backgroundColor:"#fff", borderRadius:5,
		borderColor:"#eee",
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
		font: { fontSize: 13}, 
		returnKeyType: Ti.UI.RETURNKEY_SEARCH
	});
	
	var skipButton = Ti.UI.createButton({
		title: 'Skip'
	});
	skipButton.addEventListener('click', function(){
		nextStep( false );
	});
	win.rightNavButton = skipButton;
	win.titleControl = searchField;
	win.fullscreen = true;
	
	var search = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.SEARCH
	});
	
	searchField.addEventListener('return', function(e){
		var region = mapSection.currentRegion;
	
	
		var ne = {
			latitude: region.latitude + (region.latitudeDelta/2),
			longitude: region.longitude + (region.latitudeDelta/2)
		};
		var se = {
			latitude: region.latitude - (region.latitudeDelta/2),
			longitude: region.longitude - (region.longitudeDelta/2)
		};
		
		Foursquare.searchBounds(ne, se, e.value, function(results){
			var venues = results.response.groups[0].items;
			venueSection.generateTableView(venues);
			mapSection.generatePins(venues);
		});
		
	
		//var venueWindow = new VenueWindow(currentRegion.latitude, currentRegion.longitude, e.value);
		//venueWindow.open({modal:true});
	});
	
	
	
	var mapSection = new MapSection();
	win.add(mapSection.mapView);
	
	var venueSection = new VenueSection();
	win.add(venueSection.tableView);
	
	
	
	
	return win;
};

function MapSection(){
	var self = this;
	this.currentRegion = {
		latitude: 33.74511, longitude: -84.38993,
		latitudeDelta: 0.01, longitudeDelta: 0.01
	};
	
	
	this.mapView = Map.createView({
		mapType: Map.NORMAL_TYPE,
		region: this.currentRegion,
		top:0, left:0, right:0, height: 250,
		animate: true,
		regionFit: true,
		userLocation: true
	});
	this.mapView.addEventListener('regionChanged', function(e){
		Ti.API.info("regionChanged", e);
		self.currentRegion = {
			latitude: e.latitude,
			longitude: e.longitude,
			latitudeDelta: e.latitudeDelta,
			longitudeDelta: e.longitudeDelta
		};
	});
	Ti.Geolocation.purpose = "Receive user location";
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
	Ti.Geolocation.getCurrentPosition(function(e){
		Ti.API.info("CURRENT POS", e);
		currentLocation = { latitude: e.coords.latitude, longitude: e.coords.longitude };
		self.mapView.region = {
			latitude: e.coords.latitude,
			longitude: e.coords.longitude,
			latitudeDelta: 0.01, longitudeDelta: 0.01
		};
	});
	
	this.mapView.addEventListener('click', function(e){
		if (e.clicksource == 'rightButton'){
			nextStep( e.annotation.venue );
		}
	});
	
	this.generatePins = function( venues ){
		Ti.API.info("VENUES", venues);
		var pins = [];
		for (var i=0; i<venues.length; i++){
			var pin = Map.createAnnotation({
				latitude: venues[i].location.lat,
				longitude: venues[i].location.lng,
				title: venues[i].name,
				venue: venues[i],
				animate: true,
				rightButton: Ti.UI.iPhone.SystemButton.CONTACT_ADD
			});
			pins.push(pin);
		}
		
		self.mapView.annotations = pins;
	};
	
};


function VenueSection(){
	self = this;
	
	this.tableView = Ti.UI.createTableView({
		top: 250, bottom: 0, left:0, right:0
	});
	
	this.tableView.addEventListener('click', function(e){
		nextStep( e.rowData.venue );
	});
	
	this.generateTableView = function( venues ){
		var rows = [];
		for (var i=0; i<venues.length; i++){
			var row = Ti.UI.createTableViewRow({
				height: 60, venue: venues[i]
			});
		
			var distance = getFriendlyDistance(currentLocation, {latitude: venues[i].location.lat, longitude: venues[i].location.lng});
		
			var titleLabel = Ti.UI.createLabel({
				text: venues[i].name,
				left: 30, top: 10,
				font: { fontSize: 14, fontWeight: 'bold' },
				color:'#000'
			});
			var categoryLabel = Ti.UI.createLabel({
				text: venues[i].categories[0].pluralName + " - " + distance,
				top:30,
				left:30,
				font: { fontSize: 12},
				color:'#000'
			});
			
			row.add(titleLabel);
			row.add(categoryLabel);
		
			
			
			rows.push(row);
		}
		self.tableView.setData(rows);
	};
}

function getFriendlyDistance(coord1, coord2){
	var distance = haversine(coord1, coord2);
	var miles = (distance * 0.621371).toFixed(1);
	
	return miles + " mi";
}

function haversine(coord1, coord2){
	var earthRadius = 6371,
		dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180),
		dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180),
		lat1 = coord1.latitude * (Math.PI / 180),
		lat2 = coord1.latitude * (Math.PI / 180);
		
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
			Math.sin(dLon/2) * Math.sin(dLon/2) *
			Math.cos(lat1) * Math.cos(lat2);

	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var distance = earthRadius * c;
	return Math.abs(distance);
}



module.exports = StepFour;