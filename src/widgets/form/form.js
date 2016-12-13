dummyEditor.addWidget({
    template: {
        type: "form",
        isContainer: true,
        method: "post",
        action: "#",
        columns: [[]]
    },
    name: "form.name",
    saveSettings: function(item) {
    },
    generateCode: function(item) {
        var out = {
            html: '',
            css: ''
        };
        out.html += '<form action="'+item.action+'" method="'+item.method+'" class="';
        if (item.inline) {
            out.html += 'form-inline';
        }
        out.html += ' '+item.customClassesPrintable+'">\n';
        for (var i = 0; i<item.columns[0].length; i++) {
            var f =  dummyEditor.getWidget(item.columns[0][i].type).generateCode;
            var r = f(item.columns[0][i]);
            out.html += r.html+"\n";
            out.css += r.css+"\n";
        }
        out.html += '</form>\n';
        return out;
    }
});
