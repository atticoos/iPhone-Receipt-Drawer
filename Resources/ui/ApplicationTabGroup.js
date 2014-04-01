function ApplicationTabGroup() {
	
	/*
	var VenueService = require('dal/venues');
	var ReceiptService = require('dal/receipts');
	var CategoryService = require('dal/categories');
	VenueService.install();
	ReceiptService.install();
	CategoryService.install();
	*/
	
	//create module instance
	var self = Ti.UI.createTabGroup(),
		ListWindow = require('ui/ListReceiptGroupsWindow'),
		DevWindow = require('ui/DevWindow'),
		SettingsWindow = require('ui/SettingsWindow');
		
	//create app tabs
	var win1 = new ListWindow(),
		win2 = new DevWindow(),
		win3 = new SettingsWindow();
		//win3 = new CameraWindow();
		
		
	var tab1 = Ti.UI.createTab({
		title: L('receipts'),
		icon: '/images/KS_nav_ui.png',
		window: win1
	});
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: 'Dev tools',
		icon: '/images/KS_nav_ui.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: 'Settings',
		icon: 'images/KS_nav_views.png',
		window: win3
	});
	win3.containingTab = tab3;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	
	
	return self;
};

module.exports = ApplicationTabGroup;
