dummyEditor.addWidget({
    template: {
        type: "grid",
        isContainer: true,
        sgrid: '{"col":1,"colmd":[12],"colxs":[12]}',
        grid: {
            col:1,
            colmd:[12],
            colxs:[12]
        },
        columns: [[]]
    },
    name: "grid.name",
    saveSettings: function(item) {
        item.grid = JSON.parse(item.sgrid);
        if (item.grid.col>item.columns.length) {
            var tmp = item.columns.length;
            for (var i = tmp; i<item.grid.col; i++) {
                item.columns.push([]);
            }
        } else if (item.grid.col<item.columns.length) {
            var removed = item.columns.splice(item.grid.col);
            for (var i = 0; i<removed.length; i++) {
                for (var k = 0; k<removed[i].length; k++) {
                    item.columns[item.columns.length-1].push(removed[i][k]);
                }
            }
        }
    },
    generateCode: function(item) {
        var out = {html: '', css: ''};
        out.html = '<div class="row '+item.customClassesPrintable+'">\n';
        for (var i = 0; i<item.columns.length; i++) {
            out.html += '<div class="col-md-'+item.grid.colmd[i]+' col-xs-'+item.grid.colxs[i]+'">\n';
            for (var k = 0; k<item.columns[i].length; k++) {
                var f = dummyEditor.getWidget(item.columns[i][k].type).generateCode;
                var r = f(item.columns[i][k]);
                out.html += r.html+"\n";
                out.css += r.css+"\n";
            }
            out.html += '</div>\n';
        }
        out.html += '</div>\n';
        return out;
    }
});
