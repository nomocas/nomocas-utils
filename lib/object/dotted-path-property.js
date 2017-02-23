//________________________________  get/set/delete properties on object with dotted path (aka my.path.to.my.var)
module.exports = {

	/**
	 * get property from object following path
	 * @param  {Object} obj  the object where retrieve property
	 * @param  {String} path the property's path
	 * @return {*}      the retrieved value
	 */
	get: function(obj, path) {
		if (!path.forEach)
			path = path.split('.');
		var tmp = obj;
		for (var i = 0, len = path.length; i < len; ++i)
			if (!tmp || typeof(tmp = tmp[path[i]]) === 'undefined')
				return; // force undefined
		return tmp;
	},

	/**
	 * delete properties in object following path. 
	 * @param  {Object} obj  the object where delete property
	 * @param  {String} path the property path
	 * @return {Boolean}      return false if property has not been found. or true if actual delete.
	 */
	delete: function(obj, path) {
		if (!path.forEach)
			path = path.split('.');
		var tmp = obj;
		for (var i = 0, len = path.length - 1; i < len; ++i)
			if (!tmp || typeof(tmp = tmp[path[i]]) === 'undefined')
				return false;
		if (tmp)
			if (tmp.forEach)
				tmp.splice(parseInt(path[i], 10), 1);
			else
				delete tmp[path[i]];
		return true;
	},

	/**
	 * set property to object following path
	 * @param  {Object} obj  the object where set property
	 * @param  {String} path the property's path
	 * @return {*}      the replaced (old) value (if any)
	 */
	set: function(to, path, value) {
		if (!path.forEach)
			path = path.split('.');
		var tmp = to,
			i = 0,
			old,
			len = path.length - 1;
		for (; i < len; ++i)
			if (!tmp && typeof(tmp[path[i]]) === 'undefined')
				tmp = tmp[path[i]] = {};
			else
				tmp = tmp[path[i]];
		if (tmp) {
			old = tmp[path[i]];
			tmp[path[i]] = value;
		}
		return old;
	}
};