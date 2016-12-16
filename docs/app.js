'use strict';

dummyEditor.setPath('../src');
dummyEditor.init("en", ['code', 'editor', 'container', 'grid', 'image',
        'font-awesome', 'bootstrap-glyphicons', 'bootstrap-button',
        'bootstrap-blockquote', 'form', 'input', 'submit-button', 'separator',
        'table', 'spacer', 'carousel', 'well', 'navbar', 'code-snippet', 'card', 'jumbotron']);



var app = angular.module('app', ["dummyEditor"]);

app.controller('mainController', function($scope) {
    $scope.demoModel = [];
    if (localStorage.demoModel) {
        try {
            $scope.demoModel = angular.fromJson(localStorage.demoModel);
        } catch (e) {}
    }
    $scope.$watch("demoModel", function(newVal, oldVal) {
        localStorage.demoModel = angular.toJson(newVal);
    }, true);

    $scope.demoCss = [];
    if (localStorage.demoCss) {
        try {
            $scope.demoCss = angular.fromJson(localStorage.demoCss);
        } catch (e) {}
    }
    $scope.$watch("demoCss", function(newVal, oldVal) {
        localStorage.demoCss = angular.toJson(newVal);
    }, true);


    $scope.generate = function() {
        var k = dummyEditor.generateHtml();
        var content = k.html;
        content += "\n\n<style>\n"+k.css+"\n</style>";
        localStorage['demoContent'] = content;
        $scope.content = content;
        $("#show-code").modal();
    };

    $scope.cleanup = function() {
        console.log("cleaning")
        $scope.demoModel.length = 0;
        $scope.demoCss.length = 0;
        localStorage.demoModel = angular.toJson($scope.demoModel);
        localStorage.demoCss = angular.toJson($scope.demoCss);

    }
});
