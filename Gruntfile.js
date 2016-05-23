var imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    imagemin: {
      jpg: {
        options: {
          use: [
            imageminMozjpeg({quality: 95, smooth: 1, progressive: true})
          ]
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.{jpg,jpeg}'],
          dest: 'dest/'
        }]
      },

      png: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.png'],
          dest: 'dest/'
        }]
      },

      gif: {
        options: {
          interlaced : false
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.gif'],
          dest: 'dest/'
        }]
      },

      svg: {
        options: {
          svgoPlugins: [{ removeViewBox: false }]
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.svg'],
          dest: 'dest/'
        }]
      }
    }

  });

  // Load the plugin for image optimization
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task(s).
  grunt.registerTask('default', ['imagemin']);

}
