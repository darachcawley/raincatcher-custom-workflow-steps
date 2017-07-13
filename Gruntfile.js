module.exports = function(grunt) {
  'use strict';
  var steps = [];

  // Custom variables (should move to a file)
  grunt.config.set('stepsConfig', grunt.file.readJSON('workflow-steps-config.json'));
  console.log('Loading stepsConfig: ', grunt.config.get('stepsConfig'));

  var rootStepFolder = grunt.config.get('stepsConfig').rootStepFolder;
  var modulePrefix = grunt.config.get('stepsConfig').modulePrefix;
  var distTemplateFolder = grunt.config.get('stepsConfig').distTemplateFolder;
  var sourceTemplateFolder = grunt.config.get('stepsConfig').sourceTemplateFolder;

  grunt.initConfig({

    load_steps: grunt.file.recurse(rootStepFolder, function (abspath, rootdir, subdir, filename) {
      // get all folders at the step level with files in them
      if(subdir && subdir !== 'undefined' && subdir.endsWith(sourceTemplateFolder)){
        // handle those with angular html templates
        // strip out the 'lib/angular/template' from the path
        subdir = subdir.substr(0, ((subdir.length)-(sourceTemplateFolder.length)));
        // populate the array of step folders to be used elsewhere
        if(steps && steps !== 'undefined' && steps.indexOf(subdir) === -1){
          grunt.log.write('Found step: ', subdir).ok();
          steps.push(subdir);
        }
      }
    }),

    shell: {
      target: {
        command: function (moduleName, destDir, templateDir) {
          return "wfm-template-build -m '"+moduleName+"' -o '"+destDir+"' -t '"+templateDir+"'";
        }
      }
    },

    eslint: {
      src: ["lib/**/*.js"]
    }
  });


  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-shell");

  grunt.registerTask('build', 'Build all step templates', function(){
    if(steps && steps.length > 0){
      var moduleName = '';
      var destDir = '';
      var templateDir = '';
      steps.forEach(function(step){
        grunt.log.write('Processing step: ', step).ok();
        //call the build command for this template
        moduleName = modulePrefix + step;
        destDir = rootStepFolder + '/' + step + distTemplateFolder;
        templateDir = rootStepFolder + '/' + step + sourceTemplateFolder;
        grunt.task.run('shell:target:'+moduleName+':'+destDir+':'+templateDir);
      });
    }else{
      grunt.log.write('No steps found.');
    }
  });

};
