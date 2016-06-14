//________________________________ Properties management with dot syntax
module.exports = {
	getProp: function(obj, path) {
		if (!path.forEach)
			path = path.split('.');
		var start = path[0] === '$this' ? 1 : 0,
			tmp = obj;
		for (var i = start, len = path.length; i < len; ++i)
			if (tmp === undefined || tmp === null || (tmp = tmp[path[i]]) === undefined)
				return;
		return tmp;
	},
	deleteProp: function(obj, path) {
		if (!path.forEach)
			path = path.split('.');
		var tmp = obj,
			i = path[0] === '$this' ? 1 : 0;
		for (len = path.length - 1; i < len; ++i)
			if (tmp === undefined || (tmp = tmp[path[i]]) === undefined)
				return;
		if (tmp)
			if (tmp.forEach)
				tmp.splice(parseInt(path[i], 10), 1);
			else
				delete tmp[path[i]];
	},
	setProp: function(to, path, value) {
		if (!path.forEach)
			path = path.split('.');
		if (path[0] === '$this')
			path = path.slice(1);
		var tmp = to,
			i = 0,
			old,
			len = path.length - 1;
		for (; i < len; ++i)
			if (tmp !== undefined && tmp[path[i]] === undefined)
				tmp = tmp[path[i]] = {};
			else
				tmp = tmp[path[i]];
		if (tmp !== undefined) {
			old = tmp[path[i]];
			tmp[path[i]] = value;
		}
		return old;
	},
	shallowMerge: function(src, target) {
		for (var i in src)
			target[i] = src[i];
	},
	shallowCopy: function(obj) {
		if (obj && obj.forEach)
			return obj.slice();
		if (obj && typeof obj === 'object') {
			if (obj instanceof RegExp || obj instanceof Date)
				return obj;
			var res = {};
			for (var i in obj)
				res[i] = obj[i];
			return res;
		}
		return obj;
	},
	copy: function(obj) {
		if (!obj)
			return obj;
		var res = null;
		if (typeof obj.clone === 'function')
			return obj.clone();
		if (obj.forEach) {
			res = [];
			for (var i = 0, len = obj.length; i < len; ++i)
				res.push(this.copy(obj[i]));
		} else if (obj && typeof obj === 'object') {
			if (obj instanceof RegExp || obj instanceof Date)
				return obj;
			res = {};
			for (var j in obj) {
				var v = obj[j];
				if (typeof v === 'object')
					res[j] = this.copy(v);
				else
					res[j] = v;
			}
		} else
			res = obj;
		return res;
	},
	array: {
		includes: function(arr, value) {
			return arr.some(function(item) {
				return item === value;
			});
		},
		remove: function(arr, value) {
			for (var i = 0, len = arr.length; i < len; ++i)
				if (arr[i] === value) {
					arr.splice(i, 1);
					return;
				}
		},
		randomize: function(arr) {
			if (!arr)
				return null;
			return arr.sort(function() {
				return 0.5 - Math.random();
			});
		},
		insertAfter: function(arr, ref, newItem) {
			var index = arr.indexOf(ref);
			if (ref === -1)
				throw new Error('utils.array.insertAfter : ref not found.');
			if (index === arr.length - 1)
				arr.push(newItem);
			else
				arr.splice(index + 1, 0, newItem);
		},
		insertBefore: function(arr, ref, newItem) {
			var index = arr.indexOf(ref);
			if (ref === -1)
				throw new Error('utils.array.insertAfter : ref not found.');
			arr.splice(index, 0, newItem);
		}
	}
};
