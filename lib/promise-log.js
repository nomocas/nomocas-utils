/**
 * Promise API extension with .log and .logError. Usefull for debuging.
 * @return {[type]} [description]
 */
/* global Promise */

/* eslint no-console:0 */

var debug = require('debug');

var api = {

	/**
	 * use debug.js to log something.
	 * @param {String} channel the name of the debug.js channel to use when logging
	 * @return {Promise} a Promise that will receive the value (or the error)
	 */
	debug: function(channel) {
		var args = [].slice.call(arguments, 1);
		return this.then(function(s) {
			args.push(s);
			debug(channel).apply(null, args);
			return s;
		}, function(e) {
			args.push(e, e.stack);
			debug(channel).apply(null, args);
			throw e;
		});
	},

	/**
	 * log both success or error and forward value (or throw error) after any argument provided to log(...)
	 * @return {Promise} a Promise that will receive the value (or the error)
	 */
	log: function() {
		var args = [].slice.call(arguments);
		return this.then(function(s) {
			args.push(s);
			console.log.apply(console, args);
			return s;
		}, function(e) {
			args.push(e);
			console.error.apply(console, args);
			throw e;
		});
	},

	/**
	 * log only error after any argument provided to logError
	 * @return {Promise} a promise that will be rejected
	 */
	logError: function() {
		var args = [].slice.call(arguments);
		return this.catch(function(e) {
			args.push(e);
			console.error.apply(console, args);
			throw e;
		});
	},

	/**
	 * log only success after any argument provided to logSuccess
	 * @return {Promise} a promise that will be resolved with forwarded value
	 */
	logSuccess: function() {
		var args = [].slice.call(arguments);
		return this.then(function(s) {
			args.push(s);
			console.log.apply(console, args);
			return s;
		});
	},

	/**
	 * return a promise that will be resolved with delay
	 * @param  {number} delay the delay to apply in ms
	 * @return {Promise} a promise that will be resolved with forwarded value
	 */
	delay: function(delay) {
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
	for (var i in api)
		Promise.prototype[i] = api[i]; // eslint-disable-line

	Promise.resolveWithDelay = function(value, ms) {
		return new Promise(function(resolve) { setTimeout(function() { resolve(value); }, ms); });
	};

	Promise.rejectWithDelay = function(reason, ms) {
		return new Promise(function(resolve, reject) { setTimeout(function() { reject(reason); }, ms); });
	};
};

