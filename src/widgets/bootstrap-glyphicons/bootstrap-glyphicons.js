dummyEditor.addWidget({
    template: {
        type: "bootstrap-glyphicons",
        icon: "glyphicon-search",
        color: "",
        size: ""
    },
    name: "boostrapglyphicons.name",
    dependencies: [],
    generateCode: function(item) {
        var css = ".gly-"+item.id+" {\ncolor: "+item.color+";\nfont-size: "+item.size+";\n}\n";
        return {
            html: '<span class="glyphicon '+item.icon+' '+item.customClassesPrintable+' gly-'+item.id+'" aria-hidden="true"></span>',
            css: css
        };
    }
});
