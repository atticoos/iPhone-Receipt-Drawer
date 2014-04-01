function ReceiptGroupAggregate( group ){
	this.id = group.id;
	this.name = group.name;
	this.total = group.total;
	this.count = group.count;
}

module.exports = ReceiptGroupAggregate;
