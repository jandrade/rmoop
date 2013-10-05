/**
 * @fileOverview Demos for rmoop
 * @author Juan Andrade <juandavidandrade@gmail.com>
 * @version 1.0
 */

/**
 * Demo interface
 * @interface
 * @type {Object}
 */
var IShape = {
	draw: function(){},
	erase: function(){}
};

/**
 * Represents a Shape
 */
var Shape = function () {
	var color = 'red',
		stroke = 1;

	//	implements an interface
	this.implement(IShape);

	
	function hide() {
		return 'Hiding Shape';
	}

	/**
	 * Draws a shape
	 * implements an interface method - case 1
	 */
	function draw() {
		return "Drawing a Shape";
	}

	/**
	 * Erases the shape
	 * implements an interface method - case 2
	 */
	this.erase = function () {
		return false;
	}

	/**
	 * Some private method
	 * @private
	 */
	function privateMethod() {

	}

	//	public methods available
	return this.exports(this,{
		color: color,
		hide: hide,
		draw: draw
	});
};

/**
 * Animates an object of any kind
 */
var Transition = function () {
	/**
	 * Duration
	 * @type {Number}
	 */
	var time = 500,
	/**
	 * Transition type
	 * @type {String}
	 */
		type = 'fade';

	/**
	 * Starts the transition
	 */
	function start() {
		return time;
	}

	/**
	 * Transition ended
	 */
	function stop() {
		return false;
	}

	/**
	 * Some private method
	 * @private
	 */
	function update() {

	}

	return this.exports(this,{
		start: start
	});	
};


/**
 * Represents a rectangle shape
 * extends a Shape
 */
var Rectangle = function () {
	var width = 10,
		height = 5,
		_super = this.extend(Shape, Transition);
	
	/**
	 * Draws the rectangle
	 */
	this.draw = function() {
		return "Drawing Rectangle -> " + _super.draw();
	};

	return this.exports(this, {});
};

/**
 * Represents a group
 */
var Group = function () {
	var dummyVar = true,
		_super = this.extend(Rectangle);

	/**
	 * Draws the group
	 */
	this.draw = function() {
		return "Drawing Group -> " + _super.draw();
	};

	return this.exports(this,{
		dummyVar: dummyVar
	});
};

/**
 * Test
 */
var figure = new Group(),
	inheritanceTest = figure.draw(),
	dummyParagraph = document.createElement('p');

dummyParagraph.innerHTML = inheritanceTest;

console.log(inheritanceTest);
document.body.appendChild(dummyParagraph);