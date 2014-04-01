function ReceiptGroups( groups ){
	this.groups = groups;
}

ReceiptGroups.prototype.getAll = function(){
	var ReceiptGroupAggregate = require('entities/ReceiptGroupAggregate');
	var group = new ReceiptGroupAggregate({
		total: 0,
		count: 0,
		name: 'All',
		id: false
	});
	for (var i=0; i<this.groups.length; i++){
		group.total += this.groups[i].total;
		group.count += this.groups[i].count;
	}
	
	return group;
};


module.exports = ReceiptGroups;
