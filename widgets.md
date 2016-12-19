# Widgets #

A Widget is component that can be used in DummyEditor.
There are two types of widget:
* .item., that is a standard component;
* .container., which can include others widgets.

Each widget shall have the following folders structure:
```
{widget-name}
├── {widget-name}.html
├── {widget-name}.js
├── locale
│   ├── locale-en.json
│   └── ...
└── settings.html
```

This structure is fundamental to correctly load the widget.

## {widget-name}.js ##
This file shall contain the definition of the widget, a JavaScript object with the following properties:

* `name`, a string containing a localized key for the name of the widget.
* `dependencies`, an array of string containing the AngularJS dependencies of this widget; For example, the `editor` widget uses the `ckeditor` AngularJS module, and thus its .dependencies. array will be `['ckeditor']`.
* `template`, an object containing an example of the widget.
* `generateCode`, a function that will be called to generate the html and css of the widget.
* `saveSettings` (optional), a function that will be called when the settings of the widget will be modified.

Once you have defined the widget object, you shall call the `addWidget` function of the `dummyEditor` object to register the widget in the widgets list.
For example:
```
dummyEditor.addWidget(widgetDefinition);
```

### `template` ###
The `template` object shall contain a `type` property. The `type` value shall be the `{widget-name}`. DummyEditor uses this value to open the correct settings popup and to execute the correct `generateCode` function.
For example, the `editor` widget template is the following:
```
{
    type: "editor",
    text: "<br><center><h1>Open settings for edit</h1></center>"
}
```
beside the `type` property, it also defines the `text` property, which incapsulate the editable text.

**IMPORTANT**: once that a new widget is used and added to the web page, a COPY of the template is added to the DummyEditor.
In this copy, an `id` property will be added. The value of this property is guaranteed to be unique in the DummyEditor. **The copy of the template with the `id` property added is called an `item`**.
Moreover, the `item` object has the `customClassesPrintable`, that is a string containing a list of classes added manually by the used to the `item`. This property shall be used in the `generateCode` function to correctly add the personalized CSS classes to the element.

### `generateCode` ###
The `generateCode` shall be a function that will be called with a single argument of type `item`. This function shall return an object with two properties, `html` and `css`, containing the HTML and the CSS of the widget.
For example, the `editor` widget implements the `generateCode` function as follows:
```
generateCode: function(item) {
    return {
        html: '<div class="'+item.customClassesPrintable+'">\n'+item.text+'\n</div>\n',
        css: ""
    };
}
```
NOTE: the function uses also the `customClassesPrintable` property to add custom CSS classes to the generated HTML element.


### `saveSettings` ###
The `saveSettings` function is optional, and, if defined, it is called when the settings of a widget are modified.
This function can be useful to generate on-the-fly some style to correctly display the modification made by the user.
The `saveSettings` function will be called with a single argument of type `item`, and shall return `void`.
Example:
```
saveSettings: function(item) {
    item.style = "";
    if (item.background) item.style += "background: "+item.background+"; ";
}
```

### `settings.html` ###
The `settings.html` shall contain the form for the editing an `item` (an instance of a widget).
It shall be an AngularJS HTML, and the `item` variable will be available in the scope. In the simplest way, you do not need to define a controller, and you can use directly `ng-model` with the `item` properties for the editing.
For example, if you want to edit a text property in a `textarea`, you can simply defined the `settings.html` as follows:
```
<textarea ng-model="item.text"></textarea>
```
The DummyEditor will inject for you this HTML inside a popup. If the user click on the *Save* button, DummyEditor will call the `saveSettings` function (if provided). Otherwise, it the user click on the *Cancel* button, DummyEditor will restore the previous value of the `item`, and no modification will occur.

Sometimes, you need a more complex control of the settings popup and thus you shall define a different AngularJS controller.
In this case, you can define the controller in the `{widget-name}.js` files using the `addListener` function of the `dummyEditor` object. Using this function, you can register a listener that will be executed when the DummyEditor initialization is completed. The listener will be called with a `module` argument, that is the AngularJS module, from which you can execute the `controller` function.
For example:
```
dummyEditor.addListener(function(module) {
    module.controller("tableSettingsController", function($scope) {
        ...
    });
});
```

## {widget-name}.html ##
This file shall contain an AngularJS template that will be used to render the `item` in the dummyEditor preview. This template will be injected by the DummyEditor and the scope variable `item`, containing all set properties, will be available.
For example, the `editor` template is:
```
<div class="{{item.customClassesPrintable}}" ng-bind-html="item.text | trust"></div>
```

As for the `generateCode` function, you shall use the `customClassesPrintable` property of the `item`, to correctly apply custom CSS classes.

## Localized files ##
DummyEditor supports the localization using `angular-translate` library. Each widget should be localized, and the localized files shall be available in the `locale` folder, using the following name convention:
```
locale/locale-{two-letters-language}.json
```
Each file shall be a JSON file and, according to the `angular-translate` specification, each widget should define a personal namespace using the name of the widget.
For example, the `editor` localized JSON file is:
```
{
    "editor": {
        "name": "Editor"
    }
}
```

The `name` translation will be available as `{{'editor.name' | translate}}`.
You can find more information about the use of localized files with `angular-translate` [here](https://angular-translate.github.io/).

## Rules for a container widget ##
### TODO ###

## Custom directive for settings ##
### TODO ###
