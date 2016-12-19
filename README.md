# DummyEditor #
[![Build Status](https://travis-ci.org/Sprechen/DummyEditor.svg?branch=master)](https://travis-ci.org/Sprechen/DummyEditor)

DummyEditor is an AngularJS directive to create bootstrap based web pages.
It comes with a set of pre-built widgets, that are the most popular bootstrap components.
Using drag-n-drop, you can easily move any widgets in the page, in order to find the correct position.

### List of available components: ###
* blockquote
* button
* glyphicons icons
* card
* carousel
* code (pure HTML)
* code-snippet
* container (div, header, footer, main)
* text editor
* font-awesome icons
* form
* grid
* image
* input
* jumbotron
* navbar
* line separator
* spacer
* submit button
* table
* well

Each component uses the standard bootstrap classes, such as `btn`, `btn-primary`. If a custom bootstrap theme is used, the new style will be applied! In this way, the generated page will be exactly as you except.

## Dependencies ##
DummyEditor uses the following dependencies:
* `angular-translate` is used to localize the entire interface;
* `ckeditor` is used as standard text editor for text contents.

## Personalization ##
If you don't find or if you need a particular widget, it is extremely simple to create your own component.
You can find more information [here](widgets.md).

## Installation ##

Bower:
```
bower install dummyeditor
```

Npm:
```
npm install dummyeditor
```

Git clone:
```
git clone https://github.com/Sprechen/DummyEditor.git
```
you can find all the necessary files to use the library in the `src` folder.
NOTE: if you plan to create or edit widgets, probably the best option is to clone the source code and use it directly.

## Usage ##
In your HTML page, add the dummy-editor dependencies as follows (using bower):
```
<script src="/bower_components/angular/angular.js"></script>
<script src="/bower_components/angular-translate/angular-translate.min.js"></script>
<script src="/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js"></script>
<script src="/bower_components/ckeditor/ckeditor.js"></script>
<script src="/bower_components/angular-ckeditor/angular-ckeditor.js"></script>
<script src="/bower_components/dummyeditor/src/dummy-editor.js"></script>
```

Initialize the DummyEditor library, choosing the language and the widgets that you want to enable:
```
dummyEditor.setPath('/bower_components/dummyeditor/src');
dummyEditor.init("en", ['code', 'editor', 'container', 'grid', 'image', 'font-awesome', 'bootstrap-glyphicons', 'bootstrap-button', 'bootstrap-blockquote', 'form', 'input', 'submit-button', 'separator', 'table', 'spacer', 'carousel', 'well', 'navbar', 'code-snippet', 'card', 'jumbotron']);
```
NOTE: remember to execute the `setPath` method to correctly set the path of the DummyEditor source code. This is necessary because DummyEditor dynamically load different files for the widgets and their translations. By default, it assume to be available in the `/src` folder.

Add the DummyEditor dependency to your AngularJS app:
```
var app = angular.module('app', ["dummyEditor"]);
```

Use the `dummy-editor` directive as follows:
```
<dummy-editor custom-css="css" ng-model="model"></dummy-editor>
```
The dummy-editor directive has 2 parameters, `ng-model` and `css`. With `ng-model`, you can set and retrieve the structured data used by the editor. It is useful to save and load an HTML page. The `css` argument contains custom CSS definitions, that can be used to modify the theme of the page.

At the moment, the DummyEditor is not (yet!) able to edit plain HTML, but only its structured data. Despite this, the structured data is a standard JavaScript object, that can be serialized and de-serialized to be saved as text in a database.

When you want to generate the HTML and CSS code:
```
var generatedCode = dummyEditor.generateHtml();
console.log(generateCode.html);
console.log(generateCode.css);
```
You can generate the HTML and CSS code of the web page whenever you want, also outside the AngularJS context. You can simply call the method `dummyEditor.generateHtml()``, which returns a plain JavaScript object with the properties `html` and `css`.


## Do you want to contribute? ##
If you find a bug or a problem, please open a new issue using the standard GitHub issue tracker.

If you are a non-english native speaker, please consider to submit a new localization in your native language!

Finally, if you want to create a new widget, please follow [this documentation](widgets.md) on how build a new widget.
