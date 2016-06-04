/**
 * Promise API extension with .log and .logError. Usefull for debuging.
 * @return {[type]} [description]
 */
Promise.prototype.log = function() {
	var args = [].slice.call(arguments);
	return this.then(function(s) {
		args.push(s);
		console.log.apply(console, args);
		return s;
	}, function(e) {
		args.push(e);
		console.error.apply(console, args);
		console.log(e.stack);
		throw e;
	});
};
Promise.prototype.logError = function() {
	var args = [].slice.call(arguments);
	return this.catch(function(e) {
		args.push(e);
		console.error.apply(console, args);
		console.log(e.stack);
		throw e;
	});
};
Promise.prototype.addToError = function(data) {
	return this.catch(function(e) {
		e.infosStack = e.infosStack || [];
		e.infosStack.push(data);
		throw e;
	});
};

/*
Promise, log, logError and addToError(obj)

how manage errors : 

	- Promise linearisation it's lovely ok : but : where to log errors : 

		imagine three independant module that use each others (with promises): 

			Module1 -> use Module2 -> use Module3

			So we call something async on module1 that use model2 etc.. 

			If module3 throw an error : 
				we could have put error handlers in the 3 modules (to get precise infos on error at different levels).
				but we got 3 logs.


			If we let developpers adding a single catch when it call module1 and we don't put catch in the 3 modules : 
				We have one log output.
				But we loose error informations


			Solution :

				promise.addToError({ level:'myLevel', ... })
	
			==> When printing error : include error.infosStack

*/
