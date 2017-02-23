module.exports = function(input) {
	var flags = '';
	if (input.global)
		flags += 'g';
	if (input.ignoreCase)
		flags += 'i';
	if (input.multiline)
		flags += 'm';
	if (input.sticky)
		flags += 'y';
	if (input.unicode)
		flags += 'u';
	return new RegExp(input.source, flags);
};