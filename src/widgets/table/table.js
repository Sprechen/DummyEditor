Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

dummyEditor.addWidget({
    template: {
        type: "table",
        showHeader: true,
        header: ["#", "Header 1", "Header 2"],
        data: [
            ["1", "val1a", "val1b"],
            ["2", "val2a", "val2b"]
        ]
    },
    name: "table.name",
    dependencies: [],
    saveSettings: function(item) {
        item.styleClasses = "";
        if (item.isStriped) {
            item.styleClasses +=  " table-striped";
        }
        if (item.isBordered) {
            item.styleClasses +=  " table-bordered";
        }
        if (item.isHover) {
            item.styleClasses +=  " table-hover";
        }
        if (item.isCondensed) {
            item.styleClasses +=  " table-condensed";
        }
    },
    generateCode: function(item) {

        var html = '<table class="table '+item.styleClasses+' '+item.customClassesPrintable+'">\n';
        if (item.showHeader) {
            html += '\t<thead>\n\t\t<tr>\n';
            for (var i = 0; i<item.header.length; i++) {
                html += '\t\t\t<th>'+item.header[i]+'</th>\n';
            }
            html += '\t\t</tr>\n\t</thead>\n';
        }
        html += '\t<tbody>\n';
        for (var i = 0; i<item.data.length; i++) {
            html += '\t\t<tr>\n';
            for (var k = 0; k<item.data[i].length; k++) {
                html += '\t\t\t<td>'+item.data[i][k]+'</td>\n';
            }
            html += '\t\t</tr>\n';
        }
        html += '\t</tbody>\n';
        html += '</table>\n';

        return {
            html: html,
            css: ''
        };
    }
});



dummyEditor.addListener(function(module) {
    module.controller("tableSettingsController", function($scope) {
        $scope.addColumn = function() {
            if (!$scope.newCol) return;
            $scope.item.header.push($scope.newCol);
            for (var i = 0; i<$scope.item.data.length; i++) {
                $scope.item.data[i].push(" ");
            }
            $scope.newCol = "";
        }
        $scope.removeColumn = function(index) {
            $scope.item.header.splice(index, 1);
            for (var i = 0; i<$scope.item.data.length; i++) {
                $scope.item.data[i].splice(index, 1);
            }
        }
        $scope.addRow = function() {
            var n = [];
            for (var i = 0; i<$scope.item.header.length; i++) n.push(" ");
            $scope.item.data.push(n);
        }
        $scope.removeRow = function(index) {
            $scope.item.data.splice(index, 1);
        }

        $scope.rowMoveUp = function(index) {
            if (index==0) return;
            $scope.item.data.move(index, index-1);
        }
        $scope.rowMoveDown = function(index) {
            if (index==$scope.item.data.length-1) return;
            $scope.item.data.move(index, index+1);
        }

        $scope.columnMoveLeft = function(index) {
            if (index==0) return;
            $scope.item.header.move(index, index-1);
            for (var i = 0; i<$scope.item.data.length; i++) {
                $scope.item.data[i].move(index, index-1);
            }
        }
        $scope.columnMoveRight = function(index) {
            if (index==$scope.item.header.length-1) return;
            $scope.item.header.move(index, index+1);
            for (var i = 0; i<$scope.item.data.length; i++) {
                $scope.item.data[i].move(index, index+1);
            }
        }
    });
});
