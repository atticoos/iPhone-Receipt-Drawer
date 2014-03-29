function CategoriesWindow( args ){
	var win = Ti.UI.createWindow({
		title: 'Categories',
		backgroundColor: "#eee"
	});
	var CategoryService = require('dal/categories');
	
	var tableView = Ti.UI.createTableView({
		editable: true
	});
	win.add(tableView);



	
	var addButton = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ADD	
	});
		
	addButton.addEventListener('click', function(){
		var dialog = Ti.UI.createAlertDialog({
		    title: 'Create new category',
		    style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
		    buttonNames: ['Create', 'cancel']
		});
		dialog.addEventListener('click', function(e){
			if (e.index == 0){
				CategoryService.createCategory( e.text );
				loadCategories();
			}
			Ti.API.info("CLICK", JSON.stringify(e));
		});
		dialog.show();
	});
	win.rightNavButton = addButton;
	
	tableView.addEventListener('delete', function( e ){
		CategoryService.deleteCategory ( e.rowData.category.id );
	});
	
	
	function loadCategories(){
		var rows = [];
		var categories = CategoryService.getCategories();
		for (var i=0; i<categories.length; i++){
			rows.push({title: categories[i].name, category: categories[i]});
		}
		tableView.setData(rows);
	};
	loadCategories();

	return win;
}

module.exports = CategoriesWindow;