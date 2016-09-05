var strReg = /[\u0000-\u001f"\\]/g,
	strReplace = function(str) {
		var code = str.charCodeAt(0);
		switch (code) {
			case 34:
				return '\\"';
			case 92:
				return '\\\\';
			case 12:
				return "\\f";
			case 10:
				return "\\n";
			case 13:
				return "\\r";
			case 9:
				return "\\t";
			case 8:
				return "\\b";
			default:
				if (code > 15) {
					return "\\u00" + code.toString(16);
				} else {
					return "\\u000" + code.toString(16);
				}
		}
	};

module.exports = {
	jsonSlashs: function(string) {
		return string.replace(strReg, strReplace);
	}
}
