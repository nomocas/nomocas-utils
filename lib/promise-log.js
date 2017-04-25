/**
 * Promise API extension with .log and .logError. Usefull for debuging.
 * @return {[type]} [description]
 */


var api = {
	log: function() {
		var args = [].slice.call(arguments);
		return this.then(function(s) {
			console.log('success : ', args.join(' '), s);
			return s;
		}, function(e) {
			console.error(args.join(' '), e.stack);
			throw e;
		});
	},
	logError: function() {
		var args = [].slice.call(arguments);
		return this.catch(function(e) {
			console.error(args.join(' '), e.stack);
			throw e;
		});
	},
	logSuccess: function() {
		var args = [].slice.call(arguments);
		return this.then(function(s) {
			console.log('success : ', args.join(' '), s);
			return s;
		});
	},
	delay: function(delay) {
		var self = this,
			constructor = this.constructor;
		return this.then(function(s) {
			return new Promise(function(resolve) {
				setTimeout(function() {
					resolve(s);
				}, delay);
			});
		});
	}
};

module.exports = function(Promise) {
	for (const i in api)
		Promise.prototype[i] = api[i];

	Promise.resolveWithDelay = function(value, ms) {
		return new Promise((resolve) => setTimeout(() => resolve(value), ms));
	};
	Promise.rejectWithDelay = function(reason, ms) {
		return new Promise((resolve, reject) => setTimeout(() => reject(reason), ms));
	};
};

