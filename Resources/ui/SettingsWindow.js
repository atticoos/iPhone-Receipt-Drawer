function SettingsWindow(){
	var self = this;
	var win = Ti.UI.createWindow({
		title: 'Settings',
		backgroundColor:"#eee"
	});
	
	var tableView = Ti.UI.createTableView({
		
	});
	
	var rows = [{
		title: "Categories",
		hasChild: true,
		module: 'ui/settings/CategoriesWindow'
	}, {
		title: "People",
		hasChild: true,
		module: 'ui/settings/PeopleWindow'
	}];
	
	tableView.setData(rows);
	win.add(tableView);
	
	tableView.addEventListener('click', function(e){
		var settingsWindowModule = require(e.rowData.module),
			settingsWin = new settingsWindowModule({
				containingTab: win.containingTab,
				tabGroup: win.tabGroup
			});
		win.containingTab.open(settingsWin);
	});
	
	return win;
}

module.exports = SettingsWindow;