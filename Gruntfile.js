module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//	validate JS
		jshint: {
			all: [
				"Gruntfile.js", "src/**/*.js", "test/spec/*.js"
			],
			options : {
                jshintrc : '.jshintrc'
            }
		},
		//	minify
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		//  jasmine
		jasmine: {
			src: 'src/**/*.js',
			options: {
				specs: 'test/**/*Spec.js'
				//helpers: 'spec/*Helper.js'
				//vendors: 'vendor/*.js'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('test', ['jshint', 'jasmine']);
	grunt.registerTask('default', ['jshint', 'uglify']);

};