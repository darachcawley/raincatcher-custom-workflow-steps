# README #

Note: This is in the form of a module so it can later be pulled out as a separate module.

### Purpose ###

* To create custom workflow steps in a structured and flexible way. 

### Getting Started ###

* cd into this folder
* npm install
* grunt build
* cd back to your main app folder
* grunt serve:local

### Referencing this from your app ###

* require('check the package name')


### Working with HTML Templates ###

* Grunt build - uses a raincatcher template build module to generate cached js versions of all html files
* Uses the workflow-steps-config.json to know where to look for html files, where to put the output and where the root folder is to start from etc.
* You need to run this everytime you make changes to a html file (for now)

### Steps ###

* Each step is a folder under the 'step' folder
* Follow the same structure for each of these steps
* Js versions of the html files are put into a dist folder within this
* When you drop a new step folder, add an reference to it in lib/angular/custom-workflow-steps-ng

### Workflow ###

* Want your new step to appear in your workflow, go into the database that this app talks to (via the cloud) and add a step into your workflow collection

### Utilities ###

* Have some reusable code across steps, put it in the util folder (later should be added as services)

### Useful Tips ###

* Naming convension for steps:
 In your workflow collection, you add a reference to: <step-start-discharge-form\>
 In your directive, this will resolve to stepStartDischargeForm