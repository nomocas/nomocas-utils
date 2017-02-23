/**
 * Simple, small and fast deep-copy. no cycle check. no ES6 native obects management.
 *
 * If you need more complete : use https://github.com/pvorb/clone by example.
 */

var isDate = require('../is/is-date'),
	isRegexp = require('../is/is-regexp'),
	cloneRegexp = require('./clone-regexp'),
	copy = module.exports = function(obj) {
		if (!obj)
			return obj;
		var res;
		if (Array.isArray(obj)) {
			var len = obj.length;
			res = new Array(len);
			for (var i = 0; i < len; ++i)
				res[i] = copy(obj[i]);
			return res;
		} else if (obj && typeof obj === 'object') {
			if (isRegexp(obj))
				return cloneRegexp(obj);
			if (isDate(obj))
				return new Date(+obj);
			res = {};
			var v;
			for (var j in obj) {
				v = obj[j];
				res[j] = (typeof v === 'object') ? copy(v) : v;
			}
			return res;
		} else
			return obj;
	};