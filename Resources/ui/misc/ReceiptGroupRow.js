var icons = {
	'Groceries': 'https://ss1.4sqi.net/img/categories_v2/shops/food_grocery_64.png',
	'Rent': 'https://ss1.4sqi.net/img/categories_v2/building/home_64.png',
	'Food': 'https://ss1.4sqi.net/img/categories_v2/food/default_64.png',
	'Utilities': 'https://ss1.4sqi.net/img/categories_v2/shops/hardware_64.png',
	'Other': 'https://ss1.4sqi.net/img/categories_v2/shops/default_64.png',
	'All': 'https://ss1.4sqi.net/img/categories_v2/shops/bookstore_64.png'
}

function ReceiptGroupRow( receiptGroup ){
	
	var row = Ti.UI.createTableViewRow({
		id: receiptGroup.id,
		receipt: receiptGroup,
		left:0, right:0,
		height: 60
	});
	
	var rowView = Ti.UI.createView({
		left: 5, right: 5, top:5, bottom:5,
		backgroundColor:"#fff"
	});
	
	var detailView = Ti.UI.createView({
		left: 60, top:5, bottom:5, right: 10
	});

	var category = Ti.UI.createLabel({
		text: receiptGroup.name,
		top:5, left:0, 
		font: { fontSize: 16 },
		color:'#000'
	});
	
	var total = Ti.UI.createLabel({
		text: "$" + receiptGroup.total,
		top:0, right:0,
		font: { fontSize: 12 },
		color:"#C0C0C0"
	});
	
	var count = Ti.UI.createLabel({
		text: receiptGroup.count,
		bottom:0, right: 0,
		font: { fontSize: 12 },
		color:"#C0C0C0"
	});
	
	var personView = Ti.UI.createView({
		top:0,left:0,height:60,width:55,
		backgroundColor:"pink"
	});
	
	var categoryImage = Ti.UI.createImageView({
		image: icons[receiptGroup.name],
		height: 48, width:48, top: 0, left:4
	});
	
	var personText = Ti.UI.createLabel({
		text: receiptGroup.name.charAt(0), top:5, color:"#fff", left:0, right:0,
		textAlign:'center',
		font: {fontSize: 32, fontWeight:"bold"}
	});
	
	personView.add(categoryImage);
	
	detailView.add(category);
	detailView.add(total);
	detailView.add(count);
	rowView.add(detailView);
	rowView.add(personView);
	row.add(rowView);
	
	return row;
}


module.exports = ReceiptGroupRow;