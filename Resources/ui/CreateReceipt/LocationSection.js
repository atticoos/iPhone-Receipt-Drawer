function MapOverlay( venueSelectCallback ){
	var self = this,
		coords = false,
		venue = false,
		Map = require('ti.map'),
		FoursquareService = require('dal/Foursquare'),
		Foursquare = new FoursquareService();
	
	this.win = Ti.UI.createWindow({
		title: 'Map'
	});
	
	
	var pin = Map.createAnnotation({
		longitude: 0, latitude: 0,
		title: "Receipt",
		pincolor: Map.ANNOTATION_RED,
		draggable: true,
		animate: true,
		zIndex: 5
	});
	
	var searchField = Ti.UI.createTextField({
		height: 20, width: 200, color:"#000", paddingLeft:5,backgroundColor:"#fff",
		font: { fontSize: 13 }
	});
	var flexSpace = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	var search = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.SEARCH
	});
	search.addEventListener('click', function(){
		var lookupLocation = searchField.getValue(),
			xhr = Ti.Network.createHTTPClient();
		
		xhr.onload = function(){
			var response = JSON.parse(this.responseText);
			Ti.API.info("XHR Lookup", response);
			var location = response.results[0].geometry.location;
			updateLocation(location.lat, location.lng, true);
			searchField.blur();
		}
		xhr.open("GET", "http://maps.googleapis.com/maps/api/geocode/json?sensor=true&address=" + lookupLocation);
		xhr.send();
	});
	
	var toolbar = Ti.UI.iOS.createToolbar({
		items: [flexSpace, searchField, search, flexSpace],
		bottom: 215, zIndex: 10, barColor: "#eee"
	});
	
	var venueTableView = Ti.UI.createTableView({
		left:0, right:0,
		bottom:0, height: 220, backgroundColor:"#fff"
	});
	venueTableView.addEventListener('click', function(e){
		var venue = e.rowData.venue;
		pin.rightButton = Ti.UI.iPhone.SystemButton.CONTACT_ADD;
		pin.title = venue.name;
		self.mapView.selectAnnotation(pin);
		self.venue = venue;
		updateLocation(venue.location.lat, venue.location.lng);
	});
	
	this.mapView = Map.createView({
		mapType: Map.NORMAL_TYPE,
		region: {
			latitude: 33.74511, longitude: -84.38993,
			latitudeDelta: 0.01, longitudeDelta: 0.01
		},
		top:0, left:0, right:0, height: 350,
		animate: true,
		regionFit: true,
		userLocation: true,
		zIndex:5,
		annotations: [pin]
	});
	
	this.mapView.addEventListener('click', function(e){
		if (e.clicksource == 'rightButton'){
			venueSelectCallback( self.venue );
			self.win.close();
		}
	});
	
	this.mapView.addEventListener('pinchangedragstate', function(e){
		if (e.newState == 0){
			updateLocation(e.annotation.latitude, e.annotation.longitude, true);
			self.venue = false;
			pin.rightButton = null;
		}
	});
	
	function foursquareCallback( resp ){
		var venues = resp.response.groups[0].items,
			rows = [];
		for (var i=0; i<venues.length; i++){
			var row = Ti.UI.createTableViewRow({
				title: venues[i].name,
				venue: venues[i]
			});
			rows.push(row);
		}
		venueTableView.setData(rows);
	};
	
	function updateLocation(lat, lng, fsqr){
		if (fsqr){
			Foursquare.getVenues(lat, lng, foursquareCallback);
		}
		coords = {
			latitude: lat,
			longitude: lng
		};
		self.mapView.region = {
			latitude: lat,
			longitude: lng,
			latitudeDelta: 0.01, longitudeDelta: 0.01
		};
		pin.latitude = lat;
		pin.longitude = lng;
	};
	
	Ti.Geolocation.purpose = "Receive user location";
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
	Ti.Geolocation.getCurrentPosition(function(e){
		updateLocation(e.coords.latitude, e.coords.longitude, true);
	});
	
	
	var closeButton = Ti.UI.createButton({
		title: 'Cancel',
		top:20,left:10, zIndex: 10, backgroundColor: '#fff',
		width: 80, height: 30, color:'blue', borderRadius: 5
	});
	
	closeButton.addEventListener('click', function(){
		self.win.close();
	});
	
	this.win.add(this.mapView);
	this.win.add(venueTableView);
	this.win.add(closeButton);
	this.win.add(toolbar);
};


function LocationSection ( offset ){
	var Map = require('ti.map'),
		FoursquareService = require('dal/Foursquare'),
		Foursquare = new FoursquareService(),
		self = this,
		coords = {latittude: false, longitude: false};
	this.venue = false;
	
	this.view = Ti.UI.createView({
		backgroundColor: "#fff",
		borderRadius: 0,
		left:10, right:10,
		top: offset + 60,
		height: 300
	});
	
	var locationLabel = Ti.UI.createLabel({
		color: "#000",
		height: 20, top: 10, left:10, right: 10,
		text: "Location"
	});
	
	
	var buttonBar = Titanium.UI.createButtonBar({
		labels: ['Map', 'Address'],
		backgroundColor: 'gray',
		color:'#000',
		top: 10,
		style: Ti.UI.iPhone.SystemButtonStyle.BORDERED,
		height: 30, right: 10
	});
	
	var pin = Map.createAnnotation({
		longitude: 0, latitude: 0,
		title: "Receipt",
		pincolor: Map.ANNOTATION_RED,
		draggable: true,
		animate: true
	});
	
	
	buttonBar.addEventListener('click', function(e){
		if (e.index == 0){
			// map
			var mapOverlay = new MapOverlay( venueSelected );
			mapOverlay.win.open({modal: true });
		} else {
			// address
		}
	});
	
	function venueSelected( venue ){
		Ti.API.info("VENUE SELECTED", venue);
		self.venue = venue;
		pin.title = venue.name;
		pin.latitude = venue.location.lat;
		pin.longitude = venue.location.lng;
		mapView.selectAnnotation(pin);
		
		mapView.region = {
			latitude: venue.location.lat,
			longitude: venue.location.lng,
			latitudeDelta: 0.01, longitudeDelta: 0.01
		};
	}
	
	
	var mapView = Map.createView({
		mapType: Map.NORMAL_TYPE,
		region: {
			latitude: 33.74511, longitude: -84.38993,
			latitudeDelta: 0.01, longitudeDelta: 0.01
		},
		animate: true,
		regionFit: true,
		userLocation: true,
		bottom: 0,
		height: 200,
		annotations: [pin]
	});
	
	
	this.getLocation = function(){
		return coords;
	};

	this.view.add(locationLabel);
	this.view.add(buttonBar);
	this.view.add(mapView);
};

LocationSection.prototype.getOffset = function(){
	return this.view.top + this.view.height;
};

module.exports = LocationSection;
