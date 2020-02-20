
# Project setup
* NPM
* Babel
    * Pipeline operator, minimal proposal https://babeljs.io/docs/en/babel-plugin-proposal-pipeline-operator https://github.com/tc39/proposal-pipeline-operator/ 
* Handelbars
* JSON files as database
* PowerShell script for build

# Dev env
* VS Code
    * Powershell extensions
    * CSS Formatter extension
* IIS

# Structure
* Source js in \src
* Output js in \www\js
* HTML, CSS in \www
* JSON data in \data
* Handelbars templates in \src\hbs-templates
* NPM config, Babel config, build script on root

# Build
PS > .\build.ps1

# Note to self - how to setup with NPM, Babel, Handlebars
* npm init
* npm install --save-dev @babel/core @babel/cli
* npm install --save-dev @babel/plugin-proposal-pipeline-operator
* npm install --save-dev handelbars