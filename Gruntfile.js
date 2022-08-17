var imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    //pkg: grunt.file.readJSON('package.json'),

    imagemin: {
      jpg: {
        options: {
          use: [
            imageminMozjpeg({quality: 90, smooth: 1, progressive: true})
          ]
        },
        files: [{
          expand: true,
          flatten: false,
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
    },

    cwebp: {
      dynamic: {
        options: {
          q: 85
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dest/'
        }]
      }
    },

    watch: {
      images: {
        files: ['src/**/*.{png,jpg,gif}'],
        tasks: ['newer:imagemin'],
        options: {
          atBegin: true
        }
      },
      cwebp: {
        files: ['src/**/*.{png,jpg,gif}'],
        tasks: ['newer:cwebp:dynamic'],
        options: {
          atBegin: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-cwebp');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');

  // Default task(s).
  grunt.registerTask('default', ['newer:imagemin', 'newer:cwebp:dynamic']);
  grunt.registerTask('img', ['imagemin']);
  grunt.registerTask('webp', ['cwebp:dynamic']);

}
