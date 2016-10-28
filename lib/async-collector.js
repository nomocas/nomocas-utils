/** 
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 * asynchroneous events (aka promise and setTimeout calls) collector.
 * Useful to centralised things to wait for.
 */

var Emitter = require('./emitter');

function AsyncCollector() {
	this._async = {
		count: 0,
		errors: [],
		successes: [],
		fails: [],
		callbacks: []
	};
};

function remove(mgr) {
	mgr._async.count--;
	if (mgr._async.count <= 0)
		trigger(mgr);
}

function trigger(mgr) {
	var async = mgr._async,
		list = async.errors.length ? async.fails : async.successes,
		args = async.errors.length ? async.errors : mgr;
	for (var j = 0; j < list.length; j++)
		list[j](args.length === 1 ? args[0] : args);
	if (mgr.emit)
		mgr.emit('stabilised', mgr);
	async.successes = [];
	async.fails = [];
	async.errors = [];
}

function delayEnd(func, self) {
	if (func) func();
	remove(self);
}

AsyncCollector.prototype = new Emitter();

var proto = {
	/**
	 * waiting a promise. 
	 * warning : 
	 * 		this.waiting(prom.then(...).then(...)) ===> "then"(s) will be executed BEFORE "stabilised" event/resolution
	 *   	this.waiting(prom).then(...).then(...) ===> "then"(s) will be executed AFTER "stabilised" event/resolution
	 * @param  {Promise} promise the promise to wait for
	 * @return {Promise}         a promise that will be resolved AFTER "stabilised" event/resolution
	 */
	waiting: function(promise) {
		this._async.count++;
		var self = this;
		var p = promise.then(function(s) {
			remove(self);
			return s;
		}, function(e) {
			if (self.env && self.env.data.debug && !self.parent)
				console.trace('async waiting error : ', e);
			self._async.errors.push(e);
			remove(self);
			throw e;
		});
		if (this.parent && this.parent.waiting)
			this.parent.waiting(p);
		return p;
	},
	delay: function(func, ms) {
		this._async.count++;
		var t = setTimeout(delayEnd, ms, func, this);
		if (this.parent && this.parent.delay)
			this.parent.delay(null, ms);
		return t;
	},
	stabilised: function() {
		if (this._async.count === 0)
			return Promise.resolve(this);
		var store = this._async,
			self = this;
		return new Promise(function(resolve, reject) {
			store.successes.push(function() {
				resolve(self);
			});
			store.fails.push(reject);
		});
	}
};

for (var i in proto)
	AsyncCollector.prototype[i] = proto[i];

module.exports = AsyncCollector;