function ErrorWithStatus(status, message) {
	Error.call(this, message);
	this.status = status;
	this.message = message;
}
ErrorWithStatus.prototype = new Error();
ErrorWithStatus.prototype.toString = function() {
	return this.status + ' - ' + this.message;
};
module.exports = ErrorWithStatus;