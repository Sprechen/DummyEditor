dummyEditor.addWidget({
    template: {
        type: "well",
        isContainer: true,
        columns: [[]]
    },
    name: "well.name",
    generateCode: function(item) {
        var out = {
            html: '',
            css: ''
        };
        out.html = '<div class="well ';
        if (item.style) {
            out.html += item.style;
        }
        out.html += ' '+item.customClassesPrintable+'">\n<div class="row">';
        for (var i = 0; i<item.columns[0].length; i++) {
            var f =  dummyEditor.getWidget(item.columns[0][i].type).generateCode;
            var r = f(item.columns[0][i]);
            out.html += r.html+"\n";
            out.css += r.css+"\n";
        }
        out.html += '</div>\n</div>\n';
        return out;
    }
});
