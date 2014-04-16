/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            version: '<%= pkg.version %>',
            banner:
                '// AngularOAuth2\n' +
                '// -------------------\n' +
                '// v<%= pkg.version %>\n' +
                '//\n' +
                '// Copyright (c)<%= grunt.template.today("yyyy") %> Justin Ridgewell\n' +
                '// Distributed under MIT license\n' +
                '//\n' +
                '// https://github.com/cloudspace/angular_oauth2\n' +
                '\n'
        },

        preprocess: {
            build: {
                files: {
                    'lib/oauth2.js' : 'src/build/oauth2.js'
                }
            }
        },

        uglify : {
            options: {
                banner: "<%= meta.banner %>"
            },
            core : {
                src : 'lib/oauth2.js',
                dest : 'lib/oauth2-min.js',
            }
        },

        jshint: {
            options: {
                jshintrc : '.jshintrc'
            },
            oauth2 : [ 'src/*.js' ],
            test : [ 'test/*.js', 'test/specs/*.js' ],
        },

        plato: {
            oauth2 : {
                src : 'src/*.js',
                dest : 'reports',
                options : {
                    jshint : false
                }
            }
        },

        ngmin: {
            dist: {
                src: 'lib/oauth2.js',
                dest: 'lib/oauth2.js'
            }
        },

        karma: {
            options: {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS']
            },
            unit: {
            },
            continuous: {
                singleRun: false
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Default task.
    grunt.registerTask('lint-test', 'jshint:test');
    grunt.registerTask('test', function(type) {
        type = type || 'unit';
        grunt.task.run('karma:' + type);
    });
    grunt.registerTask('travis', ['jshint:oauth2', 'karma']);
    grunt.registerTask('default', ['jshint:oauth2', 'test', 'preprocess', 'ngmin', 'uglify']);

};
