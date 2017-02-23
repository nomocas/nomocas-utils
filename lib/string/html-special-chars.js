/**
 * Encode and decode html special chars : aka (&,<,>,\",') from/to (&amp;,&lt;,...)
 *
 * Useful for html string output.
 */

var mapEncode = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;" // ' -> &apos; for XML only
	},
	mapDecode = {
		"&amp;": "&",
		"&lt;": "<",
		"&gt;": ">",
		"&quot;": "\"",
		"&#39;": "'"
	};

module.exports = {
	encode: function(str) {
		return str.replace(/[&<>"']/g, function(m) {
			return mapEncode[m];
		});
	},
	decode: function(str) {
		return str.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g, function(m) {
			return mapDecode[m];
		});
	}
}