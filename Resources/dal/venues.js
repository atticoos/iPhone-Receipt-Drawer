var DATABASE_NAME = "main";

function install(){
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute("DROP TABLE IF EXISTS venues");
	db.execute("CREATE TABLE IF NOT EXISTS venues (id INTEGER PRIMARY KEY, name TEXT, lat TEXT, lng TEXT, foursquareID TEXT, category TEXT, icon TEXT)");
	db.close();
}

function create( venue ){
	var db = Ti.Database.open(DATABASE_NAME);
	db.execute("INSERT INTO venues (name, lat, lng, foursquareID, category, icon) VALUES (?,?,?,?,?,?) ",
		venue.name,
		venue.location.lat,
		venue.location.lng,
		venue.id,
		venue.categories[0].shortName,
		venue.categories[0].icon);
	var insertID = db.lastInsertRowId;
	db.close();
	return insertID;
}

module.exports = {
	install: install,
	create: create
};