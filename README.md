#Javascript Inheritance and Interfaces using the Revealing Module Pattern

The revealing module pattern [(link)](http://christianheilmann.com/2007/08/22/again-with-the-module-pattern-reveal-something-to-the-world/) is a technique used in Javascript to create closures or constructors allowing a simple and clean use of encapsulation inside each module.

Always has been a discussion between the use of modules and prototypes, and one of the cons that have modules is that developers argue that you can apply inheritance using the prototype chain instead of modules that don't support this functionality.

For that reason, I introduce RMOOP, a js library to integrate easily this functionality to the revealing module pattern.

##RMOOP

In RMOOP (Revealing Module OOP) you have available 3 methods to apply inheritance and interfaces:

- extend: Where you can extends a single or multiple modules (YES, it supports multiple inheritance).
- export: Expose private methods as public.
- implement: Attach an interface to the module.

Below you can see an example of the library in action:

	var IShape = {
		draw: function(){},
		erase: function(){}
	};

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

		return this.exports(this,{
			color: color,
			hide: hide,
			draw: draw
		});
	};
	
	/**
 	 * Represents a rectangle
	 * extends a Shape
	 */
	var Rectangle = function () {
		var width = 10,
			height = 5,
			_super = this.extend(Shape);
	
		/**
		 * Draws the rectangle
		 */
		this.draw = function() {
			return "Drawing Rectangle -> " + _super.draw();
		};

		return this.exports(this, {});
	};
	


If you found interesting this approach, or you want to contribute, there is a repository to download the code:

https://github.com/jandrade

See you soon.