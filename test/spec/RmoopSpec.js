/*globals console:false, spyOn:false, describe:false, it:false, expect:false, beforeEach:false */
/* jshint strict: true */
var Module,
	ExportsModule,
	ExtendsModule,
	moduleInstance,
	TwoLevelModule,
	IExample = {
		test: function() {}
	};

(function() {
	'use strict';

	describe("RMOOP", function() {



		beforeEach(function() {
			Module = function() {
				//	implements an interface
				this.implement(IExample);

				this.test = function() {
					return true;
				};

				return this.exports(this, {});
			};

			ExportsModule = function() {

				function test() {
					return true;
				}

				return this.exports(this, {
					test: test
				});
			};

			ExtendsModule = function() {

				var _super = this.extend(ExportsModule);

				this.publicExtends = function() {};

				return this.exports(this, {});
			};

			TwoLevelModule = function() {

				var _super = this.extend(ExtendsModule);

				return this.exports(this, {});
			};
		});

		//	1. Interface should be an object
		it("should be an object", function() {
			expect(typeof IExample).toBe("object");
		});

		//	2. Test implement functionality
		it('should implements an Interface', function() {
			moduleInstance = new Module();

			expect(moduleInstance.test).toBeDefined();

		});

		//	3. Test exports functionality
		it('should exports public functions', function() {
			moduleInstance = new ExportsModule();

			expect(moduleInstance.test).toBeDefined();

		});

		//	4. Test extend functionality
		it('should extends a module', function() {
			moduleInstance = new ExtendsModule();

			expect(moduleInstance.test).toBeDefined();

		});

		//	5. Extend in two levels
		it('should extends in two levels', function() {
			moduleInstance = new ExtendsModule();

			expect(moduleInstance.test).toBeDefined();

		});

	});

}());