function Foursquare(){
	this.clientID = "1IIGESF1SF2GCO0CZQLMDHL2ZQ31OY1UN4LEIUHH5T1CQPVE";
	this.clientSecret = "ZGOXBJ1WFQCBOFSIWQRVTZXUFTAVV0A14C053CCHONV2UJ1Z";
	this.url = "https://api.foursquare.com/v2/";
	
	
};


Foursquare.prototype.searchBounds = function(sw, ne, search, callback){
	var params = {
		sw: sw.latitude + "," + sw.longitude,
		ne: ne.latitude + "," + ne.longitude,
		query: search,
		intent: 'browse'
	};
	return this.makeRequest('venues/search', params, callback);
}

Foursquare.prototype.getVenuePhotos = function( venueID, callback ){
	//https://api.foursquare.com/v2/venues/VENUE_ID/photos
	return this.makeRequest('venues/' + venueID + '/photos', {}, callback);
}

Foursquare.prototype.searchVenues = function(lat, lng, search, callback){
	var params = {ll: lat + "," + lng, query: search};
	return this.makeRequest("venues/search", params, callback);
};

Foursquare.prototype.getVenues = function(lat, lng, callback){
	var ll = {ll: lat + "," + lng};
	return this.makeRequest("venues/search", ll, callback);
};


Foursquare.prototype.makeRequest = function(endpoint, params, callback){
	var url = this.url + endpoint,
		date = new Date();
	
	url += "?client_id=" + this.clientID;
	url += "&client_secret=" + this.clientSecret; 
	url += "&v=" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();

	for (var key in params){
		url += "&" + key + "=" + params[key];
	}
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.onerror = function(e){
		Ti.API.info("XHR ERROR", e);
		alert(e.error);
		callback( false );
	};
	
	xhr.onload = function(e){
		var resp = eval('(' + this.responseText + ')');
		callback( resp );	
	};
	Ti.API.info("Creating foursquare request", url);
	xhr.open("GET", url);
	xhr.send();
};

module.exports = Foursquare;