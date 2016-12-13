Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

dummyEditor.addWidget({
    template: {
        type: "navbar",
        brand: {
            text: "Brand",
            img: "",
            url: "#"
        },
        menuRight: false,
        menu: [
            {
                "type": "url",
                "title": "Example",
                "url": "#",
                "active": true,
            },
            {
                "type": "dropdown",
                "title": "Dropdown",
                "url": "#",
                "data": [
                    {
                        "title": "Another",
                        "url": "#"
                    },
                    {
                        "title": "Another1",
                        "url": "#"
                    }
                ],
                "active": false
            }
        ],
        navbarStyle: "navbar-default"
    },
    name: "navbar.name",
    dependencies: [],
    saveSettings: function(item) {

    },
    generateCode: function(item) {

        var html = '<nav class="navbar '+item.navbarStyle+' '+item.customClassesPrintable+'">\n';
        html += '<div class="container-fluid">\n';
        html += '<div class="navbar-header">\n';
        html += '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-'+item.id+'" aria-expanded="false">\n';
        html += '<span class="sr-only">Toggle navigation</span>\n<span class="icon-bar"></span>\n<span class="icon-bar"></span>\n<span class="icon-bar"></span>\n';
        html += '</button>\n';
        html += '<a class="navbar-brand" href="'+item.brand.url+'">\n';
        html += '<span>\n';
        if (item.brand.img) {
            html += '<img alt="'+item.brand.imgText+'" src="'+item.brand.img+'" style="margin-top:-5px; height: 30px;">\n';
        }
        if (item.brand.text) {
            html += item.brand.text+'\n';
        }
        html += '</span>\n';
        html += '</a>\n</div>\n';
        html += '<div class="collapse navbar-collapse" id="navbar-'+item.id+'">\n';

        html += '<ul class="nav navbar-nav '+(item.menuRight?'navbar-right':'navbar-left')+'">\n';
        for (var i = 0; i<item.menu.length; i++) {
            var element = item.menu[i];
            html += '<li class="';
            if (element.active) {
                html += 'active ';
            }
            if (element.type=='dropdown') {
                html += 'dropdown ';
            }
            html += '">\n';
            if (element.type!='dropdown') {
                html += '<a href="'+element.url+'">'+element.title+'</a>\n';
            } else {
                html += '<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" href="'+element.url+'">'+element.title+'<span class="caret"></span></a>\n';
                html += '<ul class="dropdown-menu">\n';
                for (var k = 0; k<element.data.length; k++) {
                    html += '<li><a href="'+element.data[k].url+'">'+element.data[k].title+'</a></li>\n';
                }
                html += '</ul>\n';
            }
            html += '</li>\n';
        }
        html += '</ul>\n';
        html += '</div>\n';
        html += '</div>\n';
        html += '</nav>\n';

        return {
            html: html,
            css: ''
        }
    }
});



dummyEditor.addListener(function(module) {
    module.controller("navbarSettingsController", function($scope) {
        $scope.selectElement = function(c, index) {
            $scope.selectedElement = c;
            $scope.selectedIndex = index;
        }
        $scope.addElement = function() {
            var c = {
                "type": "url",
                "title": "Example",
                "url": "#",
                "active": false,
            };
            $scope.item.menu.push(c);
            $scope.selectedElement = c;
            $scope.selectedIndex = $scope.item.menu.length-1;
        }
        $scope.removeElement = function(index) {
            if (!$scope.selectedElement) return;
            $scope.item.menu.splice(index, 1);
            $scope.selectedElement = null;
            $scope.selectedIndex = -1;
        }
        $scope.elementMoveUp = function(index) {
            if (!$scope.selectedElement) return;
            if (index==0) return;
            $scope.item.menu.move(index, index-1);
            $scope.selectedIndex = index - 1;
        }
        $scope.elementMoveDown = function(index) {
            if (!$scope.selectedElement) return;
            if (index==$scope.item.menu.length-1) return;
            $scope.item.menu.move(index, index+1);
            $scope.selectedIndex = index + 1;
        }

        $scope.addDDElement = function() {
            if (!$scope.selectedElement.data) $scope.selectedElement.data = [];
            $scope.selectedElement.data.push({
                "title": "Dropdown",
                "url": "#"
            });
        }
        $scope.removeDDElement = function(index) {
            $scope.selectedElement.data.splice(index, 1);
        }
    });
});
