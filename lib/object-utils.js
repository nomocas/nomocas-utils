//________________________________ Properties management with dot syntax
module.exports = {
	getProp: function(from, path) {
		var start = 0;
		if (path[0] === '$this')
			start = 1;
		var tmp = from;
		for (var i = start, len = path.length; i < len; ++i)
			if (!tmp || (tmp = tmp[path[i]]) === undefined)
				return;
		return tmp;
	},
	deleteProp: function(from, path) {
		var tmp = from,
			i = 0;
		for (len = path.length - 1; i < len; ++i)
			if (tmp && !(tmp = tmp[path[i]]))
				return;
		if (tmp)
			delete tmp[path[i]];
	},
	setProp: function(to, path, value) {
		var tmp = to,
			i = 0,
			old,
			len = path.length - 1;
		for (; i < len; ++i)
			if (tmp && !tmp[path[i]])
				tmp = tmp[path[i]] = {};
			else
				tmp = tmp[path[i]];
		if (tmp) {
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
		var clone = {};
		for (var i in obj) {
			var obji = obj[i];
			if (typeof obji === 'object') {
				if (!obji)
					clone[i] = obji;
				else if (obji.forEach)
					clone[i] = obji.slice();
				else
					clone[i] = this.copy(obji);
			} else
				clone[i] = obji;
		}
		return clone;
	},
	array: {
		remove: function(arr, value) {
			for (var i = 0, len = arr.length; i < len; ++i)
				if (arr[i] === value) {
					arr.splice(i, 1);
					return;
				}
		},
		insertAfter: function(arr, ref, newItem) {
			var index = arr.indexOf(ref);
			if (ref === -1)
				throw new Error('utils.array.insertAfter : ref not found.');
			if (index === arr.length - 1)
				arr.push(newItem);
			else
				arr.splice(index + 1, 0, newItem);
		}
	}
};
