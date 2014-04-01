var icons = {
	'Groceries': 'https://ss1.4sqi.net/img/categories_v2/shops/food_grocery_64.png',
	'Rent': 'https://ss1.4sqi.net/img/categories_v2/building/home_64.png',
	'Food': 'https://ss1.4sqi.net/img/categories_v2/food/default_64.png',
	'Utilities': 'https://ss1.4sqi.net/img/categories_v2/shops/hardware_64.png',
	'Other': 'https://ss1.4sqi.net/img/categories_v2/shops/default_64.png',
	'All': 'https://ss1.4sqi.net/img/categories_v2/shops/bookstore_64.png'
};

var StepFour = require('ui/CreateReceiptWorkflow/StepFour');

function CategoryView( category ){
	this.category = category;
	this.view = Ti.UI.createView({
		height: 80,
		width: 80, backgroundColor: 'pink', borderRadius: 6
	});
	
	var imageView = Ti.UI.createImageView({
		image: icons[category], category: category,
		height: 64, width: 64,
		top: 1, left: 6
	});
	
	var label = Ti.UI.createLabel({
		text: category,
		color: '#fff', bottom:0, left:0, right:0, textAlign: 'center'
	});
	
	this.view.add(imageView);
	this.view.add(label);
};


function StepThree( args ){
	var win = Ti.UI.createWindow({
		title: "Step Three",
		fullscreen: true,
		backgroundColor:"#eee"
	});
	
	
	var label = Ti.UI.createLabel({
		text: "Category",
		top: 10, left: 10
	});
	
	win.add(label);
	
	
	var categorySection = Ti.UI.createView({
		top: 150, left: 20, right: 20
	});
	win.add(categorySection);
	var width = Ti.Platform.displayCaps.platformWidth - 40;
	
	
	
	var i=1, categorySections = [], category;
	for (category in icons){
		var categoryView = new CategoryView(category);
		var top = i <= 3 ? 0 : 100;
		
		var mod = (i-1) % 3;
		var left = Math.floor((width)/3)  * mod;
		
		categoryView.view.left = left;
		categoryView.view.top = top;
		categorySection.add(categoryView.view);
		categorySections.push(categoryView);
		i++;
	}
	
	for(var i=0; i<categorySections.length; i++){
		(function(section){
			
			section.view.addEventListener('click', function(e){
				categorySelected(section.category);
			});
		})(categorySections[i]);
	}
	
	
	
	function categorySelected( category ){
		args.receipt.category = category;
		var stepFour = new StepFour(args);
		args.containingTab.open(stepFour);
	}
	
	
	
	
	
	return win;
};


module.exports = StepThree;