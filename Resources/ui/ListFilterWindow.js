function ListReceiptsFilterWindow(){
	var win = Ti.UI.createWindow({
		backgroundColor: "#eee",
		title: "Filters"
	});
	
	var tableView = Ti.UI.createTableView({
		top:100
	});
	

	var categories = ['Food', 'Groceries', 'Rent', 'Utilities', 'Other'];
	
	var rows = [];
	for (var i=0; i<categories.length; i++){
		var row = Ti.UI.createTableViewRow({
			id: categories[i],
			height:50,
		});
		if (i==0){
			row.header = "Categories";
		}
		
		var view = Ti.UI.createView({
			left:10, right: 10, top:0, bottom:0
		});
		
		var title = Ti.UI.createLabel({
			left:0, text:categories[i], height:20, color:"#000"
		});
		
		var toggle = Ti.UI.createSwitch({
			value: true,
			right:0
		});
		
		view.add(title);
		view.add(toggle);
		row.add(view);
		rows.push(row);
		
	}
	
	
	tableView.setData(rows);
	win.add(tableView);
	
	
	
	return win;
	
};

module.exports = ListReceiptsFilterWindow;