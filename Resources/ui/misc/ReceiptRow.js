function ReceiptRow( receipt ){
	
	var row = Ti.UI.createTableViewRow({
		id: receipt.id,
		receipt: receipt,
		left:0, right:0,
		height: 58
	});


	var rowView = Ti.UI.createView({
		left: 65, right: 10, top:5, bottom:5,
		backgroundColor:"#fff"
	});
	
	var detailView = Ti.UI.createView({
		left: 5, top:5, bottom:5, right: 5,
	});

	var category = Ti.UI.createLabel({
		text: receipt.name,
		top:5, left:0, 
		font: { fontSize: 16 },
		color:'#000'
	});
	
	var total = Ti.UI.createLabel({
		text: "$" + receipt.total,
		top:0, right:0,
		font: { fontSize: 12 },
		color:"#C0C0C0"
	});
	
	var date = Ti.UI.createLabel({
		text: receipt.getDateString(),
		bottom:0, right: 0,
		font: { fontSize: 12 },
		color:"#C0C0C0"
	});
	
	var personView = Ti.UI.createView({
		top:0,left:0,height:60,width:55,
		backgroundColor:"pink"
	});
	
	var categoryImage = Ti.UI.createImageView({
		image: receipt.venue.icon,
		height: 48, width:48, top: 5, left:10
	});
	
	var personText = Ti.UI.createLabel({
		text: receipt.person.charAt(0), top:5, color:"#fff", left:0, right:0,
		textAlign:'center',
		font: {fontSize: 32, fontWeight:"bold"}
	});
	
	//personView.add(categoryImage);
	
	detailView.add(category);
	detailView.add(total);
	detailView.add(date);
	//rowView.add(detailView);
	//rowView.add(personView);
	//row.add(rowView);
	rowView.add(detailView);
	row.add(rowView);
	row.add(categoryImage);
	
	return row;
}


module.exports = ReceiptRow;