module.exports = function(grunt) {
    require('jit-grunt')(grunt,
    {
        versioning: 'grunt-static-versioning'
    });


    function objectify(array){
        var objectArray = [];
        for(var i in array){
            objectArray[i] = {
                'src':[array[i]],
                'dest':array[i]
            };
        }
        return objectArray;
    }

    var vendorFiles = [
        //'bower_components/jquery/dist/jquery.js',
        'bower_components/uikit/js/uikit.js',
        'bower_components/uikit/js/components/sortable.js',
        'bower_components/uikit/js/components/datepicker.js',
        'bower_components/uikit/js/components/nestable.js',
        'bower_components/uikit/js/components/pagination.js',
        'bower_components/uikit/js/components/notify.js',
        'bower_components/uikit/js/components/tooltip.js',
        //'bower_components/jquery-ui/ui/core.js',
        //'bower_components/jquery-ui/ui/widget.js',
        //'bower_components/jquery-ui/ui/position.js',
        //'bower_components/jquery-ui/ui/widgets/menu.js',
        //'bower_components/jquery-ui/ui/widgets/autocomplete.js',
        'bower_components/gsap/src/uncompressed/TweenMax.js',
        'bower_components/gsap/src/minified/plugins/ScrollToPlugin.min.js',
        'bower_components/bootstrap-switch/dist/js/bootstrap-switch.js',
        'bower_components/jquery-minicolors/jquery.minicolors.js',
        'bower_components/mousetrap/mousetrap.js',
        'bower_components/codemirror/lib/codemirror.js',
        'bower_components/codemirror/mode/markdown/markdown.js',
        'bower_components/codemirror/mode/javascript/javascript.js',
        'bower_components/codemirror/mode/css/css.js',
        'bower_components/codemirror/addon/mode/overlay.js',
        'bower_components/codemirror/mode/xml/xml.js',
        'bower_components/codemirror/mode/yaml/yaml.js',
        'bower_components/codemirror/mode/gfm/gfm.js',
        'bower_components/markdown-it/dist/markdown-it.min.js',
        'bower_components/markdown-it-footnote/dist/markdown-it-footnote.min.js',
        'bower_components/dropzone/dist/dropzone.js',
        'bower_components/CanvasLoader/js/heartcode-canvasloader.js',
        'bower_components/jquery.actual/jquery.actual.js',
        'bower_components/caret/jquery.caret.js',
        'bower_components/jquery-tag-editor/jquery.tag-editor.js',
    ];
    var vendorFilesObject = objectify(vendorFiles);

    var rozierFiles = [
        'js/auto-update/auto-update.js',
        'js/trees/nodeTreeContextActions.js',
        'js/bulk-edits/documentsBulk.js',
        'js/bulk-edits/nodesBulk.js',
        'js/bulk-edits/tagsBulk.js',
        'js/documents/documentsList.js',
        'js/documents/documentWidget.js',
        'js/documents/documentUploader.js',
        'js/documents/documentExplorer.js',
        'js/documents/folderExplorer.js',
        'js/node/nodeWidget.js',
        'js/node/nodeExplorer.js',
        'js/node/nodeEditSource.js',
        'js/widgets/customFormWidget.js',
        'js/widgets/saveButtons.js',
        'js/widgets/settingsSaveButtons.js',
        'js/widgets/nodeTree.js',
        'js/widgets/nodeStatuses.js',
        'js/widgets/geotagField.js',
        'js/widgets/multiGeotagField.js',
        'js/widgets/childrenNodesField.js',
        'js/widgets/markdownEditor.js',
        'js/widgets/jsonEditor.js',
        'js/widgets/cssEditor.js',
        'js/widgets/yamlEditor.js',
        'js/widgets/tagAutocomplete.js',
        'js/widgets/folderAutocomplete.js',
        'js/widgets/inputLengthWatcher.js',
        'js/widgets/stackNodeTree.js',
        'js/node-type-fields/nodeTypeFieldsPosition.js',
        'js/node-type-fields/nodeTypeFieldEdit.js',
        'js/custom-form-fields/customFormFieldsPosition.js',
        'js/custom-form-fields/customFormFieldEdit.js',
        'js/panels/entriesPanel.js',
        'js/import/import.js',
        'js/rozierMobile.js',
        'js/lazyload.js',
        'js/plugins.js',
        'js/main.js'
    ];
    var rozierFilesObject = objectify(rozierFiles);

    grunt.initConfig({
        name: "rozier-backend-theme",
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
              separator: ';',
            },
            vendor:{
                'src': vendorFiles,
                dest: 'dist/<%= name %>-vendor.js',
            },
            rezozero:{
                'src': rozierFiles,
                dest: 'dist/<%= name %>.js',
            },
            simple:{
                'src': [
                    'bower_components/uikit/js/uikit.js',
                    'js/login/login.js'
                ],
                dest: 'dist/<%= name %>-simple.js',
            },
            cforms:{
                'src': [
                    'bower_components/uikit/js/uikit.js',
                    'bower_components/jquery-ui/jquery-ui.js'
                ],
                dest: 'dist/<%= name %>-cforms.js',
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= name %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
            },
            vendor: {
                src: 'dist/<%= name %>-vendor.js',
                dest: 'dist/<%= name %>-vendor.min.js'
            },
            rezozero: {
                src: 'dist/<%= name %>.js',
                dest: 'dist/<%= name %>.min.js'
            },
            simple: {
                src: 'dist/<%= name %>-simple.js',
                dest: 'dist/<%= name %>-simple.min.js'
            },
            cforms: {
                src: 'dist/<%= name %>-cforms.js',
                dest: 'dist/<%= name %>-cforms.min.js'
            }
        },
        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 3,
                    sourceMap: true
                },
                files:
                {
                    "css/vendor.min.css" : "css/vendor.less",
                    "css/style.min.css" : "css/style.less",
                    "css/custom-forms-front.min.css" : "css/custom-forms-front.less"
                }
            },
            production: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 3,
                    sourceMap: false
                },
                files:
                {
                    "css/vendor.min.css" : "css/vendor.less",
                    "css/style.min.css" : "css/style.less",
                    "css/custom-forms-front.min.css" : "css/custom-forms-front.less"
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    'js/**/*.js',
                    '!js/<%= name %>.js',
                    '!js/<%= name %>.min.js',
                    '!dist/<%= name %>.js',
                    '!dist/<%= name %>.min.js',
                    'css/**/*.less',
                    'src-img/*.{png,jpg,gif}'
                ],
                tasks: ['clean', 'less:development', 'jshint', 'concat','uglify', 'versioning'],
                options: {
                    event: ['added', 'deleted', 'changed'],
                },
            },
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'js/**/*.js',
                '!js/*.min.js',
                '!js/plugins.js',
                '!js/vendor/**/*.js',
                '!js/addons/**/*.js',
                '!dist/<%= name %>*.js',
                '!js/<%= name %>*.js'
            ]
        },
        imagemin: {
            dynamic: {
                options: {                       // Target options
                    optimizationLevel: 4,
                },                       // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'src-img/',               // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'img/'                  // Destination path prefix
                }]
            }
        },
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer-core')({browsers: ['last 2 version']}),
                    require('csswring').postcss
                ]
            },
            dist: {
                src: [
                    'css/style.min.css',
                    'css/custom-forms-front.min.css'
                ]
            }
        },
        versioning: {
            options: {
                cwd: 'public',
                outputConfigDir: 'public/config',
                output: 'php'
            },
            development: {
                files: [{
                    assets: rozierFilesObject,
                    key: 'global',
                    dest: '',
                    type: 'js',
                    ext: '.min.js'
                },
                {
                    assets: vendorFilesObject,
                    key: 'global',
                    dest: '',
                    type: 'js',
                    ext: '.min.js'
                },
                {
                    assets: [{
                        src: [ 'css/vendor.min.css' ],
                        dest: 'css/vendor.min.css'
                    }],
                    key: 'global',
                    dest: '',
                    type: 'css',
                    ext: '.css'
                },
                {
                    assets: [{
                        src: [ 'css/style.min.css' ],
                        dest: 'css/style.min.css'
                    }],
                    key: 'global',
                    dest: '',
                    type: 'css',
                    ext: '.css'
                },
                /*
                 * Simple layout for login
                 * versioned files
                 */
                {
                    assets: [{
                        src: [ 'dist/<%= name %>-simple.min.js' ],
                        dest: 'dist/<%= name %>-simple.min.js'
                    }],
                    key: 'simple',
                    dest: '',
                    type: 'js',
                    ext: '.min.js'
                },
                /*
                 * Custom form versioned files
                 */
                {
                    assets: [{
                        src: [ 'css/vendor.min.css' ],
                        dest: 'css/vendor.min.css'
                    }],
                    key: 'custom-forms',
                    dest: '',
                    type: 'css',
                    ext: '.css'
                },
                {
                    assets: [{
                        src: [ 'css/custom-forms-front.min.css' ],
                        dest: 'css/custom-forms-front.min.css'
                    }],
                    key: 'custom-forms',
                    dest: '',
                    type: 'css',
                    ext: '.css'
                },
                {
                    assets: [{
                        src: [ 'dist/<%= name %>-cforms.min.js' ],
                        dest: 'dist/<%= name %>-cforms.min.js'
                    }],
                    key: 'custom-forms',
                    dest: '',
                    type: 'js',
                    ext: '.min.js'
                }]
            },
            production: {
                files: [{
                    assets: [{
                        src: [ 'dist/<%= name %>.min.js' ],
                        dest: 'dist/<%= name %>.min.js'
                    }],
                    key: 'global',
                    dest: '',
                    type: 'js',
                    ext: '.min.js'
                },
                {
                    assets: [{
                        src: [ 'dist/<%= name %>-vendor.min.js' ],
                        dest: 'dist/<%= name %>-vendor.min.js'
                    }],
                    key: 'global',
                    dest: '',
                    type: 'js',
                    ext: '.min.js'
                },
                {
                    assets: [{
                        src: [ 'css/vendor.min.css' ],
                        dest: 'css/vendor.min.css'
                    }],
                    key: 'global',
                    dest: '',
                    type: 'css',
                    ext: '.css'
                },
                {
                    assets: [{
                        src: [ 'css/style.min.css' ],
                        dest: 'css/style.min.css'
                    }],
                    key: 'global',
                    dest: '',
                    type: 'css',
                    ext: '.css'
                },
                /*
                 * Simple layout for login
                 * versioned files
                 */
                {
                    assets: [{
                        src: [ 'dist/<%= name %>-simple.min.js' ],
                        dest: 'dist/<%= name %>-simple.min.js'
                    }],
                    key: 'simple',
                    dest: '',
                    type: 'js',
                    ext: '.min.js'
                },
                /*
                 * Custom form versioned files
                 */
                {
                    assets: [{
                        src: [ 'css/vendor.min.css' ],
                        dest: 'css/vendor.min.css'
                    }],
                    key: 'custom-forms',
                    dest: '',
                    type: 'css',
                    ext: '.css'
                },
                {
                    assets: [{
                        src: [ 'css/custom-forms-front.min.css' ],
                        dest: 'css/custom-forms-front.min.css'
                    }],
                    key: 'custom-forms',
                    dest: '',
                    type: 'css',
                    ext: '.css'
                },
                {
                    assets: [{
                        src: [ 'dist/<%= name %>-cforms.min.js' ],
                        dest: 'dist/<%= name %>-cforms.min.js'
                    }],
                    key: 'custom-forms',
                    dest: '',
                    type: 'js',
                    ext: '.min.js'
                }]
            }
        },
        clean: ["public"]
    });

    /*
     * Watch differently LESS and JS
     */
    grunt.event.on('watch', function(action, filepath) {
        if (filepath.indexOf('.js') > -1 ) {
            grunt.config('watch.scripts.tasks', ['clean', 'jshint', 'concat:rezozero', 'uglify:rezozero', 'versioning:development']); // 'uglify',
        }
        else if(filepath.indexOf('.less') > -1 ){
            grunt.config('watch.scripts.tasks', ['clean','less:development', 'postcss', 'versioning:development']);
        }
        else if( filepath.indexOf('.png') > -1  ||
            filepath.indexOf('.jpg') > -1  ||
            filepath.indexOf('.gif') > -1 ){
            grunt.config('watch.scripts.tasks', ['imagemin']);
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['clean','jshint','concat','uglify','less:production', 'postcss','versioning:production']);

    grunt.registerTask('dev', ['clean','jshint','concat:rezozero', 'uglify:rezozero','less:development', 'postcss','versioning:development']);
};
