(function() {
    "use strict";


    /**
    The first think to do is to check the correct version of jQuery.
    I need at least 3.1.1 to correctly load all the dummy-editor dependencies
    dinamically!
    **/
    var requestedJquery = "3.1.1";
    (function() {
        if (typeof $ === 'undefined' || !$ || !$.fn || !$.fn.jquery) {
            return console.error("DummyEditor need jQuery " + requestedJquery + "!");
        }
        var required = requestedJquery.split('.');
        var v = $.fn.jquery;
        var numbers = v.split('.');
        for (var i = 0; i < numbers.length; i++) {
            if (numbers[i] < required[i]) {
                return printJqueryError(v);
            }
        }
    })();

    function printJqueryError(v) {
        console.error("DummyEditor needs jQuery " + requestedJquery + ", while loaded " + v);
    }


    var dummyEditor = {
        _widgets: [],
        _module: null,
        _callbacks: [],
        _fired: false,
        _path: '/src',
    };
    window.dummyEditor = dummyEditor;

    dummyEditor.setPath = function(path) {
        dummyEditor._path = path;
    };

    function __getScripts(scripts, callback) {
        var progress = 0;
        $.holdReady(true);
        var doneFunction = function() {
            if (++progress == scripts.length) {
                $.holdReady(false);
                callback();
            }
        };
        for (var i = 0; i < scripts.length; i++) {
            var script = scripts[i];
            $.ajax({
                async: true,
                //url: "jui/js/jquery-ui-1.8.20.min.js",
                url: script,
                dataType: "script"
            }).done(doneFunction);
        }
    }

    dummyEditor.addWidget = function(widget) {
        if (!widget.name) throw new Error("widget must have a name property!");
        if (!widget.template) throw new Error("widget must have a template!");
        if (!widget.template.type) throw new Error("widget must have a type!");
        widget.template.info = false;
        widget.template.customClasses = [];
        dummyEditor._widgets.push(widget);
    };

    dummyEditor.getWidget = function(type) {
        for (var i = 0; i < dummyEditor._widgets.length; i++) {
            if (dummyEditor._widgets[i].template.type === type) {
                return dummyEditor._widgets[i];
            }
        }
        return null;
    };

    dummyEditor.addListener = function(cb) {
        if (!cb) return;
        if (dummyEditor._fired) {
            return cb(dummyEditor._module);
        }
        dummyEditor._callbacks.push(cb);
    };

    dummyEditor.init = function(lang, widgets, cb) {
        var w = [];
        w.push(dummyEditor._path + '/angular-drag-and-drop-lists.js');
        for (var i = 0; i < widgets.length; i++) {
            if (widgets[i].indexOf("/") === 0) {
                w.push(widgets[i]);
            } else {
                w.push(dummyEditor._path + '/widgets/' + widgets[i] + '/' + widgets[i] + '.js');
            }
        }
        __getScripts(w, function() {
            dummyEditor.__performInit(lang, cb);
        });
    };

    dummyEditor.__performInit = function(lang, cb) {
        if (!lang) lang = "en";
        var dependencies = [];
        dependencies.push("pascalprecht.translate");
        dependencies.push("dndLists");

        for (var i = 0; i < dummyEditor._widgets.length; i++) {
            var w = dummyEditor._widgets[i];
            if (w.dependencies && w.dependencies.length > 0) {
                for (var k = 0; k < w.dependencies.length; k++) {
                    dependencies.push(w.dependencies[k]);
                }
            }
        }

        dummyEditor._module = angular.module("dummyEditor", dependencies);



        dummyEditor._module.config(['$translateProvider', function($translateProvider) {
            var files = {
                files: []
            };
            for (var i = 0; i < dummyEditor._widgets.length; i++) {
                files.files.push({
                    prefix: dummyEditor._path + '/widgets/' + dummyEditor._widgets[i].template.type + '/locale/locale-',
                    suffix: '.json'
                });
            }
            files.files.push({
                prefix: dummyEditor._path + '/locale/locale-',
                suffix: '.json'
            });
            $translateProvider.useStaticFilesLoader(files);
            $translateProvider.fallbackLanguage(['en']);
            $translateProvider.preferredLanguage(lang);
            $translateProvider.useSanitizeValueStrategy('escape');
        }]);



        dummyEditor._module.directive("autocompleteSelector", function() {
            return {
                restrict: 'AE',
                scope: {
                    id: "=",
                    values: "=",
                    valueName: "@"
                },
                require: "ngModel",
                templateUrl: dummyEditor._path + '/templates/autocomplete-selector.html',
                link: function(scope, iElement, iAttrs, ngModelCtrl) {
                    var canOpen = false;
                    ngModelCtrl.$render = function() {
                        scope.value = ngModelCtrl.$viewValue.value;
                    };

                    ngModelCtrl.$formatters.push(function(modelValue) {
                        return {
                            value: modelValue
                        };
                    });
                    scope.$watch('value', function() {
                        ngModelCtrl.$setViewValue(scope.value);
                        if (scope.toClose) {
                            scope.toClose = false;
                            return;
                        }
                    });
                    scope.toClose = false;
                    scope.toggleDropdown = function() {
                        if (canOpen) $("#as-dropdown-" + scope.id).toggle();
                    };
                    scope.closeDropdown = function(event) {
                        if (canOpen) $("#as-dropdown-" + scope.id).hide();
                        if (event && event.relatedTarget) {
                            var t = event.relatedTarget;
                            if (t) {
                                var value = t.getAttribute("data-value");
                                if (value) {
                                    scope.toClose = true;
                                    scope.value = value;
                                }
                            }
                        }
                        return false;
                    };
                    scope.openDropdown = function() {
                        if (canOpen) $("#as-dropdown-" + scope.id).show();
                    };
                    scope.setValue = function(value) {
                        scope.value = value;
                        scope.toClose = true;
                        scope.toggleDropdown();
                    };
                    setInterval(function() {
                        canOpen = true;
                        scope.$apply();
                    }, 100);
                }
            };
        });


        dummyEditor._module.directive("colorpicker", function($timeout) {
            return {
                restrict: 'AE',
                scope: {
                    id: "@",
                    colorvalue: "=",
                    placeholder: "@"
                },
                require: 'ngModel',
                templateUrl: dummyEditor._path + '/templates/colorpicker.html',
                link: function(scope, iElement, iAttrs, ngModelCtrl) {

                    ngModelCtrl.$formatters.push(function(modelValue) {
                        return modelValue;
                    });

                    scope.$watch('ngModel', function() {
                        ngModelCtrl.$setViewValue(scope.ngModel);
                    });
                    ngModelCtrl.$parsers.push(function(viewValue) {
                        return viewValue;
                    });
                    ngModelCtrl.$render = function() {
                        scope.ngModel = ngModelCtrl.$viewValue;
                    };

                    $timeout(function() {
                        $(document).ready(function() {
                            $('input#' + scope.id).minicolors({
                                control: 'rgb',
                                defaultValue: '',
                                format: 'rgb',
                                inline: false,
                                letterCase: 'lowercase',
                                opacity: true,
                                position: 'bottom right',
                                swatches: [],
                                change: function(value, opacity) {
                                    if (!value) return;
                                    if (opacity) value += ', ' + opacity;
                                },
                                theme: 'bootstrap'
                            });
                        });
                    }, 0);
                }
            };
        });



        dummyEditor._module.directive("dummyEditor", function() {
            return {
                restrict: 'AE',
                scope: {
                    ngModel: "=",
                    customCss: "="
                },
                templateUrl: dummyEditor._path + '/dummy-editor.html'
            };

        });

        dummyEditor._module.controller("DummyEditorController", function($scope, $translate, $http, $timeout) {
            $scope.selectedItem = {};
            $scope.getWidget = function(type) {
                return dummyEditor.getWidget(type);
            };



            $scope.baseId = 1;
            /**
             * If I reuse a model, I need to find the first valid id. Thus, I need
             * to itarate over the model, recurservly (is an element is a container) */
            $scope.getValidId = function(arr) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id) {
                        if (arr[i].id >= $scope.baseId) {
                            $scope.baseId = arr[i].id + 1;
                        }
                        if (arr[i].isContainer) {
                            $scope.getValidId(arr[i].columns[0]);
                        }
                    }
                }
            };
            $scope.hovers = {};

            $scope.mouseEnter = function(item) {
                $scope.hovers[item.id] = true;
            };
            $scope.mouseExit = function(item) {
                $scope.hovers[item.id] = false;
            };
            $scope.isHover = function(item) {
                return $scope.hovers[item.id];
            };

            $scope.getId = function() {
                var i = $scope.baseId;
                $scope.baseId++;
                return i;
            };

            $scope.copyId = function(item) {
                item.id = $scope.getId();
            };

            $scope.baseUrl = dummyEditor._path + '/widgets/';

            $scope.models = {
                selected: null,
                templates: [],
                containers: [],
                elements: [],
                dropzones: {
                    "A": []
                }
            };
            if ($scope.ngModel) {
                if (!$.isArray($scope.ngModel)) {
                    console.error("the dummy-editor model must be an array!");
                } else {
                    $scope.models.dropzones.A = $scope.ngModel;
                    $scope.getValidId($scope.ngModel);
                }
            }

            var toTranslate = [];
            for (var i = 0; i < dummyEditor._widgets.length; i++) {
                $scope.models.templates.push(dummyEditor._widgets[i].template);
                if (dummyEditor._widgets[i].template.isContainer) {
                    $scope.models.containers.push(dummyEditor._widgets[i].template);
                } else {
                    $scope.models.elements.push(dummyEditor._widgets[i].template);
                }
                toTranslate.push(dummyEditor._widgets[i].name);
            }

            $scope.add = function(item) {
                var c = angular.copy(item);
                c.id = $scope.getId();
                $scope.models.dropzones.A.push(c);
            };

            $scope.performMove = function(list, index) {
                list.splice(index, 1);
            };
            $scope.addedElement = function(item, list) {
                if (list) {
                    item._father = list.id;
                } else {
                    item._father = null;
                }
            };
            $scope.getItemFromId = function(id) {
                id = Number(id);
                return $scope.getItemFromIdInternal($scope.models.dropzones.A, id);
            };
            $scope.getItemFromIdInternal = function(list, id) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id == id) return list[i];
                    if (list[i].isContainer) {
                        var tmp = $scope.getItemFromIdInternal(list[i].columns[0], id);
                        if (tmp) return tmp;
                    }
                }
                return null;
            };


            $scope.generateHtml = function() {
                var data = $scope.models.dropzones.A;
                var allHtml = "";
                var allCss = $scope.customCss + "\n";
                var index = -1;
                for (var i = 0; i < data.length; i++) {
                    if (!data[i].customClassesPrintable) data[i].customClassesPrintable = "";
                    var f = dummyEditor.getWidget(data[i].type).generateCode;
                    var out = f(data[i]);
                    allHtml += out.html + "\n";
                    allCss += out.css + "\n";
                }
                return {
                    html: allHtml,
                    css: allCss
                };
            };

            dummyEditor.generateHtml = function() {
                return $scope.generateHtml();
            };
            $scope.cssCustomClasses = [];
            var customClassExample = {
                selector: "div .classname",
                properties: [{
                    "key": "color",
                    "value": "red"
                }]
            };
            $scope.cssCustomClasses.push(customClassExample);
            if ($scope.customCss) $scope.cssCustomClasses = $scope.customCss;
            $http.get(dummyEditor._path + '/css_properties.json').then(function(response) {
                $scope.cssProperties = response.data;
                for (var i = 0; i < response.data.length; i++) {
                    response.data[i].name = response.data[i].property;
                }
            }, function(response) {
                console.error(response);
            });
            $scope.cssSelectClass = function(c, index) {
                $scope.cssSelectedClass = c;
                $scope.cssSelectedIndex = index;
            };
            $scope.cssAddClass = function() {
                var c = {
                    selector: ".new_class",
                    properties: []
                };
                $scope.cssCustomClasses.push(c);
                $scope.cssSelectedClass = c;
                $scope.cssSelectedIndex = $scope.cssCustomClasses.length - 1;
            };
            $scope.cssRemoveClass = function(index) {
                $scope.cssCustomClasses.splice(index, 1);
                $scope.cssSelectedClass = null;
            };
            $scope.cssRemoveProperty = function(index) {
                if (!$scope.cssSelectedClass) return;
                $scope.cssSelectedClass.properties.splice(index, 1);
            };
            $scope.cssAddProperty = function() {
                if (!$scope.cssSelectedClass) return;
                $scope.cssSelectedClass.properties.push({});
            };
            $scope.cssSaveClasses = function() {
                $scope.cssGenerateAvailableClasses();
                $scope.generateCustomCss();
                $scope.cssIgnoreClose = true;
                $('#cssPopup').modal('hide');
            };
            $('#cssPopup').on('hidden.bs.modal', function(e) {
                $timeout(function() {
                    $scope.cssSelectedClass = null;
                    $scope.cssSelectedIndex = -1;
                    if ($scope.cssIgnoreClose) return;
                    $scope.cssCustomClasses = angular.fromJson($scope.cssBackup);
                    delete $scope.cssBackup;
                }, 0);
            });
            $('#cssPopup').on('show.bs.modal', function(e) {
                $timeout(function() {
                    $scope.cssIgnoreClose = false;
                    $scope.cssBackup = angular.toJson($scope.cssCustomClasses);
                }, 0);
            });
            $scope.cssGenerateAvailableClasses = function() {
                $scope.cssAvailableClasses = [];
                for (var i = 0; i < $scope.cssCustomClasses.length; i++) {
                    var s = $scope.cssCustomClasses[i].selector;
                    if (s.indexOf(".") !== 0) continue;
                    if (s.indexOf(" ") !== -1) continue;
                    if (s.indexOf(">") !== -1) continue;
                    if (s.indexOf(":") !== -1) continue;
                    $scope.cssAvailableClasses.push(s);
                }
            };
            $scope.cssGenerateAvailableClasses();
            $scope.generateCustomCss = function() {
                $scope.customCss = "/*trick to avoid margin collapsing*/\n* {\npadding: 0.0156249996px;\n}\n";
                for (var i = 0; i < $scope.cssCustomClasses.length; i++) {
                    var c = $scope.cssCustomClasses[i];
                    $scope.customCss += c.selector + " {\n";
                    for (var k = 0; k < c.properties.length; k++) {
                        $scope.customCss += c.properties[k].key + ": " + c.properties[k].value + ";\n";
                    }
                    $scope.customCss += "}\n";
                }
            };
            $scope.generateCustomCss();
        });




        dummyEditor._module.directive("elementInfo", function() {
            return {
                restrict: 'E',
                templateUrl: dummyEditor._path + '/templates/element-info.html'
            };
        });

        dummyEditor._module.controller("elementInfoControllerPopup", function($scope, $timeout) {
            $scope.$watch('selectedItem', function(newValue, oldValue) {
                $scope.item = $scope.selectedItem.item;
            }, true);

            $scope.saveSettings = function() {
                delete $scope.selectedItem.backup;
                $scope.item.customClassesPrintable = "";
                for (var i = 0; i < $scope.item.customClasses.length; i++) {
                    $scope.item.customClassesPrintable += $scope.item.customClasses[i].substring(1) + " ";
                }
                var f = dummyEditor.getWidget($scope.item.type).saveSettings;
                if (f) {
                    f($scope.item);
                }
            };

            $scope.recSearch = function(obj, target) {
                var found = -1;
                if ($.isArray(obj)) {
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i] === target) {
                            found = i;
                        }
                        if (found != -1) {
                            obj.splice(found, 1);
                            return found;
                        }
                        found = $scope.recSearch(obj[i], target);
                        if (found != -1) break;
                    }
                    if (found != -1) return found;
                    return -1;
                }
                if (typeof obj === 'object') {
                    for (var k in obj) {
                        if (typeof obj[k] === 'object') {
                            found = $scope.recSearch(obj[k], target);
                            if (found != -1) return found;
                        }
                    }
                }
                return -1;
            };

            $scope.deleteElement = function($event) {
                $timeout(function() {
                    var found = $scope.recSearch($scope.models.dropzones.A, $scope.item);
                }, 200);
            };

            $scope.addCustomClass = function(c) {
                $scope.item.customClasses.push(c);
            };
            $scope.removeCustomClass = function(index) {
                $scope.item.customClasses.splice(index, 1);
            };
        });


        dummyEditor._module.controller("elementInfoController", function($scope, $timeout) {

            $scope.init = false;
            $scope.openSettings = function() {
                $scope.selectedItem.backup = angular.toJson($scope.item);
                $scope._item = angular.fromJson($scope.backup);
                $scope.selectedItem.item = $scope.item;
                $("#settings-popup").on('hidden.bs.modal', function(e) {
                    $timeout(function() {
                        if ($scope.selectedItem.backup) {
                            var tmp = angular.fromJson($scope.selectedItem.backup);
                            for (var key in tmp) {
                                $scope.item[key] = tmp[key];
                            }
                            delete $scope.selectedItem.backup;
                            delete $scope.selectedItem.item;
                        }
                    }, 100);
                    $(e.currentTarget).unbind();
                });
                $("#settings-popup").modal();
            };

            $scope.calculateLeft = function(item) {
                if (item.isContainer) {
                    //I need to calculate the number of fathers
                    var father = item._father;
                    if (!father) return "5px";
                    var number = $scope.computeNumberOfFathers(item, 0);
                    number = number * 140;
                    return number + "px";
                }
                return "initial";
            };

            $scope.computeNumberOfFathers = function(item, c) {
                if (!item) return c;
                if (!item._father) {
                    return c;
                }
                c++;
                var f = $scope.getItemFromId(item._father);
                return $scope.computeNumberOfFathers(f, c);
            };
        });

        dummyEditor._module.filter('trust', ['$sce', function($sce) {
            return function(value, type) {
                return $sce.trustAs(type || 'html', value);
            };
        }]);

        dummyEditor._fired = true;
        for (i = 0; i < dummyEditor._callbacks.length; i++) {
            dummyEditor._callbacks[i](dummyEditor._module);
        }
        console.log("DummyEditor Loaded");
        if (cb) cb();

    };

}());
