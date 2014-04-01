function ReceiptGroup( receipts ){
	this.receipts = receipts;
}

ReceiptGroup.prototype.getTotal = function(){
	var total = 0;
	for (var i=0; i<this.receipts.length; i++){
		total += this.receipts[i].total;
	}
	return total;
};

ReceiptGroup.prototype.getCount = function(){
	return this.receipts.length;
};

module.exports = ReceiptGroup;
