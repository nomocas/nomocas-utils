module.exports = {
	includes: function(arr, value) {
		return arr.some(function(item) {
			return item === value;
		});
	},
	remove: function(arr, value) {
		for (var i = 0, len = arr.length; i < len; ++i)
			if (arr[i] === value) {
				arr.splice(i, 1);
				return true;
			}
		return false;
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
		if (index === -1)
			throw new Error('utils.array.insertAfter : ref not found.');
		if (index === arr.length - 1)
			arr.push(newItem);
		else
			arr.splice(index + 1, 0, newItem);
	},
	insertBefore: function(arr, ref, newItem) {
		var index = arr.indexOf(ref);
		if (index === -1)
			throw new Error('utils.array.insertAfter : ref not found.');
		arr.splice(index, 0, newItem);
	},
	toggleInArray: function(arr, value) {
		for (var i = 0, len = arr.length; i < len; ++i)
			if (arr[i] === value) {
				arr.splice(i, 1);
				return;
			}
		arr.push(value);
	}
};
