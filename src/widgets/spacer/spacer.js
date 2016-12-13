dummyEditor.addWidget({
    template: {
        type: "spacer",
        horizontal: '0',
        size: "100px",
        style: "height: 100px;"
    },
    name: "spacer.name",
    dependencies: [],
    saveSettings: function(item) {
        if (item.horizontal=='1') {
            item.style = "width: ";
        } else {
            item.style = "height: ";
        }
        item.style += item.size+";";
    },
    generateCode: function(item) {
        var css = ".spacer-"+item.id+" {\n";
        if (item.horizontal=='1') {
            css += "width: ";
        } else {
            css += "height: ";
        }
        css += item.size+";\n}\n";
        return {
            html: '<div class="'+item.customClassesPrintable+' spacer-'+item.id+'"></div>',
            css: css
        };
    }
});
