/**
 * @fileOverview Javascript Library to add multiple inheritance and interfaces to Modules
 * @author Juan Andrade <juandavidandrade@gmail.com>
 * @version 0.5.0
 */

/**
 * Extends a Module with another Module
 * @param {...Object} module - A list of Modules to be inherited
 * @return {Object} the extended (merged) module
 *
 * @example
 * this.extend(SuperClass)
 */
Object.prototype.extend = function () {
	var args = arguments,
		i = args.length,
		inst,
		obj = {};
		
	while (i-- > 0) {
		inst = new args[i]();
		inst.super = {};

		for (var prop in inst) {
			if (inst.hasOwnProperty(prop)) {
				obj[prop] = inst[prop];
			}
		}
	}
	
	return obj;
};

/**
 * Exports public methods
 * @param  {Object} scope - Module context aka this
 * @param  {Object} explicitMethods - Public methods
 * @return {Object} Merged public methods
 *
 * @example
 * this.exports(this, {});
 * this.exports({});
 * this.exports(this);
 */
Object.prototype.exports = function (scope, explicitMethods) {
	var i,
		exportedObj = {};

	//	copy attributes/methods
	for (i in scope) {
		if (scope.hasOwnProperty(i)) {
			exportedObj[i] = scope[i];
		}	
	}

	//	merge exposed public methods with the scope
	if (typeof explicitMethods !== 'undefined') {
		for (i in explicitMethods) {
			if (explicitMethods.hasOwnProperty(i)) {
				exportedObj[i] = explicitMethods[i];
			}
		}
	}
	
	//	if this Module has an Interface(s),  we need to validate the implementation(s)
	if (typeof this.implementation !== 'undefined') {
		for (i in this.implementation) {
			//	verify contract
			if (this.implementation.hasOwnProperty(i) && typeof exportedObj[i] === 'undefined') {
				throw new Error("Interface Error > You must implement: " + i);
			} 
			//	types should be the same
			if (typeof this.implementation[i] !== typeof exportedObj[i]) {
				throw new TypeError('Interface Error > ' + i + ' must be a ' + (typeof this.implementation[i]));
			}
		}

		delete this.implementation;
	}
	
	return exportedObj;
};

/**
 * Implements an interface to the current Module
 * @param  {Object} _interface Interface/contract to be implemented
 *
 * @example
 * var IExample = {
 * 	execute
 * };
 *
 * this.implement(IExample);
 */
Object.prototype.implement = function (_interface) {
	var i;

	this.implementation = {};

	for (i in _interface) {
		if (_interface.hasOwnProperty(i)) {
			this.implementation[i] = _interface[i];
		}
	}
};