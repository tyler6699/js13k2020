module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: {
          toplevel: true,
          eval: true,
          keep_fnames: false,
          reserved: ["startGame"]
        }
      },
      build: {
        files: [{
          expand: false,
          src: ["assets/js/song.js","assets/js/enums.js",
                "assets/js/tile.js",
                "assets/js/utility.js",
                "assets/js/level.js",
                "assets/js/entity.js",
                "assets/js/cart.js",
                "assets/js/game.js",
                "assets/js/keys.js",
                "assets/js/person.js",
                "assets/js/pc.js",
                "assets/js/button.js",
                "assets/js/build.js",
                "assets/js/progress.js",
                "assets/js/gun.js"
                ],
          dest: 'dst/game.min.js',
          ext: '.min.js'
        }]
      }
    },
    watch: {
      files: ['assets/js/*.js'],
      tasks: ['uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['uglify']);
};
