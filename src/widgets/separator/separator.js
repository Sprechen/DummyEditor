dummyEditor.addWidget({
    template: {
        type: "separator",
        color: "ddd",
        size: "2px"
    },
    name: "separator.name",
    dependencies: [],
    generateCode: function(item) {
        var css = ".separator-"+item.id+" {\nborder-color: #"+item.color+";\nborder-top-width: "+item.size+";\n}\n";
        return {
            html: '<hr class="'+item.customClassesPrintable+' separator-'+item.id+'">',
            css: css
        };
    }
});
