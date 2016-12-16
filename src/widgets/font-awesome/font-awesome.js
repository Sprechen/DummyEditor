dummyEditor.addWidget({
    template: {
        type: "font-awesome",
        icon: "fa-heart-o",
        color: "",
        size: ""
    },
    name: "fontawesome.name",
    dependencies: [],
    generateCode: function(item) {
        var css = ".fa-"+item.id+" {\ncolor: "+item.color+";\nfont-size: "+item.size+";\n}\n";
        return {
            html: '<i class="fa-'+item.id+' fa '+item.icon+' '+item.customClassesPrintable+'" aria-hidden="true"></i>',
            css: css
        };
    }
});
